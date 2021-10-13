import React from "react";

// Components
import Hero from "./components/Hero";
import Header from "./components/Header";
import Comment from "./components/Comment";
import Project from "./components/Project";
import Testimony from "./components/Testimony";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Project Images
import projectSector from "./assets/img/project-skatestore.png";
import projectVacacionesCody from "./assets/img/project-vacacionescody.png";
import projectBlogMultiSkin from "./assets/img/project-multiskin.png";
import projectFrontEndStore from "./assets/img/project-frontendstore.png";
import projectGalacticCode from "./assets/img/project-galactic-code.png";

// Testimony Images
import pathImageTestimonyMariana from "./assets/img/mariana.jpg";
import pathImageTestimonyMena from "./assets/img/ProfeMena.webp";

// Projects Titles and Descriptions
var titleVacacionesCody = "Vacaciones de Cody";
var descriptionVacaionesCody = `Sitio para el concurso de #VeranoFrontEnd por Codigo Facilito.`;
var titleSector = "Sector";
var descriptionSector = `Sitio para una tienda online de produtos para skaters.`;
var titleBlogMultiSkin = "Blog Multi Skin";
var descriptionBlogMultiSkin = `Blog Web, con la especial función de elegir entre 
cinco tipos diferentes de estilos (skin).`;
var titleFrontendStore = "Front End Store";
var descriptionFrontendStore = `Marketplace para la venta de productos Front End.`;
var titleGalacticCode = "Galactic Code";
var descriptionGalacticCode = `Landing Page construída sobre la ficción de Servicios de 
Desarrollo Web Integaláctico.`;

// Projects Links
var linkProjectSector = "https://nivermtz.github.io/sector/";
var linkCodeSector = "https://github.com/NiverMtz/sector";
var linkProjectVacacionesCody = "https://github.com/NiverMtz/vacaciones-cody";
var linkCodeVacacionesCody = "https://nivermtz.github.io/vacaciones-cody/";
var linkProjectBlogMultiSkin =
  "https://nivermtz.github.io/html-css-essentials/";
var linkCodeBlogMultiSkin = "https://github.com/NiverMtz/html-css-essentials";
var linkProjectFrontendStore = "https://nivermtz.github.io/frontend-store/";
var linkCodeFrontendStore = "https://github.com/NiverMtz/frontend-store";
var linkProjectGalacticCode =
  "https://nivermtz.github.io/projecto-inicial-generation/";
var linkCodeGalacticCode =
  "https://github.com/NiverMtz/projecto-inicial-generation";

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
        <section className="projects">
          {/* <h2> 💻 Proyectos 📱 </h2> */}
          <Project
            title={titleGalacticCode}
            description={descriptionGalacticCode}
            pathImage={projectGalacticCode}
            linkProject={linkProjectGalacticCode}
            linkCode={linkCodeGalacticCode}
          />
          <Project
            title={titleFrontendStore}
            description={descriptionFrontendStore}
            pathImage={projectFrontEndStore}
            linkProject={linkProjectFrontendStore}
            linkCode={linkCodeFrontendStore}
          />
          <Project
            title={titleSector}
            description={descriptionSector}
            pathImage={projectSector}
            linkProject={linkProjectSector}
            linkCode={linkCodeSector}
          />
          <Project
            title={titleVacacionesCody}
            description={descriptionVacaionesCody}
            pathImage={projectVacacionesCody}
            linkProject={linkProjectVacacionesCody}
            linkCode={linkCodeVacacionesCody}
          />
          <Project
            title={titleBlogMultiSkin}
            description={descriptionBlogMultiSkin}
            pathImage={projectBlogMultiSkin}
            linkProject={linkProjectBlogMultiSkin}
            linkCode={linkCodeBlogMultiSkin}
          />
        </section>
        <section className="comments">
          {/* <h2> 🧔 Comentarios 👩‍🦰 </h2> */}
          <div className="galery">
            <div className="galery__item">
              <Testimony
                pathImage={pathImageTestimonyMariana}
                testimonyText={testimonyTextMariana}
                testimonyAutor={testimonyAutorMariana}
              />
            </div>
            <div className="galery__item">
              <Testimony
                pathImage={pathImageTestimonyMena}
                testimonyText={testimonyTextMena}
                testimonyAutor={testimonyAutorMena}
              />
            </div>
            <div className="galery__item">
              <Testimony
                pathImage={pathImageTestimonyMariana}
                testimonyText={testimonyTextMariana}
                testimonyAutor={testimonyAutorMariana}
              />
            </div>
            <div className="galery__item">
              <Testimony
                pathImage={pathImageTestimonyMena}
                testimonyText={testimonyTextMena}
                testimonyAutor={testimonyAutorMena}
              />
            </div>
          </div>
        </section>
        <Contact />
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default App;
