import React from "react";
import Hero from "./components/Hero"
import Header from "./components/Header"
import Comment from "./components/Comment"

function App() {
  var name = 'Niver'

  return (
    <React.Fragment>
      <Header></Header>
    <div className='wrapper'>
      <Hero name={name}></Hero>
      <Comment></Comment>
    </div>
    </React.Fragment>
  );
}

export default App;
