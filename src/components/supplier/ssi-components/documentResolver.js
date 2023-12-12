import { Contract } from "ethers";

export async function queryIdentityOwner(provider, identity) {
  // The contract ABI (fragments we care about)
  const abi = [
    "function identityOwner(address identity) view returns (address)",
  ];

  // Connected to a Signer; can make state changing transactions,
  // which will cost the account ether
  const contractAddress = process.env.REACT_APP_DID_REGISTRY;
  try {
    const contract = new Contract(contractAddress, abi, provider);
    const result = await contract.identityOwner(identity);

    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function queryDIDOwnerChangedTo(ethersSigner) {
  const abi = [
    "event DIDOwnerChanged(address indexed identity, address owner, uint previousChange)",
  ];
  const contractAddress = process.env.REACT_APP_DID_REGISTRY;
  const contract = new Contract(contractAddress, abi, ethersSigner);

  const filter = contract.filters.DIDOwnerChanged;
  const events = await contract.queryFilter(filter);

  // console.log(`Length of owner changed events: ${events.length}`);

  let list = [];

  // 確認是否轉移
  for (let i = 0; i < events.length; i++) {
    // console.log(`events[${i}] detail:`);
    // console.log(events[i]);
    if (events[i].args[1] === ethersSigner["address"]) {
      // console.log(`Identity owner is changed. Address:${events[i].args[1]}`);
      list.push(events[i].args[0]);
    }
  }

  // Check identity owner didn't change to others, evev if you used to be owner.
  for (let i = 0; i < list.length; i++) {
    queryIdentityOwner(ethersSigner, list[i]).then((result) => {
      if (result !== ethersSigner["address"]) list.splice(list[i]);
    });
  }

  if (list.length === 0) return ["無其它DID資料"];
  return list;
}

export async function queryDIDDelegateTo(ethersSigner) {
  const abi = [
    "event DIDDelegateChanged(address indexed identity, bytes32 delegateType, address delegate, uint validTo, uint previousChange)",
  ];
  const contractAddress = process.env.REACT_APP_DID_REGISTRY;
  const contract = new Contract(contractAddress, abi, ethersSigner);

  const filter = contract.filters.DIDDelegateChanged;
  const events = await contract.queryFilter(filter);

  let list = [];
  for (let i = 0; i < events.length; i++) {
    // console.log(`events[${i}] detail:`);
    // console.log(events[i]);
    if (events[i].args[2] === ethersSigner["address"])
      list.push(events[i].args[0]);
    // list.push({ did: `did:ethr:${events[i].args[2]}` });
  }

  if (list.length === 0) return ["無委任資料"];
  return list;
}

export async function queryDIDDelegateChangedEvents(ethersSigner, identity) {
  const abi = [
    "event DIDDelegateChanged(address indexed identity, bytes32 delegateType, address delegate, uint validTo, uint previousChange)",
  ];
  const contractAddress = process.env.REACT_APP_DID_REGISTRY;
  const contract = new Contract(contractAddress, abi, ethersSigner);

  const filter = contract.filters.DIDDelegateChanged;
  const events = await contract.queryFilter(filter);
  // console.log(`Length of owner delegation events: ${events.length}`);

  let result = [];
  for (let i = 0; i < events.length; i++) {
    let temp = [];
    if (
      events[i].args[0] === identity &&
      Number(events[i].args[3]) - 1 < Date.now() / 1000
    ) {
      temp.push(events[i].args[0]);
      temp.push(events[i].args[1]);
      temp.push(events[i].args[2]);

      result.push(temp);
    }
  }

  if (events.length === 0) return;
  return result;
}

export const documentResolver = async (ethersSigner) => {
  const DIDDocument = {
    context: [],
    id: null,
    verificationMethod: [],
    authentication: [],
  };
  DIDDocument.context.push(`https://www.w3.org/ns/did/v1`);
  DIDDocument.id = `did:ethr:${ethersSigner["address"]}`;

  queryDIDDelegateChangedEvents(ethersSigner);

  return DIDDocument;
};
