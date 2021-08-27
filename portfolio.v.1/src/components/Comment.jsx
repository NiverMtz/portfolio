import React from 'react'
import icon from '../assets/img/arrow-down.svg'

const Comment = () => {
    return (
        <React.Fragment>
            <div class="comment">
            <span>El Desarrollo Web es muy divertido, creativo e interesante.</span>
            <span>Aquí hay algunos proyectos que he desarrollado.</span>
            <a href="#project">
                <img src={icon} width="80" height="80" alt=""/>
            </a>
            </div>
        </React.Fragment>
    )
}

export default Comment