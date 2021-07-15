import React from "react";
import foto_hero from "../assets/img/foto_cv-removebg.png";
import icon_1 from "../assets/img/icon-important_mail.svg";
import icon_2 from "../assets/img/icon-github.svg";
import icon_3 from "../assets/img/linkedin-brands.svg";
import icon_4 from "../assets/img/icon-twitter_squared.svg";
var link_mail = `<a href='#contact'><img src=${icon_1} alt="" /></a>`
var link_github = `<a href='https://www.linkedin.com/in/niver-mtz/'><img src=${icon_2} alt="" /></a>`
var link_linkedin = `<a href='https://www.linkedin.com/in/niver-mtz/'><img src=${icon_3} style="width:24px" alt="" /></a>`
var link_twitter = `<a href='https://twitter.com/NiverUNAM'><img src=${icon_4} alt="" /></a>`

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
            Estudio Ingeniería en Computación en la FI-UNAM. Estoy comenzando mi
            carrera en el mundo de la Ingeniería de Software y el Desarrollo
            Web.
          </p>
          <div className="social is-hero">
            <div
              className="button-icon"
              dangerouslySetInnerHTML={{
                __html: link_mail.replace(/href/g, "target='_blank' href"),
              }}
            >
            </div>
            <div
              className="button-icon"
              dangerouslySetInnerHTML={{
                __html: link_github.replace(/href/g, "target='_blank' href"),
              }}
            >
            </div>
            <div
              className="button-icon"
              dangerouslySetInnerHTML={{
                __html: link_linkedin.replace(/href/g, "target='_blank' href"),
              }}
            >
            </div>
            <div
              className="button-icon"
              dangerouslySetInnerHTML={{
                __html: link_twitter.replace(/href/g, "target='_blank' href"),
              }}
            >
            </div>
          </div>
          <a
            href="https://github.com/NiverMtz/cv/raw/main/CV%20Niver%20Mtz.pdf"
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