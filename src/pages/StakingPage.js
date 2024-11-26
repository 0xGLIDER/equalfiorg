import React, { useState, useEffect } from "react";
import { BrowserProvider, Contract, formatEther, parseEther } from "ethers";
import "./../styles/StakingPage.css";

function StakingPage() {
  const [amount, setAmount] = useState(""); // Amount to stake/unstake
  const [rewards, setRewards] = useState("0"); // Rewards to claim
  const [stakedBalance, setStakedBalance] = useState("0"); // User's staked balance
  const [totalStaked, setTotalStaked] = useState("0"); // Total staked in the contract
  const [rewardRate, setRewardRate] = useState("0"); // Reward rate per block
  const [loading, setLoading] = useState(false);

  const contractAddress = "0xa82fF9aFd8f496c3d6ac40E2a0F282E47488CFc9"; // Replace with your staking contract address
  const abi = [
    {
      inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
      name: "stake",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
      name: "unstake",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "claimRewards",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "totalStaked",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "rewardRatePerBlock",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_staker", type: "address" }],
      name: "userInfo",
      outputs: [
        { internalType: "uint256", name: "stakedBalance", type: "uint256" },
        { internalType: "uint256", name: "lastClaimBlock", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_staker", type: "address" }],
      name: "calculatePendingRewards",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ];

  const connectToContract = async () => {
    const provider = new BrowserProvider(window.ethereum); // Connect to MetaMask
    const signer = await provider.getSigner(); // Get the signer
    return new Contract(contractAddress, abi, signer); // Use signer to initialize the contract
  };

  const fetchUserInfo = async () => {
    setLoading(true);
    try {
      const provider = new BrowserProvider(window.ethereum); // Connect to MetaMask
      const signer = await provider.getSigner(); // Get the signer
      const contract = new Contract(contractAddress, abi, signer); // Initialize the contract

      const signerAddress = await signer.getAddress(); // Get the signer address
      const userInfo = await contract.userInfo(signerAddress); // Fetch user info
      const pendingRewards = await contract.calculatePendingRewards(signerAddress); // Fetch pending rewards
      const totalStakedTokens = await contract.totalStaked(); // Fetch total staked tokens
      const currentRewardRate = await contract.rewardRatePerBlock(); // Fetch reward rate per block

      // Format values
      const formattedStakedBalance = formatEther(userInfo.stakedBalance);
      const formattedPendingRewards = formatEther(pendingRewards);
      const formattedTotalStaked = formatEther(totalStakedTokens);
      const formattedRewardRate = formatEther(currentRewardRate);

      // Update state
      setStakedBalance(formattedStakedBalance);
      setRewards(formattedPendingRewards);
      setTotalStaked(formattedTotalStaked);
      setRewardRate(formattedRewardRate);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
    setLoading(false);
  };

  const handleStake = async () => {
    setLoading(true);
    try {
      const contract = await connectToContract();
      const tx = await contract.stake(parseEther(amount));
      await tx.wait();
      alert("Staked successfully!");
      fetchUserInfo();
    } catch (error) {
      console.error("Error staking tokens:", error);
      alert("Stake failed!");
    }
    setLoading(false);
  };

  const handleUnstake = async () => {
    setLoading(true);
    try {
      const contract = await connectToContract();
      const tx = await contract.unstake(parseEther(amount));
      await tx.wait();
      alert("Unstaked successfully!");
      fetchUserInfo();
    } catch (error) {
      console.error("Error unstaking tokens:", error);
      alert("Unstake failed!");
    }
    setLoading(false);
  };

  const handleClaimRewards = async () => {
    setLoading(true);
    try {
      const contract = await connectToContract();
      const tx = await contract.claimRewards();
      await tx.wait();
      alert("Rewards claimed successfully!");
      fetchUserInfo();
    } catch (error) {
      console.error("Error claiming rewards:", error);
      alert("Claim failed!");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <section className="staking-page">
      <h2>Staking</h2>
      <div className="staking-container">
        {/* Stats Card */}
        <div className="staking-card">
          <h3>Your Stats</h3>
          <p>Staked Balance: {stakedBalance} tokens</p>
          <p>Pending Rewards: {rewards} tokens</p>
          <p>Total Staked: {totalStaked} tokens</p>
          <p>Reward Rate: {rewardRate} tokens per block</p>
        </div>

        {/* Actions Card */}
        <div className="staking-card">
          <h3>Actions</h3>
          <div className="staking-input-group">
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={loading}
            />
            <button onClick={() => setAmount("1000")} className="max-button">
              Max
            </button>
          </div>
          <div className="staking-buttons">
            <button onClick={handleStake} disabled={loading || !amount}>
              {loading ? "Staking..." : "Stake"}
            </button>
            <button onClick={handleUnstake} disabled={loading || !amount}>
              {loading ? "Unstaking..." : "Unstake"}
            </button>
            <button onClick={handleClaimRewards} disabled={loading}>
              {loading ? "Claiming..." : "Claim Rewards"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StakingPage;
