import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const history = useHistory()
  const GoTO = ()=>{
    history.push('/topics');
  }
  return (
  <> <h1>This is App</h1>
  <button onClick={GoTO}>Go To topics</button>
  
  </>
  );
}

export default App;
