import { FormEvent, useState } from 'react';
import './App.css';

interface Prop {
  result: string;
}

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const FourthLab = () => {
  const Result = ({result}: Prop) => <div>{result}</div>;
  const [a, setA] = useState<string>("-5");
  const [b, setB] = useState<string>("5");
  const [k, setK] = useState<string>("2");
  const [sigma, setSigma] = useState<string>("3");
  const [number, setNumber] = useState<string>("1000");
  const [percent, setPercent] = useState<string>("0");
  const [timeStep, setTimeStep] = useState<string>("0.01");
  const [result, setResult] = useState<string | undefined>();

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await postData("http://localhost:5000/calculate", { a, b, k, sigma, number, percent, timeStep });
    console.log(result.params);
    setResult(result.params);
  };

  const Form = () =>
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="a">Enter normal distribution a value:</label>
        <br />
        <input name='a' onKeyDown={(event) => {setA(event.key);}} defaultValue={a} />
      </div>
      <div>
        <label htmlFor="b">Enter normal distribution b value:</label>
        <br />
        <input name="b" onKeyDown={(event) => {setB(event.key);}} defaultValue={b} />
      </div>
      <div>
        <label htmlFor="k">Enter Erlang distribution k value:</label>
        <br />
        <input name="k" onKeyDown={(event) => {setK(event.key);}} defaultValue={k} />
      </div>
      <div>
        <label htmlFor="sigma">Enter Erlang distribution sigma value:</label>
        <br />
        <input name="sigma" onKeyDown={(event) => {setSigma(event.key);}} defaultValue={sigma} />
      </div>
      <div>
        <label htmlFor="number">Enter number of requests:</label>
        <br />
        <input name="number" onKeyDown={(event) => {setNumber(event.key);}} defaultValue={number} />
      </div>
      <div>
        <label htmlFor="percent">Enter percent:</label>
        <br />
        <input name="percent" onKeyDown={(event) => {setPercent(event.key);}} defaultValue={percent} />
      </div>
      <div>
        <label htmlFor="timeStep">Enter time step:</label>
        <br />
        <input name="timeStep" onKeyDown={(event) => {setTimeStep(event.key);}} defaultValue={timeStep} />
      </div>

      <p>{`a: ${a} ${b} ${k} ${sigma} ${number} ${percent} ${timeStep}`}</p>
      <button type="submit">Calculate</button>
    </form>;
  return <div>
    <Form />
    {
      result !== undefined && (<Result result={result} />)
    }
  </div>
}

const selectLab = (lab: number | undefined) => {
  switch (lab) {
    case 4:
      return <FourthLab />;
    default:
      return <></>;
  }
}

const App = () => {
  const labs = [4];
  const [ selectedLab, setSelectedLab] = useState<number | undefined>();
  return (
    <>
      <div>
        {labs.map((lab) => <button key={lab} onClick={() => setSelectedLab(lab)}>Lab: {lab}</button>)}
      </div>
      { selectLab(selectedLab)}
    </>
  )
}

export default App
