import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import "./../styles/Navbar.css";
import brandLogo from "./../assets/brand.png";
import { BrowserProvider } from "ethers";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [connectedAccount, setConnectedAccount] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (target) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: "auto" });
      }, 100);
    } else {
      document.getElementById(target)?.scrollIntoView({ behavior: "auto" });
    }
    setMenuOpen(false); 
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const connectWallet = async () => {
    try {
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setConnectedAccount(accounts[0]);
    } catch (error) {
      console.error("Wallet connection error:", error);
    }
  };

  const disconnectWallet = () => {
    setConnectedAccount(null);
  };

  const truncateAddress = (address) =>
    address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";

  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_accounts", []);
        if (accounts.length) setConnectedAccount(accounts[0]);
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    };
    checkWalletConnection();
  }, []);

  return (
    <nav className="navbar">
      {/* Left Section: Brand */}
      <div className="navbar-brand">
        <RouterLink to="/">
          <img src={brandLogo} alt="EqualFi Logo" className="brand-logo" />
        </RouterLink>
      </div>

      {/* Center Section: Navigation Links */}
      <ul className={`nav-menu ${menuOpen ? "open" : ""}`}>
        <li>
          <RouterLink
            to="#"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("mission");
            }}
          >
            Mission
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="#"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("offerings");
            }}
          >
            Offerings
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="#"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("tokenomics");
            }}
          >
            Tokenomics
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="#"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("team");
            }}
          >
            Team
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="#"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("community");
            }}
          >
            Community
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/staking" className="nav-link" onClick={() => setMenuOpen(false)}>
            Staking
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/nft" className="nav-link" onClick={() => setMenuOpen(false)}>
            NFT
          </RouterLink>
        </li>
      </ul>

      {/* Right Section: Wallet and Hamburger */}
      <div className="wallet-connect">
        {connectedAccount ? (
          <div className="wallet-info">
            <span className="account-display">{truncateAddress(connectedAccount)}</span>
            <button className="disconnect-wallet-btn" onClick={disconnectWallet}>
              Disconnect
            </button>
          </div>
        ) : (
          <button className="connect-wallet-btn" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
