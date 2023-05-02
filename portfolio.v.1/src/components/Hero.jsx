import React from "react";
import foto_hero from "../assets/img/foto_cv-removebg.png";
import icon_2 from "../assets/img/icon-github.svg";
import icon_1 from "../assets/img/icon-important_mail.svg";
import icon_4 from "../assets/img/icon-twitter_squared.svg";
import icon_3 from "../assets/img/linkedin-brands.svg";
var link_mail = `<a href='#contact'><img src=${icon_1} alt="" /></a>`;
var link_github = `<a href='https://www.linkedin.com/in/niver-mtz/'><img src=${icon_2} alt="" /></a>`;
var link_linkedin = `<a href='https://www.linkedin.com/in/niver-mtz/'><img src=${icon_3} style="width:24px" alt="" /></a>`;
var link_twitter = `<a href='https://twitter.com/nivermtz'><img src=${icon_4} alt="" /></a>`;

const Hero = (props) => {
  return (
    <div>
      <section aria-label="main" className="hero" id="main">
        <div className="hero-image">
          <img src={foto_hero} alt="" />
        </div>
        <div className="hero-description">
          <h1>
            <span>¡Bienvenid@!</span>
            <span>Soy {props.name}</span>
          </h1>
          <p>
            
            <strong>Frontend Developer</strong> con más de 3 años de experiencia, particpando
            en diferentes proyectos para empresas del sector privado y proyectos independientes.
            También, sigo aprendiendo otras cosas como <strong>Back End,
            Aplicaciones Móviles y Ciencia de Datos.</strong>
          </p>
          <div className="social is-hero">
            <div
              className="button-icon"
              dangerouslySetInnerHTML={{
                __html: link_mail.replace(/href/g, "href"),
              }}
            ></div>
            <div
              className="button-icon"
              dangerouslySetInnerHTML={{
                __html: link_github.replace(/href/g, "target='_blank' href"),
              }}
            ></div>
            <div
              className="button-icon"
              dangerouslySetInnerHTML={{
                __html: link_linkedin.replace(/href/g, "target='_blank' href"),
              }}
            ></div>
            <div
              className="button-icon"
              dangerouslySetInnerHTML={{
                __html: link_twitter.replace(/href/g, "target='_blank' href"),
              }}
            ></div>
          </div>
          <a
            href="https://github.com/NiverMtz/cv/raw/main/CV-NiverMartinez-ES.pdf"
            className="button"
          >
            Descargar curriculum
          </a>
        </div>
      </section>
    </div>
  );
};

export default Hero;
