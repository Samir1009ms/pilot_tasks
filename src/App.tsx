import React from 'react';
import './App.scss';
import Home from "./pages/home/Home";
import Header from "./shared/header/Header";
import Footer from './shared/footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
