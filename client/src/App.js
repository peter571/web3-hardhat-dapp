import React from "react";
import "./App.css";
import { Navigation, Welcome, Transactions, Footer } from "./components";

const App = () => {
  return (
    <div className="app">
      <div className="div-components">
        <Navigation />
        <Welcome />
        <Transactions />
        <Footer />
      </div>
    </div>
  )
}
export default App;
