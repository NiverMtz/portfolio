import React from "react";
import Hero from "./components/Hero";
import Header from "./components/Header";
import Comment from "./components/Comment";
import Project from "./components/Project";

function App() {
  return (
    <React.Fragment>  
      <Header></Header>
      <div className="wrapper">
      <Hero name="Niver"></Hero>
      <Comment></Comment>
      <Project></Project>
      </div>
    </React.Fragment>
  );
}

export default App;
