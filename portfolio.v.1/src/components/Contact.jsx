import React from 'react'

const Contact = () => {

    // async function handleSubmit (event) {
    //     event.preventDefault();
    //     const form = new FormData(this);
    //     const response = await fetch(this.action,{
    //         method: this.method,
    //         body: form,
    //         headers: {
    //             'Accept': 'application/json'
    //         }
    //     });
    //     if (response.ok) {
    //         this.reset();
    //         alert('¡Gracias por contactarme, estaré en contacto contigo pronto!');
    //     }
    // }

    return (
        <React.Fragment>
        <form id="contact" class="form" action="https://formspree.io/f/meqvkogj" method="POST">
            <div class="form-content">
                <h2 class="title">Contáctame</h2>
                <p>Si está interesado en trabajar conmigo en su próximo proyecto, no dude en ponerse en contacto
                    conmigo.</p>
                <label for="form-name">
                    <div class="form-title">Nombre Completo <span>*</span></div>
                    <input required type="text" placeholder="Luke Skywalker" name="form-name" id="form-name"/>
                </label>
                <label for="form-email">
                    <div class="form-title">Correo electrónico <span>*</span></div>
                    <input required type="email" placeholder="luke_skywalker@que.la.fuerza.te.acompañe" name="email"
                        id="form-email"/>
                </label>
                <label for="form-message">Mensaje
                    <textarea name="message" placeholder="Mensaje" id="form-message" cols="20" rows="7"></textarea>
                </label>
                {/* <button class="button" type="submit" onClick={handleSubmit}>enviar mensaje</button> */}
                <button class="button">enviar mensaje</button>
            </div>
            {/* <a href="mailto:nivermartinezmed@gmail.com" id="tosend">mail</a> */}
        </form>
        </React.Fragment>
    )
}

export default Contact
