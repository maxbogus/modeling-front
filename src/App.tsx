import './App.css';

function App() {
  const labs = [0 , 1, 2, 3, 4];
  return (
      <ul>
        {labs.map((lab) => <li key={lab}>Lab: {lab}</li>)}
      </ul>
  )
}

export default App
