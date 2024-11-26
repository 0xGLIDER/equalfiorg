import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Mission from "./components/Mission";
import Offerings from "./components/Offerings";
import Tokenomics from "./components/Tokenomics";
import Team from "./components/Team";
import Community from "./components/Community";
import Footer from "./components/Footer";
import StakingPage from "./pages/StakingPage";
import NFTSale from "./pages/NFTSale";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Mission />
              <Offerings />
              <Tokenomics />
              <Team />
              <Community />
              <Footer />
            </>
          }
        />
        <Route path="/staking" element={<StakingPage />} />
        <Route path="/nft" element={<NFTSale />} />
      </Routes>
    </Router>
  );
}

export default App;
