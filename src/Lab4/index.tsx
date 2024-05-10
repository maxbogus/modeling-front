import { FormEvent, useState } from 'react';
import { postData } from '../utils';

interface Prop {
  result: Record<string, string>;
}

const Result = ({ result }: Prop) => (
  <div>
    {Object.keys(result).map((item) => (
      <div key={item}>
        <p>
          {item}: {result[item]}
        </p>
      </div>
    ))}
  </div>
);

interface FormProps {
  onSubmit: (data: undefined | Record<string, string>) => void;
}

const Form = ({ onSubmit }: FormProps) => {
  const [a, setA] = useState<string>('-5');
  const [b, setB] = useState<string>('5');
  const [k, setK] = useState<string>('2');
  const [sigma, setSigma] = useState<string>('3');
  const [number, setNumber] = useState<string>('1000');
  const [percent, setPercent] = useState<string>('0');
  const [timeStep, setTimeStep] = useState<string>('0.01');

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await postData('http://localhost:5000/lab4/calculate', {
      a,
      b,
      k,
      sigma,
      number,
      percent,
      timeStep
    });
    console.log(result);
    onSubmit(result);
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="a">Enter normal distribution a value:</label>
        <br />
        <input
          name="a"
          onChange={(event) => {
            setA(event.target.value);
          }}
          defaultValue={a}
        />
      </div>
      <div>
        <label htmlFor="b">Enter normal distribution b value:</label>
        <br />
        <input
          name="b"
          onChange={(event) => {
            setB(event.target.value);
          }}
          defaultValue={b}
        />
      </div>
      <div>
        <label htmlFor="k">Enter Erlang distribution k value:</label>
        <br />
        <input
          name="k"
          onChange={(event) => {
            setK(event.target.value);
          }}
          defaultValue={k}
        />
      </div>
      <div>
        <label htmlFor="sigma">Enter Erlang distribution sigma value:</label>
        <br />
        <input
          name="sigma"
          onChange={(event) => {
            setSigma(event.target.value);
          }}
          defaultValue={sigma}
        />
      </div>
      <div>
        <label htmlFor="number">Enter number of requests:</label>
        <br />
        <input
          name="number"
          onChange={(event) => {
            setNumber(event.target.value);
          }}
          defaultValue={number}
        />
      </div>
      <div>
        <label htmlFor="percent">Enter percent:</label>
        <br />
        <input
          name="percent"
          onChange={(event) => {
            setPercent(event.target.value);
          }}
          defaultValue={percent}
        />
      </div>
      <div>
        <label htmlFor="timeStep">Enter time step:</label>
        <br />
        <input
          name="timeStep"
          onChange={(event) => {
            setTimeStep(event.target.value);
          }}
          defaultValue={timeStep}
        />
      </div>

      <p>{`a: ${a} ${b} ${k} ${sigma} ${number} ${percent} ${timeStep}`}</p>
      <button type="submit">Calculate</button>
    </form>
  );
};

export const Lab4 = () => {
  const [result, setResult] = useState<Record<string, string> | undefined>();

  return (
    <div>
      <Form onSubmit={(data: Record<string, string> | undefined) => setResult(data)} />
      {result !== undefined && <Result result={result} />}
    </div>
  );
};
