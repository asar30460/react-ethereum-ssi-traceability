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

    console.log(result);
    return result;
  } catch (error) {}
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

      // prevent from following condition: A->B; B->A; A->B
      // This will cause duplicate data in list
      const finder = list.find((element) => element === events[i].args[0]);
      if (finder) continue;
      list.push(events[i].args[0]);
    }
  }

  // Check identity owner didn't change to others, evev if you used to be owner.
  for (let i = 0; i < list.length; i++) {
    await queryIdentityOwner(ethersSigner, list[i]).then((result) => {
      // console.log(result);
      // console.log(ethersSigner["address"]);
      if (result !== ethersSigner["address"]) list.splice(i, 1);
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
    if (
      events[i].args[2] === ethersSigner["address"] &&
      Number(events[i].args[3]) - 1 > Date.now() / 1000
    )
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

  const owner = await queryIdentityOwner(ethersSigner, identity);
  let result = [
    {
      id: `did:ethr:${owner}#controller`,
      type: "EcdsaSecp256k1RecoveryMethod2020",
      controller: `did:ethr:${owner}`,
      blockchainAccountId: `eip155:1:${owner}`,
    },
  ];
  for (let i = 0; i < events.length; i++) {
    if (
      events[i].args[0] === identity &&
      Number(events[i].args[3]) - 1 > Date.now() / 1000
    ) {
      const controller = await queryIdentityOwner(
        ethersSigner,
        events[i].args[2]
      );
      result.push({
        identity: events[i].args[0],
        delegateType: events[i].args[1],
        delegate: events[i].args[2],
        controller: controller,
        validTo: Number(events[i].args[3]),
      });
    }
  }
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
