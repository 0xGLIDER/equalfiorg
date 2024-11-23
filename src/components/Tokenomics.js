import React from "react";
import "./../styles/Tokenomics.css";

function Tokenomics() {
  return (
    <section className="tokenomics">
      <h2>Tokenomics</h2>
      <div className="tokenomics-grid">
        {/* Total Supply Section */}
        <div className="tokenomics-section">
          <div className="icon">
            <i className="fas fa-coins"></i>
          </div>
          <h3>Total Supply</h3>
          <p>
            The total supply of EqualFi tokens is uncapped. Emissions occur via
            staking rewards and token burning during ecosystem interactions.
          </p>
        </div>

        {/* Burn Mechanism Section */}
        <div className="tokenomics-section">
          <div className="icon">
            <i className="fas fa-fire"></i>
          </div>
          <h3>Burn Mechanism</h3>
          <p>
            Tokens are burned as gas fees during token transfers and ecosystem
            interactions. These fees are static and predetermined, ensuring
            predictable transaction costs.
          </p>
        </div>

        {/* Initial Allocation Section */}
        <div className="tokenomics-section">
          <div className="icon">
            <i className="fas fa-gift"></i>
          </div>
          <h3>Initial Allocation</h3>
          <p>
            At token creation, 2 million tokens will be allocated for early
            airdrops to encourage ecosystem engagement.
          </p>
        </div>

        {/* Staking Rewards Section */}
        <div className="tokenomics-section">
          <div className="icon">
            <i className="fas fa-hand-holding-usd"></i>
          </div>
          <h3>Staking Rewards</h3>
          <p>
            Rewards are based on a predetermined block reward multiplied by
            staked tokens and bonus levels from required NFTs. NFTs will have
            three levels, each with unique multipliers, and a limited supply.
          </p>
        </div>

        {/* NFT and Emissions Section */}
        <div className="tokenomics-section">
          <div className="icon">
            <i className="fas fa-id-card"></i>
          </div>
          <h3>NFT Integration & Emissions</h3>
          <p>
            NFTs will be required to stake tokens, limiting the number of users
            and tokens that can be staked per wallet. This ensures emissions
            remain predictable.
          </p>
        </div>

        {/* No Dumping Section */}
        <div className="tokenomics-section">
          <div className="icon">
            <i className="fas fa-trash"></i>
          </div>
          <h3>No Dumping</h3>
          <p>
            There will be no original developer allocation or venture capital
            allocation. This ensures a fair launch with no risk of sudden token
            dumps.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Tokenomics;
