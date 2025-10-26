import { useState } from 'react';
import './App.css';
import Background from './background/Background';
import Token from './drag/Token';
import Toggle from './fixed/Toggle';
import DragZone from './drag/DragZone';



function App() {

  const [backgroundImage, setBackgroundImage] = useState("url(/assets/backgrounds/blue_circle_large.webp)");
  const [enabled, setEnabled] = useState(true);

  function toggleBackground(enabled: boolean) {
    setEnabled(enabled);
    if (enabled) {
      setBackgroundImage("url(/assets/backgrounds/green_circle_large.webp)");
    } else {
      setBackgroundImage("url(/assets/backgrounds/blue_circle_large.webp)");
    }
  }

  return (
    <>
      <Background image = {backgroundImage} />
      <DragZone enabled={enabled} />
      <Toggle callback={toggleBackground}/>
    </>
  );
}

export default App;
