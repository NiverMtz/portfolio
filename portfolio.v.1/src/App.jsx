import React from "react";

// Components
import Hero from "./components/Hero";
import Header from "./components/Header";
import Comment from "./components/Comment";
import Project from "./components/Project";
import Testimony from "./components/Testimony";

// Project Images
import projectSector from "./assets/img/sector.png";
import projectWebFreelance from "./assets/img/website-freelance.png";

// Testimony Images
import pathImageTestimonyMariana from "./assets/img/mariana.jpg";
import pathImageTestimonyMena from "./assets/img/ProfeMena.webp";

// Projects Links
var linkProjectSector = "https://nivermtz.github.io/sector/";
var linkCodeSector = "https://github.com/NiverMtz/sector";
var linkProjectWebFreelance = "https://nivermtz.github.io/freelancer-website/";
var linkCodeWebFreelance = "https://github.com/NiverMtz/freelancer-website";

// Testimonys
var testimonyTextMariana = `"Niver Mtz es una persona con altos valores sociales, 
                              que le gusta entregar productos de calidad. Es
                              meticuloso y se esfuerza por dar lo mejor de sí 
                              en cada proyecto que realiza."`;
var testimonyAutorMariana = "Mariana Pérez / MAPER Consultoría";

var testimonyTextMena = `"Niver Martínez es un alumno responsable, serio y con mente 
                              abierta para buscar o aprender si esnecesario. Demuestra 
                              su comprimiso de superación personal y desarrollo profesional 
                              entregando en el tiempo estipulado las tareas que le son encomendadas."`;
var testimonyAutorMena = "M.C. Alejandro Mena / FI-UNAM";

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
        <Project
          pathImage={projectWebFreelance}
          linkProject={linkProjectWebFreelance}
          linkCode={linkCodeWebFreelance}
        />
        <Testimony
          pathImage={pathImageTestimonyMena}
          testimonyText={testimonyTextMena}
          testimonyAutor={testimonyAutorMena}
        />
      </div>
    </React.Fragment>
  );
}

export default App;
