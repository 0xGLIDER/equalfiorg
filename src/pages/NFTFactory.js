import React, { useState, useEffect } from "react";
import { BrowserProvider, Contract, parseEther } from "ethers";
import "./../styles/NFTSale.css";

function NFTFactory() {
  const [minting, setMinting] = useState(false);

  const contractAddress = "0xDb9DF6882A33dB477BC4a792705D89fb5653C4aF"; // Replace with your NFT contract address
  const abi = [
    {
      inputs: [{ internalType: "uint8", name: "_level", type: "uint8" }],
      name: "mintNFTAndToken",
      outputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      stateMutability: "payable",
      type: "function",
    },
    // Add getSupply function
    {
      inputs: [{ internalType: "uint256", name: "_level", type: "uint256" }],
      name: "getSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    // Add getSupplyCap function
    {
      inputs: [{ internalType: "uint256", name: "_level", type: "uint256" }],
      name: "getSupplyCap",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ];

  const initialLevels = [
    {
      id: 1,
      name: "Gold NFT",
      description: "Exclusive Gold NFT with premium rewards.",
      price: "0.0025", // Price in ETH
      icon: "fas fa-award gold-medal", // Font Awesome class for gold medal
      supply: 0,     // Current minted supply
      supplyCap: 0,  // Total supply cap
    },
    {
      id: 2,
      name: "Silver NFT",
      description: "Silver NFT with great rewards.",
      price: "0.0015", // Price in ETH
      icon: "fas fa-award silver-medal", // Font Awesome class for silver medal
      supply: 0,
      supplyCap: 0,
    },
    {
      id: 3,
      name: "Bronze NFT",
      description: "Bronze NFT for entry-level rewards.",
      price: "0.001", // Price in ETH
      icon: "fas fa-award bronze-medal", // Font Awesome class for bronze medal
      supply: 0,
      supplyCap: 0,
    },
  ];

  const [levelsWithSupply, setLevelsWithSupply] = useState(initialLevels);

  useEffect(() => {
    const fetchSupplyData = async () => {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const contract = new Contract(contractAddress, abi, provider);

        const updatedLevels = await Promise.all(
          initialLevels.map(async (level) => {
            const supply = await contract.getSupply(level.id);
            const supplyCap = await contract.getSupplyCap(level.id);

            return {
              ...level,
              supply: supply.toString(),
              supplyCap: supplyCap.toString(),
            };
          })
        );

        setLevelsWithSupply(updatedLevels);
      } catch (error) {
        console.error("Error fetching supply data:", error);
      }
    };

    fetchSupplyData();
  }, []);

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

      // Refresh supply data after minting
      const supply = await contract.getSupply(levelId);
      const updatedLevels = levelsWithSupply.map((level) =>
        level.id === levelId
          ? { ...level, supply: supply.toString() }
          : level
      );
      setLevelsWithSupply(updatedLevels);

    } catch (error) {
      console.error("Minting Error:", error);
      alert("Minting Failed!");
    }

    setMinting(false);
  };

  return (
    <section className="nft-sale">
      <h2>NFT Factory</h2>
      <p>Choose your NFT level and mint one of three EqualFi NFTs.</p>
      <div className="nft-levels">
        {levelsWithSupply.map((level) => (
          <div className="nft-card" key={level.id}>
            <h3>
              <i className={level.icon}></i> {level.name}
            </h3>
            <p>{level.description}</p>
            <p>Price: {level.price} ETH</p>
            <p>
              Supply: {level.supply} / {level.supplyCap}
            </p>
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

export default NFTFactory;
