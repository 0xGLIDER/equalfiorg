import React, { useState } from "react";
import { ethers } from "ethers";
import "./../styles/BridgePage.css";

function BridgePage() {
  const [amount, setAmount] = useState(""); // Amount input for token bridge
  const [tokenId, setTokenId] = useState(""); // Token ID input for NFT bridge
  const [network, setNetwork] = useState(""); // Selected network
  const [loading, setLoading] = useState(false);

  // Define LayerZero endpoints and destination contract addresses
  const networkDetails = {
    Ethereum: {
      endpointId: 40161, // Example LayerZero Endpoint ID
      oftAddress: "0x117c5C790e62BAF8cC266e28448EEd0C5a596f37", // Replace with destination contract address
    },
    Base: {
      endpointId: 40245, // Example LayerZero Endpoint ID
      oftAddress: "0x117c5C790e62BAF8cC266e28448EEd0C5a596f37", // Replace with destination contract address
    },
    Unichain: {
      endpointId: 40333, // Example LayerZero Endpoint ID
      oftAddress: "0x117c5C790e62BAF8cC266e28448EEd0C5a596f37", // Replace with destination contract address
    },
  };

  const oftContractAddress = "0x117c5C790e62BAF8cC266e28448EEd0C5a596f37"; // Replace with your OFT contract address
  const oftAbi = [
    "function send((uint32,bytes32,uint256,uint256,bytes,bytes,bytes), (uint256,uint256), address) payable",
    "function quoteSend((uint32,bytes32,uint256,uint256,bytes,bytes,bytes), bool) view returns (tuple(uint256,uint256))",
  ];

  const connectToOFTContract = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []); // Request wallet connection
    const signer = await provider.getSigner();
    return new ethers.Contract(oftContractAddress, oftAbi, signer);
  };

  const handleBridgeTokens = async () => {
    if (!amount || !network) {
        alert("Please enter an amount and select a network.");
        return;
    }

    const destinationDetails = networkDetails[network];
    console.log("Selected Network:", network);
    console.log("Destination Details:", destinationDetails);

    if (!destinationDetails || !destinationDetails.endpointId) {
        console.error("Invalid network selection or missing configuration.");
        alert("Invalid network selection or missing configuration.");
        return;
    }

    setLoading(true);
    try {
        const contract = await connectToOFTContract();
        const signer = await contract.runner;
        const signerAddress = await signer.getAddress();

        console.log("Signer Address:", signerAddress);

        // Convert the receiving address (signerAddress) to Bytes32
        const paddedRecipientAddress = ethers.zeroPadValue(signerAddress, 32);
        console.log("Padded Recipient Address:", paddedRecipientAddress);

        // Construct sendParams
        const sendParams = [
            destinationDetails.endpointId, // Destination LayerZero endpoint ID
            paddedRecipientAddress, // Padded recipient address
            ethers.parseUnits(amount, 18), // Amount in local decimals
            ethers.parseUnits(amount, 18), // Min amount in local decimals
            "0x0003010011010000000000000000000000000000ea60", // Extra options
            "0x", // Compose msg
            "0x", // OFT cmd
        ];

        console.log("Send Params:", sendParams);

        // Quote the fee (native currency only)
        const [nativeFee] = await contract.quoteSend(sendParams, false);

        console.log("Native Fee:", nativeFee);

        // Call the `send` function
        const tx = await contract.send(sendParams, [nativeFee, 0], signerAddress, {
            value: nativeFee, // Sending the native fee
        });

        await tx.wait();
        alert("Tokens bridged successfully!");
    } catch (error) {
        console.error("Error bridging tokens:", error);
        alert("Failed to bridge tokens.");
    } finally {
        setLoading(false);
    }
};


  const handleBridgeNFTs = async () => {
    if (!tokenId || !network) {
      alert("Please enter a Token ID and select a network.");
      return;
    }

    setLoading(true);
    try {
      const contract = await connectToOFTContract();
      const signer = await contract.runner;
      const signerAddress = await signer.getAddress();

      // Convert destination address to bytes32
      const destinationDetails = networkDetails[network];
      const paddedAddress = ethers.zeroPadValue(destinationDetails.oftAddress, 32);

      // Construct sendParams for NFTs
      const sendParams = [
        destinationDetails.endpointId, // Destination LayerZero endpoint ID
        paddedAddress, // Padded destination contract address
        ethers.toBigInt.from(tokenId), // Token ID
        ethers.toBigInt.from(tokenId), // Minimum value (same for NFTs)
        "0x0003010011010000000000000000000000000000ea60", // Extra options
        "0x", // Compose msg
        "0x", // OFT cmd
      ];

      // Quote the fee (native currency only)
      const [nativeFee] = await contract.quoteSend(sendParams, false);

      // Call the `send` function
      const tx = await contract.send(sendParams, [nativeFee, 0], signerAddress, {
        value: nativeFee, // Sending the native fee
      });

      await tx.wait();
      alert("NFT bridged successfully!");
    } catch (error) {
      console.error("Error bridging NFT:", error);
      alert("Failed to bridge NFT.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bridge-page">
      <h2>Bridge</h2>
      <div className="bridge-container">
        {/* Token Bridge Card */}
        <div className="bridge-card">
          <h3>Bridge Tokens</h3>
          <div className="stats-container">
            <div className="stats-cell">
              <p>Amount</p>
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="stats-cell">
              <p>Select Network</p>
              <select
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
              >
                <option value="" disabled>
                  Choose a network
                </option>
                {Object.keys(networkDetails).map((net) => (
                  <option key={net} value={net}>
                    {net}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleBridgeTokens}
              disabled={loading || !amount || !network}
              className="bridge-button"
            >
              {loading ? "Sending..." : "Send Tokens"}
            </button>
          </div>
        </div>

        {/* NFT Bridge Card */}
        <div className="bridge-card">
          <h3>Bridge NFTs</h3>
          <div className="stats-container">
            <div className="stats-cell">
              <p>Token ID</p>
              <input
                type="number"
                placeholder="Enter Token ID"
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
              />
            </div>
            <div className="stats-cell">
              <p>Select Network</p>
              <select
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
              >
                <option value="" disabled>
                  Choose a network
                </option>
                {Object.keys(networkDetails).map((net) => (
                  <option key={net} value={net}>
                    {net}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleBridgeNFTs}
              disabled={loading || !tokenId || !network}
              className="bridge-button"
            >
              {loading ? "Sending..." : "Send NFT"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BridgePage;
