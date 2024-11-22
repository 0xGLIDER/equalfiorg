import React from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Offerings from "./components/Offerings";
import Tokenomics from "./components/Tokenomics";
import Team from "./components/Team";
import Mission from "./components/Mission";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Header />
      <Mission />
      <Offerings />
      <Tokenomics />
      <Team />
      <Footer />
    </div>
  );
}

export default App;
