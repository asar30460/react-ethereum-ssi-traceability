import TimelineIcon from "@mui/icons-material/Timeline";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import WindowIcon from "@mui/icons-material/Window";
import LogoDevIcon from "@mui/icons-material/LogoDev";

import EtherDIDRegistrySignedOnly from "./EtherDIDRegistrySignedOnly.json";

export const navlinks = {
  ethereum: [
    {
      name: "網路動態",
      imgIcon: <TimelineIcon />,
      link: "",
    },
  ],

  traceability: [
    {
      name: "SSI 管理",
      imgIcon: <SwitchAccountIcon />,
      link: "ssi-management",
    },
    {
      name: "專案",
      imgIcon: <WindowIcon />,
      link: "project",
    },
  ],

  dev: [
    {
      name: "開發工具",
      imgIcon: <LogoDevIcon />,
      link: "dev",
    },
  ],
};

export const RegistryContractParams = {
  contractName: EtherDIDRegistrySignedOnly["contractName"],
  abi: EtherDIDRegistrySignedOnly["abi"],
  abiPseudo: `"anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "identity",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "bytes32",
      "name": "name",
      "type": "bytes32"
    },
    {
      "indexed": false,
      "internalType": "bytes",
      "name": "value",
      "type": "bytes"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "validTo",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "previousChange",
      "type": "uint256"
    }
  ],
  "name": "DIDAttributeChanged",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "identity",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "bytes32",
      "name": "delegateType",
      "type": "bytes32"
    },
    {
      "indexed": false,
      "internalType": "address",
      "name": "delegate",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "validTo",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "previousChange",
      "type": "uint256"
    }
  ],
  "name": "DIDDelegateChanged",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "identity",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "address",
      "name": "owner",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "previousChange",
      "type": "uint256"
    }
  ],
  "name": "DIDOwnerChanged",
  "type": "event"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "identity",
      "type": "address"
    },
    {
      "internalType": "uint8",
      "name": "sigV",
      "type": "uint8"
    },
    {
      "internalType": "bytes32",
      "name": "sigR",
      "type": "bytes32"
    },
    {
      "internalType": "bytes32",
      "name": "sigS",
      "type": "bytes32"
    },
    {
      "internalType": "bytes32",
      "name": "delegateType",
      "type": "bytes32"
    },
    {
      "internalType": "address",
      "name": "delegate",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "validity",
      "type": "uint256"
    }
  ],
  "name": "addDelegateSigned",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "identity",
      "type": "address"
    },
    {
      "internalType": "uint8",
      "name": "sigV",
      "type": "uint8"
    },
    {
      "internalType": "bytes32",
      "name": "sigR",
      "type": "bytes32"
    },
    {
      "internalType": "bytes32",
      "name": "sigS",
      "type": "bytes32"
    },
    {
      "internalType": "address",
      "name": "newOwner",
      "type": "address"
    }
  ],
  "name": "changeOwnerSigned",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  "name": "changed",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "identity",
      "type": "address"
    },
    {
      "internalType": "uint8",
      "name": "sigV",
      "type": "uint8"
    },
    {
      "internalType": "bytes32",
      "name": "sigR",
      "type": "bytes32"
    },
    {
      "internalType": "bytes32",
      "name": "sigS",
      "type": "bytes32"
    },
    {
      "internalType": "bytes32",
      "name": "hash",
      "type": "bytes32"
    }
  ],
  "name": "checkSignature",
  "outputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    },
    {
      "internalType": "bytes32",
      "name": "",
      "type": "bytes32"
    },
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  "name": "delegates",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "identity",
      "type": "address"
    }
  ],
  "name": "getNonce",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "identity",
      "type": "address"
    }
  ],
  "name": "identityOwner",
  "outputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  "name": "nonce",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  "name": "owners",
  "outputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "identity",
      "type": "address"
    },
    {
      "internalType": "uint8",
      "name": "sigV",
      "type": "uint8"
    },
    {
      "internalType": "bytes32",
      "name": "sigR",
      "type": "bytes32"
    },
    {
      "internalType": "bytes32",
      "name": "sigS",
      "type": "bytes32"
    },
    {
      "internalType": "bytes32",
      "name": "name",
      "type": "bytes32"
    },
    {
      "internalType": "bytes",
      "name": "value",
      "type": "bytes"
    }
  ],
  "name": "revokeAttributeSigned",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "identity",
      "type": "address"
    },
    {
      "internalType": "uint8",
      "name": "sigV",
      "type": "uint8"
    },
    {
      "internalType": "bytes32",
      "name": "sigR",
      "type": "bytes32"
    },
    {
      "internalType": "bytes32",
      "name": "sigS",
      "type": "bytes32"
    },
    {
      "internalType": "bytes32",
      "name": "delegateType",
      "type": "bytes32"
    },
    {
      "internalType": "address",
      "name": "delegate",
      "type": "address"
    }
  ],
  "name": "revokeDelegateSigned",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "identity",
      "type": "address"
    },
    {
      "internalType": "uint8",
      "name": "sigV",
      "type": "uint8"
    },
    {
      "internalType": "bytes32",
      "name": "sigR",
      "type": "bytes32"
    },
    {
      "internalType": "bytes32",
      "name": "sigS",
      "type": "bytes32"
    },
    {
      "internalType": "bytes32",
      "name": "name",
      "type": "bytes32"
    },
    {
      "internalType": "bytes",
      "name": "value",
      "type": "bytes"
    },
    {
      "internalType": "uint256",
      "name": "validity",
      "type": "uint256"
    }
  ],
  "name": "setAttributeSigned",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "identity",
      "type": "address"
    },
    {
      "internalType": "string",
      "name": "funcName",
      "type": "string"
    },
    {
      "internalType": "address",
      "name": "newOwner",
      "type": "address"
    }
  ],
  "name": "testHash",
  "outputs": [
    {
      "internalType": "bytes32",
      "name": "",
      "type": "bytes32"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "identity",
      "type": "address"
    },
    {
      "internalType": "bytes32",
      "name": "delegateType",
      "type": "bytes32"
    },
    {
      "internalType": "address",
      "name": "delegate",
      "type": "address"
    }
  ],
  "name": "validDelegate",
  "outputs": [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ],
  "stateMutability": "view",
  "type": "function"
}`,
  bytecode: EtherDIDRegistrySignedOnly["bytecode"],
  contractCode: `//SPDX-License-Identifier: UNLICENSED

  // Solidity files have to start with this pragma.
  // It will be used by the Solidity compiler to validate its version.
  pragma solidity ^0.8.18;
  
  contract EtherDIDRegistrySignedOnly {
      mapping(address => address) public owners;
      mapping(address => mapping(bytes32 => mapping(address => uint)))
          public delegates;
      mapping(address => uint) public changed;
      mapping(address => uint) public nonce;
  
      modifier onlyOwner(address identity, address actor) {
          require(actor == identityOwner(identity), "bad_actor");
          _;
      }
  
      event DIDOwnerChanged(
          address indexed identity,
          address owner,
          uint previousChange
      );
  
      event DIDDelegateChanged(
          address indexed identity,
          bytes32 delegateType,
          address delegate,
          uint validTo,
          uint previousChange
      );
  
      event DIDAttributeChanged(
          address indexed identity,
          bytes32 name,
          bytes value,
          uint validTo,
          uint previousChange
      );
  
      function getNonce(address identity) public view returns (uint) {
          return nonce[identity];
      }
  
      function identityOwner(address identity) public view returns (address) {
          address owner = owners[identity];
          if (owner != address(0x00)) {
              return owner;
          }
          return identity;
      }
  
      function checkSignature(
          address identity,
          uint8 sigV,
          bytes32 sigR,
          bytes32 sigS,
          bytes32 hash
      ) internal returns (address) {
          address signer = ecrecover(hash, sigV, sigR, sigS);
          require(signer == identityOwner(identity), "bad_signature");
          nonce[signer]++;
          return signer;
      }
  
      function validDelegate(
          address identity,
          bytes32 delegateType,
          address delegate
      ) public view returns (bool) {
          uint validity = delegates[identity][
              keccak256(abi.encode(delegateType))
          ][delegate];
          return (validity > block.timestamp);
      }
  
      function changeOwner(
          address identity,
          address actor,
          address newOwner
      ) internal onlyOwner(identity, actor) {
          owners[identity] = newOwner;
          emit DIDOwnerChanged(identity, newOwner, changed[identity]);
          changed[identity] = block.number;
      }
  
      function changeOwnerSigned(
          address identity,
          uint8 sigV,
          bytes32 sigR,
          bytes32 sigS,
          address newOwner
      ) public {
          bytes32 hash = keccak256(
              abi.encodePacked(
                  bytes1(0x19),
                  bytes1(0),
                  msg.sender,
                  nonce[identityOwner(identity)],
                  identity,
                  "changeOwner",
                  newOwner
              )
          );
          changeOwner(
              identity,
              checkSignature(identity, sigV, sigR, sigS, hash),
              newOwner
          );
      }
  
      function addDelegate(
          address identity,
          address actor,
          bytes32 delegateType,
          address delegate,
          uint validity
      ) internal onlyOwner(identity, actor) {
          delegates[identity][keccak256(abi.encode(delegateType))][delegate] =
              block.timestamp +
              validity;
          emit DIDDelegateChanged(
              identity,
              delegateType,
              delegate,
              block.timestamp + validity,
              changed[identity]
          );
          changed[identity] = block.number;
      }
  
      function addDelegateSigned(
          address identity,
          uint8 sigV,
          bytes32 sigR,
          bytes32 sigS,
          bytes32 delegateType,
          address delegate,
          uint validity
      ) public {
          bytes32 hash = keccak256(
              abi.encodePacked(
                  bytes1(0x19),
                  bytes1(0),
                  msg.sender,
                  nonce[identityOwner(identity)],
                  identity,
                  "addDelegate",
                  delegateType,
                  delegate,
                  validity
              )
          );
          addDelegate(
              identity,
              checkSignature(identity, sigV, sigR, sigS, hash),
              delegateType,
              delegate,
              validity
          );
      }
  
      function revokeDelegate(
          address identity,
          address actor,
          bytes32 delegateType,
          address delegate
      ) internal onlyOwner(identity, actor) {
          delegates[identity][keccak256(abi.encode(delegateType))][
              delegate
          ] = block.timestamp;
          emit DIDDelegateChanged(
              identity,
              delegateType,
              delegate,
              block.timestamp,
              changed[identity]
          );
          changed[identity] = block.number;
      }
  
      function revokeDelegateSigned(
          address identity,
          uint8 sigV,
          bytes32 sigR,
          bytes32 sigS,
          bytes32 delegateType,
          address delegate
      ) public {
          bytes32 hash = keccak256(
              abi.encodePacked(
                  bytes1(0x19),
                  bytes1(0),
                  msg.sender,
                  nonce[identityOwner(identity)],
                  identity,
                  "revokeDelegate",
                  delegateType,
                  delegate
              )
          );
          revokeDelegate(
              identity,
              checkSignature(identity, sigV, sigR, sigS, hash),
              delegateType,
              delegate
          );
      }
  
      function setAttribute(
          address identity,
          address actor,
          bytes32 name,
          bytes memory value,
          uint validity
      ) internal onlyOwner(identity, actor) {
          emit DIDAttributeChanged(
              identity,
              name,
              value,
              block.timestamp + validity,
              changed[identity]
          );
          changed[identity] = block.number;
      }
  
      function setAttributeSigned(
          address identity,
          uint8 sigV,
          bytes32 sigR,
          bytes32 sigS,
          bytes32 name,
          bytes memory value,
          uint validity
      ) public {
          bytes32 hash = keccak256(
              abi.encodePacked(
                  bytes1(0x19),
                  bytes1(0),
                  msg.sender,
                  nonce[identityOwner(identity)],
                  identity,
                  "setAttribute",
                  name,
                  value,
                  validity
              )
          );
          setAttribute(
              identity,
              checkSignature(identity, sigV, sigR, sigS, hash),
              name,
              value,
              validity
          );
      }
  
      function revokeAttribute(
          address identity,
          address actor,
          bytes32 name,
          bytes memory value
      ) internal onlyOwner(identity, actor) {
          emit DIDAttributeChanged(identity, name, value, 0, changed[identity]);
          changed[identity] = block.number;
      }
  
      function revokeAttributeSigned(
          address identity,
          uint8 sigV,
          bytes32 sigR,
          bytes32 sigS,
          bytes32 name,
          bytes memory value
      ) public {
          bytes32 hash = keccak256(
              abi.encodePacked(
                  bytes1(0x19),
                  bytes1(0),
                  msg.sender,
                  nonce[identityOwner(identity)],
                  identity,
                  "revokeAttribute",
                  name,
                  value
              )
          );
          revokeAttribute(
              identity,
              checkSignature(identity, sigV, sigR, sigS, hash),
              name,
              value
          );
      }
  }
  `,
};
