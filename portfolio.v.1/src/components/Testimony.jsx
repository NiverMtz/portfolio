import React from 'react';

const Testimony = (props) => {
    return (
        <div class="testimony">
            <div class="testimony-container">
                <img src={props.pathImage} alt=""/>
                <p>{props.testimonyText}</p>
                <p>{props.testimonyAutor}</p>
            </div>
        </div>
    )
}

export default Testimony
