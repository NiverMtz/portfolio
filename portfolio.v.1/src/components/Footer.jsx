import React from "react";
import logo from "../assets/img/logo-niver-mtz-salmon.png";
import iconGitHub from "../assets/img/icon-github.svg";
import iconLinkedin from "../assets/img/linkedin-brands.svg";
import iconTwitter from "../assets/img/icon-twitter_squared.svg";

const Footer = () => {
  return (
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-logo">
          <img src={logo} height="50px" alt="logo bonito" />
        </div>
        <div class="social">
          <a
            class="button-icon"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/NiverMtz"
          >
            <img src={iconGitHub} alt="" />
          </a>
          <a
            class="button-icon"
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/in/niver-mtz/"
          >
            <img src={iconLinkedin} width="24px" alt="" />
          </a>
          <a
            class="button-icon"
            target="_blank"
            rel="noreferrer"
            href="https://twitter.com/nivermtz"
          >
            <img src={iconTwitter} alt="" />
          </a>
        </div>
        <div class="footer-copyright">
          <p>Hecho con el &#10084; por Niver.</p>
          <p>Copyright 2021 - Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
