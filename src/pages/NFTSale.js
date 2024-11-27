import React, { useState } from "react";
import { BrowserProvider, Contract, parseEther } from "ethers";
import "./../styles/NFTSale.css";

function NFTSale() {
  const [minting, setMinting] = useState(false);

  const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"; // Replace with your NFT contract address
  const abi = [
    {
      inputs: [{ internalType: "uint8", name: "_level", type: "uint8" }],
      name: "mintNFTAndToken",
      outputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      stateMutability: "payable",
      type: "function",
    },
  ];

  const levels = [
    {
      id: 1,
      name: "Gold NFT",
      description: "Exclusive Gold NFT with premium rewards.",
      price: "0.0025", // Price in ETH
      icon: "fas fa-award gold-medal", // Font Awesome class for gold medal
    },
    {
      id: 2,
      name: "Silver NFT",
      description: "Silver NFT with great rewards.",
      price: "0.0015", // Price in ETH
      icon: "fas fa-award silver-medal", // Font Awesome class for silver medal
    },
    {
      id: 3,
      name: "Bronze NFT",
      description: "Bronze NFT for entry-level rewards.",
      price: "0.001", // Price in ETH
      icon: "fas fa-award bronze-medal", // Font Awesome class for bronze medal
    },
  ];

  const mintNFT = async (levelId, price) => {
    setMinting(true);

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, abi, signer);

      const tx = await contract.mintNFTAndToken(levelId, {
        value: parseEther(price),
      });
      await tx.wait();

      alert("NFT Minted Successfully!");
    } catch (error) {
      console.error("Minting Error:", error);
      alert("Minting Failed!");
    }

    setMinting(false);
  };

  return (
    <section className="nft-sale">
      <h2>NFT Sale</h2>
      <p>Choose your NFT level and mint your exclusive EqualFi NFT.</p>
      <div className="nft-levels">
        {levels.map((level) => (
          <div className="nft-card" key={level.id}>
            <h3>
              <i className={level.icon}></i> {level.name}
            </h3>
            <p>{level.description}</p>
            <p>Price: {level.price} ETH</p>
            <button
              disabled={minting}
              onClick={() => mintNFT(level.id, level.price)}
            >
              {minting ? "Minting..." : "Mint"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NFTSale;
