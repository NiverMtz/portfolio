import React from "react";
import Hero from "./components/Hero";
import Header from "./components/Header";
import Comment from "./components/Comment";
import Project from "./components/Project";
import Testimony from "./components/Testimony";

// Testimony Images
import pathImageTestimonyMariana from "./assets/img/mariana.jpg";

// Project Images
import projectSector from "./assets/img/sector.png";

// Projects Links
var linkCodeSector = "https://github.com/NiverMtz/sector";
var linkProjectSector = "https://nivermtz.github.io/sector/";

// Testimonys
var testimonyTextMariana = `"Niver Mtz es una persona con altos valores sociales, 
                              que le gusta entregar productos de calidad. Es
                              meticuloso y se esfuerza por dar lo mejor de sí 
                              en cada proyecto que realiza."`;
var testimonyAutorMariana = "Mariana Pérez / MAPER Consultoría";

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
        <Testimony
          pathImage={pathImageTestimonyMariana}
          testimonyText={testimonyTextMariana}
          testimonyAutor={testimonyAutorMariana}
        />
      </div>
    </React.Fragment>
  );
}

export default App;
