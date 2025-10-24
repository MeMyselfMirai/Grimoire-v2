import './App.css';
import Token from './drag/Token';

function App() {

  const multipleTokens = [1,2,3,4,5,6,7,8,9].map(_ => <Token top = {Math.random() * 400} left = {Math.random() * 800}/>);
  return (
    <>
      {multipleTokens}
    </>
  );
}

export default App;
