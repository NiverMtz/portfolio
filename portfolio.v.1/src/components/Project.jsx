import React from "react";

const Project = (props) => {
  return (
    <div id="project" className="project">
      <div className="project-image">
        <img src={props.pathImage} alt="" />
      </div>
      <div className="project-description">
      <a class="title" href={props.linkProject} target="_blank" rel="noreferrer">{props.title}</a>
        <p>{props.description}</p>
        <div className="project-button">
        <a class='button' href={props.linkCode} target="_blank" rel="noreferrer">Ver código</a>
        <a class='button is-secondary' href={props.linkProject} target="_blank" rel="noreferrer">Ver proyecto</a>
        </div>
      </div>
    </div>
  );
};

export default Project;
