//SPDX-License-Identifier: UNLICENSED

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

    function getEthSignedMessageHash(
        bytes32 _messageHash
    ) private pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked(
                    "\x19Ethereum Signed Message:\n32",
                    _messageHash
                )
            );
    }

    function checkSignature(
        address identity,
        uint8 sigV,
        bytes32 sigR,
        bytes32 sigS,
        bytes32 hash
    ) public returns (address) {
        bytes32 EthSignedMsgHash = getEthSignedMessageHash(hash);
        address signer = ecrecover(EthSignedMsgHash, sigV, sigR, sigS);
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

    function testHash(
        address identity,
        string calldata funcName,
        address newOwner
    ) external view returns (bytes32) {
        bytes32 res = keccak256(
            abi.encodePacked(
                bytes1(0x19),
                bytes1(0),
                msg.sender,
                nonce[identityOwner(identity)],
                identity,
                funcName,
                newOwner
            )
        );
        return res;
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
