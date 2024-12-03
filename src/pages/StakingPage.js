import React, { useState, useEffect } from "react";
import { ethers, formatEther, parseEther } from "ethers";
import "./../styles/StakingPage.css";

function StakingPage() {
  const [amount, setAmount] = useState(""); // Amount to stake/unstake
  const [rewards, setRewards] = useState("0"); // Rewards to claim
  const [stakedBalance, setStakedBalance] = useState("0"); // User's staked balance
  const [totalStaked, setTotalStaked] = useState("0"); // Total staked in the contract
  const [rewardRate, setRewardRate] = useState("0"); // Reward rate per block
  const [userBalance, setUserBalance] = useState("0"); // User's token balance
  const [userHasNFT, setUserHasNFT] = useState(false); // User's NFT ownership status
  const [userNFTLevel, setUserNFTLevel] = useState(0); // User's NFT level
  const [userTokenId, setUserTokenId] = useState(null); // User's NFT Token ID
  const [loading, setLoading] = useState(false);

  const stakingContractAddress = "0x2490d6a8158319E1FD9ca50743DE730e30Ce9BD2"; // Replace with your staking contract address
  const tokenContractAddress = "0x117c5C790e62BAF8cC266e28448EEd0C5a596f37"; // Replace with your token's contract address
  const nftContractAddress = "0xDb9DF6882A33dB477BC4a792705D89fb5653C4aF"; // Replace with your NFT contract address

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

  const tokenAbi = [
    // Approve function
    {
      constant: false,
      inputs: [
        { name: "_spender", type: "address" },
        { name: "_value", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ name: "success", type: "bool" }],
      type: "function",
    },
    // Allowance function
    {
      constant: true,
      inputs: [
        { name: "_owner", type: "address" },
        { name: "_spender", type: "address" },
      ],
      name: "allowance",
      outputs: [{ name: "remaining", type: "uint256" }],
      type: "function",
    },
    // BalanceOf function
    {
      constant: true,
      inputs: [{ name: "_owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "balance", type: "uint256" }],
      type: "function",
    },
  ];

  const nftAbi = [
    // nftOwnerInfo function
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "nftOwnerInfo",
      outputs: [
        { internalType: "uint256", name: "level", type: "uint256" },
        { internalType: "bool", name: "hasNFT", type: "bool" },
        { internalType: "uint256", name: "tid", type: "uint256" }, // Added tid
      ],
      stateMutability: "view",
      type: "function",
    },
    // You can include other functions if needed
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

      const stakingContract = await connectToContract(
        stakingContractAddress,
        stakingAbi
      );
      const tokenContract = await connectToContract(
        tokenContractAddress,
        tokenAbi
      );
      const nftContract = await connectToContract(nftContractAddress, nftAbi);

      const signer = stakingContract.runner; // Ethers v6 runner
      const signerAddress = await signer.getAddress();

      // Fetch staking stats
      const userInfo = await stakingContract.userInfo(signerAddress);
      const pendingRewards = await stakingContract.calculatePendingRewards(
        signerAddress
      );
      const totalStakedTokens = await stakingContract.totalStaked();
      const currentRewardRate = await stakingContract.rewardRatePerBlock();

      // Fetch user token balance
      const tokenBalance = await tokenContract.balanceOf(signerAddress);

      // Fetch user's NFT ownership info
      const nftOwnerInfo = await nftContract.nftOwnerInfo(signerAddress);
      const userHasNFT = nftOwnerInfo.hasNFT;
      const userNFTLevel = nftOwnerInfo.level.toString();
      const userTokenId = nftOwnerInfo.tid.toString();

      // Format and set state
      setStakedBalance(formatEther(userInfo.stakedBalance));
      setRewards(formatEther(pendingRewards));
      setTotalStaked(formatEther(totalStakedTokens));
      setRewardRate(formatEther(currentRewardRate));
      setUserBalance(formatEther(tokenBalance));
      setUserHasNFT(userHasNFT);
      setUserNFTLevel(userNFTLevel);
      setUserTokenId(userTokenId);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
    setLoading(false);
  };

  const handleStake = async () => {
    setLoading(true);
    try {
      const amountToStake = parseEther(amount); // amountToStake is BigInt

      // Connect to the staking contract
      const stakingContract = await connectToContract(
        stakingContractAddress,
        stakingAbi
      );

      // Connect to the token contract
      const tokenContract = await connectToContract(
        tokenContractAddress,
        tokenAbi
      );

      const signer = stakingContract.runner; // Ethers v6 runner
      const signerAddress = await signer.getAddress();

      // Check the allowance
      const allowance = await tokenContract.allowance(
        signerAddress,
        stakingContractAddress
      );

      if (allowance < amountToStake) {
        // Approve the staking contract to spend the tokens
        const txApprove = await tokenContract.approve(
          stakingContractAddress,
          amountToStake
        );
        await txApprove.wait();
        alert("Tokens approved for staking.");
      }

      // Proceed to stake
      const tx = await stakingContract.stake(amountToStake);
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
      const contract = await connectToContract(
        stakingContractAddress,
        stakingAbi
      );
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
      const contract = await connectToContract(
        stakingContractAddress,
        stakingAbi
      );
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
            {/* Non-NFT Stats */}
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
              <p>Your Token Balance</p>
              <span>{userBalance} XEQFI</span>
            </div>
            {/* NFT Stats */}
            <div className="nft-stats-container">
              <div className="stats-cell">
                <p>Owns NFT</p>
                <span>{userHasNFT ? "Yes" : "No"}</span>
              </div>
              <div className="stats-cell">
                <p>NFT Level</p>
                <span>{userHasNFT ? userNFTLevel : "-"}</span>
              </div>
              <div className="stats-cell">
                <p>Token ID</p>
                <span>{userHasNFT ? userTokenId : "-"}</span>
              </div>
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
                      const maxStakeable = parseFloat(userBalance);
                      setAmount(maxStakeable.toFixed(18));
                    }}
                    className="max-button"
                  >
                    Max
                  </button>
                  <button
                    onClick={handleStake}
                    disabled={loading || !amount || parseFloat(amount) <= 0}
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
                    onClick={() =>
                      setAmount(parseFloat(stakedBalance).toFixed(18))
                    }
                    className="max-button"
                  >
                    Max
                  </button>
                  <button
                    onClick={handleUnstake}
                    disabled={
                      loading ||
                      !amount ||
                      parseFloat(amount) > parseFloat(stakedBalance)
                    }
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
