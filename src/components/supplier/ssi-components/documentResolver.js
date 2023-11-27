import { Contract } from "ethers";

export async function queryDIDOwnerChangedEvents(ethersSigner) {
  const abi = [
    "event DIDOwnerChanged(address indexed identity, address owner, uint previousChange)",
  ];
  const contractAddress = process.env.REACT_APP_DID_REGISTRY;
  const contract = new Contract(contractAddress, abi, ethersSigner);

  // Query the last 100 blocks for any changes
  const filter = contract.filters.DIDOwnerChanged;
  const events = await contract.queryFilter(filter, -4);

  // console.log(`Length of owner changed events: ${events.length}`);

  for (let i = 0; i < events.length; i++) {
    // console.log(`events[${i}] detail:`);
    // console.log(events[i]);
    if (events[i].args[0] === ethersSigner["address"]) {
      // console.log(`Identity owner is changed. Address:${events[i].args[1]}`);
      return events[i].args[1];
    }
  }

  return false;
}

async function queryDIDDelegateChangedEvents(ethersSigner) {
  const abi = [
    "event DIDDelegateChanged(address indexed identity, bytes32 delegateType, address delegate, uint validTo, uint previousChange)",
  ];
  const contractAddress = process.env.REACT_APP_DID_REGISTRY;
  const contract = new Contract(contractAddress, abi, ethersSigner);

  const filter = contract.filters.DIDDelegateChanged;
  const events = await contract.queryFilter(filter, -1);

  // console.log(`Length of delegate changed events: ${events.length}`);

  for (let i = 0; i < events.length; i++) {
    // console.log(`events[${i}] detail:`);
    console.log(events[i]);
    if (events[i].args[0] === ethersSigner["address"])
      console.log(`Delegator found. Address:${events[i].args[2]}`);
  }
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
