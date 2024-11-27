import React, { useState, useEffect } from "react";
import { ethers, formatEther, parseEther } from "ethers";
import "./../styles/StakingPage.css";

function StakingPage() {
  const [amount, setAmount] = useState(""); // Amount to stake/unstake
  const [rewards, setRewards] = useState("0"); // Rewards to claim
  const [stakedBalance, setStakedBalance] = useState("0"); // User's staked balance
  const [totalStaked, setTotalStaked] = useState("0"); // Total staked in the contract
  const [rewardRate, setRewardRate] = useState("0"); // Reward rate per block
  const [userBalance, setUserBalance] = useState("0"); // User's wallet balance
  const [loading, setLoading] = useState(false);

  const stakingContractAddress = "0x6fBCc9461F6F1BF63202B249b12a466bcdDc171b"; // Replace with your staking contract address

  const stakingAbi = [
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

  const connectToContract = async (address, abi) => {
    const provider = new ethers.BrowserProvider(window.ethereum); // Ensure MetaMask is connected
    await provider.send("eth_requestAccounts", []); // Request wallet connection
    const signer = await provider.getSigner(); // Get the signer
    return new ethers.Contract(address, abi, signer); // Connect contract with signer
  };  

  const fetchUserInfo = async () => {
    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum); // Initialize provider
      await provider.send("eth_requestAccounts", []); // Request wallet connection
  
      const stakingContract = await connectToContract(stakingContractAddress, stakingAbi);
  
      const signer = stakingContract.runner; // Ethers v6 runner
      const signerAddress = await signer.getAddress();
  
      // Fetch staking stats
      const userInfo = await stakingContract.userInfo(signerAddress);
      const pendingRewards = await stakingContract.calculatePendingRewards(signerAddress);
      const totalStakedTokens = await stakingContract.totalStaked();
      const currentRewardRate = await stakingContract.rewardRatePerBlock()
  
      // Format and set state
      setStakedBalance(formatEther(userInfo.stakedBalance));
      setRewards(formatEther(pendingRewards));
      setTotalStaked(formatEther(totalStakedTokens));
      setRewardRate(formatEther(currentRewardRate));
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
    setLoading(false);
  };
  
  

  const handleStake = async () => {
    setLoading(true);
    try {
      const contract = await connectToContract(stakingContractAddress, stakingAbi);
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
      const contract = await connectToContract(stakingContractAddress, stakingAbi);
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
      const contract = await connectToContract(stakingContractAddress, stakingAbi);
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
      <h2>Staking Dashboard</h2>
      <div className="staking-container">
        {/* Stats Card */}
        <div className="staking-card">
          <h3>Your Stats</h3>
          <div className="stats-container">
            <div className="stats-cell">
              <p>Staked Balance</p>
              <span>{stakedBalance} XEQFI</span>
            </div>
            <div className="stats-cell">
              <p>Pending Rewards</p>
              <span>{rewards} XEQFI</span>
            </div>
            <div className="stats-cell">
              <p>Total Staked</p>
              <span>{totalStaked} XEQFI</span>
            </div>
            <div className="stats-cell">
              <p>Reward Rate</p>
              <span>{rewardRate} XEQFI per block</span>
            </div>
            <div className="stats-cell">
              <p>Your Wallet Balance</p>
              <span>{userBalance} ETH</span>
            </div>
          </div>
        </div>

 {/* Actions Card */}
<div className="staking-card">
  <h3>Actions</h3>
  <div className="actions-container">
    {/* Stake Action */}
    <div className="actions-cell">
      <h4>Stake Tokens</h4>
      <div className="input-button-group">
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={loading}
        />
        <div className="button-group">
          <button
            onClick={() => {
              const maxStakeable = Math.min(1000 - parseFloat(stakedBalance), userBalance);
              setAmount(maxStakeable.toFixed(3));
            }}
            className="max-button"
          >
            Max
          </button>
          <button
            onClick={handleStake}
            disabled={loading || !amount || parseFloat(amount) > 1000 - parseFloat(stakedBalance)}
            className="action-button"
          >
            {loading ? "Staking..." : "Stake"}
          </button>
        </div>
      </div>
    </div>

    {/* Unstake Action */}
    <div className="actions-cell">
      <h4>Unstake Tokens</h4>
      <div className="input-button-group">
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={loading}
        />
        <div className="button-group">
          <button
            onClick={() => setAmount(parseFloat(stakedBalance).toFixed(3))}
            className="max-button"
          >
            Max
          </button>
          <button
            onClick={handleUnstake}
            disabled={loading || !amount || parseFloat(amount) > parseFloat(stakedBalance)}
            className="action-button"
          >
            {loading ? "Unstaking..." : "Unstake"}
          </button>
        </div>
      </div>
    </div>

    {/* Claim Rewards Action */}
    <div className="actions-cell">
      <h4>Claim Rewards</h4>
      <button onClick={handleClaimRewards} disabled={loading}>
        {loading ? "Claiming..." : "Claim Rewards"}
      </button>
    </div>
  </div>
</div>


      </div>
    </section>
  );
}

export default StakingPage;
