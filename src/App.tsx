import { useState } from 'react';
import './App.css';
import Background from './background/Background';
import Token from './drag/Token';
import Toggle from './fixed/Toggle';


const multipleTokens = [1,2,3,4,5,6,7,8,9].map(i => <Token key={i} top = {Math.random() * (window.innerHeight-150)} left = {Math.random() * (window.innerWidth-150)}/>);

function App() {

  const [backgroundImage, setBackgroundImage] = useState("url(/assets/backgrounds/blue_circle_large.webp)");

  function toggleBackground(enabled: boolean) {
    if (enabled) {
      setBackgroundImage("url(/assets/backgrounds/green_circle_large.webp)");
    } else {
      setBackgroundImage("url(/assets/backgrounds/blue_circle_large.webp)");
    }
  }

  return (
    <>
      <Background image = {backgroundImage} />
      <div id="dragZone">
        {multipleTokens}
      </div>
      <Toggle callback={toggleBackground}/>
    </>
  );
}

export default App;
