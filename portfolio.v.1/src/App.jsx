import React from "react";
import Hero from "./components/Hero";
import Header from "./components/Header";
import Comment from "./components/Comment";
import Project from "./components/Project";

// Project Props: Sector
import projectSector from './assets/img/sector.png';
var linkProjectSector = "https://nivermtz.github.io/sector/";
var linkCodeSector = 'https://github.com/NiverMtz/sector';

function App() {
  return (
    <React.Fragment>  
      <Header></Header>
      <div className="wrapper">
      <Hero name="Niver"></Hero>
      <Comment></Comment>
      <Project
        pathImage={projectSector}
        linkProject={linkProjectSector}
        linkCode={linkCodeSector}
      />
      </div>
    </React.Fragment>
  );
}

export default App;
