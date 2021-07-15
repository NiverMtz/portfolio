import React, { Fragment } from "react";
import sector from "../assets/img/sector.png";
var link_title = `<a class='title' href='https://github.com/NiverMtz/sector'>Sector</a>`;
var link_code = `<a class='button' href='https://github.com/NiverMtz/sector'>Ver código</a>`;
var link_project = `<a class='button is-secondary' href='https://github.com/NiverMtz/sector'>Ver proyecto</a>`;

const Project = () => {
  return (
    <div id="project" className="project">
      <div className="project-image">
        <img src={sector} alt="" />
      </div>
      <div className="project-description">
      <a class="title" href="https://freelance-website-niv-mtz.netlify.app/">Sector</a>
        {/* <div
          dangerouslySetInnerHTML={{
            __html: link_title.replace(/href/g, "target='_blank' href"),
          }}
        /> */}
        <p>Sitio para una tienda online de produtos para skaters.</p>
        <div className="project-button">
        <a class='button' href='https://github.com/NiverMtz/sector'>Ver código</a>
        <a class='button is-secondary' href='https://github.com/NiverMtz/sector'>Ver proyecto</a>
          {/* <div
            dangerouslySetInnerHTML={{
              __html: link_code.replace(/href/g, "target='_blank' href"),
            }}
          ></div>
          <div
            dangerouslySetInnerHTML={{
              __html: link_project.replace(/href/g, "target='_blank' href"),
            }}
            ></div> */}
        </div>
      </div>
    </div>
  );
};

export default Project;
