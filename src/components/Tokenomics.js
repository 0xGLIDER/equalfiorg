import React, { useState } from "react";
import "./../styles/Tokenomics.css";

function Tokenomics() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <section id="tokenomics" className="tokenomics">
      <h2>Tokenomics</h2> 
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`tab-button ${activeTab === "burn" ? "active" : ""}`}
          onClick={() => setActiveTab("burn")}
        >
          Burn Mechanism
        </button>
        <button
          className={`tab-button ${activeTab === "allocation" ? "active" : ""}`}
          onClick={() => setActiveTab("allocation")}
        >
          Initial Allocation
        </button>
        <button
          className={`tab-button ${activeTab === "rewards" ? "active" : ""}`}
          onClick={() => setActiveTab("rewards")}
        >
          Staking Rewards
        </button>
        <button
          className={`tab-button ${activeTab === "nft" ? "active" : ""}`}
          onClick={() => setActiveTab("nft")}
        >
          NFT Integration
        </button>
        <button
          className={`tab-button ${activeTab === "dump" ? "active" : ""}`}
          onClick={() => setActiveTab("dump")}
        >
          No Dumping
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "overview" && (
          <div>
            <h3>Overview</h3>
            <p>
              The total supply of EqualFi tokens is uncapped. Emissions occur via staking rewards, 
              and tokens are burned during ecosystem interactions. EqualFi is an Omnichain OFT 
              utilizing Layer Zero for cross chain transfers and communications.  The EqualFi NFT 
              also utlilizes Layer Zero and is an Omnichain ONFT allowing users to choose their 
              favorite network to interact with.
            </p>
          </div>
        )}

        {activeTab === "burn" && (
          <div>
            <h3>Burn Mechanism</h3>
            <p>
              Tokens are burned as gas fees during token transfers and interactions within the EqualFi 
              ecosystem. These fees are static and predetermined, ensuring predictable transaction costs. 
              The more activity the ecosystem sees, the more tokens will be burned.
            </p>
          </div>
        )}

        {activeTab === "allocation" && (
          <div>
            <h3>Initial Allocation</h3>
            <p>
              At token creation, 2 million tokens will be allocated for early airdrops to encourage 
              ecosystem engagement. There will be no original developer or VC allocation, ensuring 
              a fair distribution.
            </p>
          </div>
        )}

        {activeTab === "rewards" && (
          <div>
            <h3>Staking Rewards</h3>
            <p>
              Staking rewards are based on a predetermined block reward multiplied by the number 
              of tokens staked. Bonus levels from required NFTs enhance rewards. The staking 
              system ensures predictable emissions while rewarding ecosystem participants.
            </p>
          </div>
        )}

        {activeTab === "nft" && (
          <div>
            <h3>NFT Integration</h3>
            <p>
              NFTs are required to stake tokens, with three levels offering unique multipliers. 
              There is a capped supply of NFTs, ensuring limited staking participants and 
              predictable emissions. Each wallet also has a staking cap to maintain fairness.
            </p>
          </div>
        )}

        {activeTab === "dump" && (
          <div>
            <h3>No Dumping</h3>
            <p>
            There will be no original developer allocation or venture capital
            allocation. This ensures a fair launch with no risk of sudden token
            dumps
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Tokenomics;
