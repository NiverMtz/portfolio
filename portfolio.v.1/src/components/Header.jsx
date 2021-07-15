import React from "react";
import icon from "../assets/img/logo-niver-mtz-salmon.png";
var link_curr = `<a target="_blank" style="text-decoration: none; color: white;" href="https://nivermtz.github.io/cv/">curriculum</a>`;

const Header = () => {
  return (
      <React.Fragment>
      <header class="header">
        <div class="wrapper">
          <div class="header-content">
            <img
              src={icon}
              height="80%"
              alt="logo bonito"
            />
            <nav class="menu">
              <ul>
                <li>
                  <a class="is-active" href="#main">
                    Hola
                  </a>
                </li>
                <li>
                  <a href="#project">Proyectos</a>
                </li>
                <li>
                  <a href="#contact">Contactar</a>
                </li>
              </ul>
            </nav>
            <button
              className="button"
              dangerouslySetInnerHTML={{
                __html: link_curr.replace(/href/g, "target='_blank' href"),
              }}
            ></button>
          </div>
        </div>
      </header>
      </React.Fragment>
  );
};

export default Header;