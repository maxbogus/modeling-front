import { FormEvent, useState } from 'react';
import { Input } from '../common/Input';
import { postData } from '../utils';

interface Prop {
  result: Record<string, string>;
}

const Result = ({ result }: Prop) => (
  <div>
    {Object.keys(result).map((item) => (
      <div key={item}>
        <p>{item}:</p>
        <img alt={item} src={`${result[item]}?${Math.random().toString(36)}`} />
      </div>
    ))}
  </div>
);

interface FormProps {
  onSubmit: (data: undefined | Record<string, string>) => void;
}

const Form = ({ onSubmit }: FormProps) => {
  const [xMin, setXMin] = useState<string>('-10');
  const [xMax, setXMax] = useState<string>('10');
  const [a, setA] = useState<string>('-5');
  const [b, setB] = useState<string>('5');

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const xMaxValue = parseInt(xMax, 10);
    const xMinValue = parseInt(xMin, 10);
    const aValue = parseInt(a, 10);
    const bValue = parseInt(b, 10);
    if (xMaxValue <= xMinValue) {
      alert('xMin should lest than xMax!');
      return;
    }
    if (bValue <= aValue) {
      alert('a should lest than b!');
      return;
    }
    if (isNaN(aValue) || isNaN(bValue) || isNaN(xMinValue) || isNaN(xMaxValue)) {
      alert('enter valid input!');
      return;
    }
    const result = await postData('http://localhost:5000/lab1/calculate', {
      a,
      b,
      xMax,
      xMin
    });
    console.log(result);
    onSubmit(result);
  };

  return (
    <form onSubmit={submitHandler}>
      <Input
        onChange={(event) => {
          setXMin(event.target.value);
        }}
        value={xMin}
        label="xMin"
      />
      <Input
        onChange={(event) => {
          setXMax(event.target.value);
        }}
        value={xMax}
        label="xMax"
      />
      <Input
        onChange={(event) => {
          setA(event.target.value);
        }}
        value={a}
        label="a"
      />
      <Input
        onChange={(event) => {
          setB(event.target.value);
        }}
        value={b}
        label="b"
      />
      <button type="submit">Calculate</button>
    </form>
  );
};

const FormErlang = ({ onSubmit }: FormProps) => {
  const [xMin, setXMin] = useState<string>('1');
  const [xMax, setXMax] = useState<string>('10');
  const [k, setK] = useState<string>('2');
  const [lambda, setLambda] = useState<string>('3');

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const xMaxValue = parseInt(xMax, 10);
    const xMinValue = parseInt(xMin, 10);
    const lValue = parseFloat(lambda);
    const kValue = parseInt(k, 10);
    if (xMaxValue <= xMinValue) {
      alert('xMin should lest than xMax!');
      return;
    }
    if (xMinValue <= 0) {
      alert('xMin should more than 0!');
      return;
    }
    if (lValue <= 0) {
      alert('l should be >= 0!');
      return;
    }
    if (kValue <= 0) {
      alert('k should be >= 0!');
      return;
    }
    if (!Number.isInteger(kValue)) {
      alert('k should be int not float!');
      return;
    }
    if (isNaN(kValue) || isNaN(lValue) || isNaN(xMinValue) || isNaN(xMaxValue)) {
      alert('enter valid input!');
      return;
    }
    const result = await postData('http://localhost:5000/lab1/calculateErlang', {
      k,
      lambda,
      xMax,
      xMin
    });
    console.log(result);
    onSubmit(result);
  };

  return (
    <form onSubmit={submitHandler}>
      <Input
        onChange={(event) => {
          setXMin(event.target.value);
        }}
        value={xMin}
        label="xMin"
      />
      <Input
        onChange={(event) => {
          setXMax(event.target.value);
        }}
        value={xMax}
        label="xMax"
      />
      <Input
        onChange={(event) => {
          setK(event.target.value);
        }}
        value={k}
        label="k"
      />
      <Input
        onChange={(event) => {
          setLambda(event.target.value);
        }}
        value={lambda}
        label="lambda"
      />
      <button type="submit">Calculate</button>
    </form>
  );
};

export const Lab1 = () => {
  const [result, setResult] = useState<Record<string, string> | undefined>();
  const [resultErlang, setResultErlang] = useState<Record<string, string> | undefined>();
  return (
    <div
      style={{ display: 'flex', justifyContent: 'space-around', minWidth: 640 * 2, width: '100%' }}>
      <div>
        <Form onSubmit={(data: Record<string, string> | undefined) => setResult(data)} />
        {result !== undefined && <Result result={result} />}
      </div>
      <div>
        <FormErlang
          onSubmit={(data: Record<string, string> | undefined) => setResultErlang(data)}
        />
        {resultErlang !== undefined && <Result result={resultErlang} />}
      </div>
    </div>
  );
};
