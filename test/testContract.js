const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

async function deployContractFixture() {
  const [addr1, addr2] = await ethers.getSigners();
  const contract = await ethers.deployContract("EtherDIDRegistrySignedOnly");

  // console.log(addr1.address); // 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
  // console.log(addr2.address); // 0x70997970C51812dc3A010C7d01b50e0d17dc79C8

  // Fixtures can return anything you consider useful for your tests
  return { contract, addr1, addr2 };
}

async function str2bytes32(str) {
  bytesRes = new Uint8Array(32);

  for (let i = 0; i < 64; i += 2) {
    let firstByte = str[i + 2];
    let secondByte = str[i + 3];
    let temp = "0x".concat(firstByte).concat(secondByte);
    bytesRes[i / 2] = temp;
  }

  return bytesRes;
}

describe("Initial State", function () {
  it("Should query correct owner of identity", async function () {
    const { contract, addr1 } = await loadFixture(deployContractFixture);
    expect(await contract.identityOwner(addr1.address)).to.equal(addr1.address);
  });
});

describe("Nonce", function () {
  it("Should query correct nonce of specified identity", async function () {
    const { contract, addr1 } = await loadFixture(deployContractFixture);
    expect(await contract.getNonce(addr1.address)).to.be.a("Bigint");
    expect(await contract.getNonce(addr1.address)).to.equal(0n);
  });

  it("Should have nonce added correctly", async function () {
    const { contract, addr1, addr2 } = await loadFixture(deployContractFixture);
    const sig =
      "0x7686a309cd7698c8372733f02c0e4256058bed8e7dc3ceb77fde4509e642ae9d0df53c4664eed8fcda7af35bf2d64a91dfb59f9741f0f473f3cb030b06b305e81c";
    // console.log(sig);

    const sigInst = ethers.Signature.from(sig);
    const r = sigInst.r;
    const s = sigInst.s;
    const v = sigInst.v;
    // console.log(r, s, v);

    await contract.changeOwnerSigned(addr1.address, v, r, s, addr2.address);
    expect(await contract.getNonce(addr1.address)).to.equal(1n);
  });
});

describe("Change Owner", function () {
  it("Should change owner with off-chain signature", async function () {
    const { contract, addr1, addr2 } = await loadFixture(deployContractFixture);
    const nonce = await contract.getNonce(addr1.address);
    const hash = ethers.solidityPackedKeccak256(
      ["bytes1", "bytes1", "address", "uint", "address", "string", "address"],
      [
        new Uint8Array([0x19]),
        new Uint8Array([0]),
        addr1.address,
        nonce,
        addr1.address,
        "changeOwner",
        addr2.address,
      ]
    );
    console.log(`\tHash: ${hash}`);

    const bytes32Hash = await str2bytes32(hash);
    console.log(`\tHash(bytes32): ${bytes32Hash}`);

    const sig = await addr1.signMessage(bytes32Hash);
    console.log(`\tGet signature: ${sig}`);

    const sigInst = ethers.Signature.from(sig);
    const r = sigInst.r;
    const s = sigInst.s;
    const v = sigInst.v;
    // console.log(r, s, v);

    await contract.changeOwnerSigned(addr1.address, v, r, s, addr2.address);

    expect(await contract.identityOwner(addr1.address)).to.equal(addr2.address);
  });
});

describe("Delegate", function () {
  const delegateType =
    "0xcf933cb5a8eeb8a0765842723db654ad40b7f4db756e789518fbb2dc59f2f79e";

  it("Should delegate with off-chain signature", async function () {
    const { contract, addr1, addr2 } = await loadFixture(deployContractFixture);
    const nonce = await contract.getNonce(addr1.address);

    const hash = ethers.solidityPackedKeccak256(
      [
        "bytes1",
        "bytes1",
        "address",
        "uint",
        "address",
        "string",
        "bytes32",
        "address",
        "uint",
      ],
      [
        new Uint8Array([0x19]),
        new Uint8Array([0]),
        addr1.address,
        nonce,
        addr1.address,
        "addDelegate",
        delegateType,
        addr2.address,
        3,
      ]
    );
    console.log(`\tHash: ${hash}`);

    const bytes32Hash = await str2bytes32(hash);
    console.log(`\tHash(bytes32): ${bytes32Hash}`);

    const sig = await addr1.signMessage(bytes32Hash);
    console.log(`\tGet signature: ${sig}`);

    const sigInst = ethers.Signature.from(sig);
    const r = sigInst.r;
    const s = sigInst.s;
    const v = sigInst.v;
    // console.log(r, s, v);

    await contract.addDelegateSigned(
      addr1.address,
      v,
      r,
      s,
      delegateType,
      addr2.address,
      3
    );

    expect(
      await contract.validDelegate(addr1.address, delegateType, addr2.address)
    ).to.equal(true);
  });

  it("Should deny access after delegation expired", async function () {
    setInterval(() => {
      clearInterval(3000);
    }, 3000);
    const { contract, addr1, addr2 } = await loadFixture(deployContractFixture);
    expect(
      await contract.validDelegate(addr1.address, delegateType, addr2.address)
    ).to.equal(false);
  });
});
