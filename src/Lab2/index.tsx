import { FormEvent, useState } from 'react';
import { Input } from '../common/Input';
import { postData, useForceUpdate } from '../utils';

interface Prop {
  p: string[];
  t: string[];
  src: string;
}

const Result = ({ p, t, src }: Prop) => (
  <div>
    <h1>Результат вычисления</h1>
    <div>
      <p>
        P:{' '}
        {p.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </p>
      <p>
        T:{' '}
        {t.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </p>
    </div>
    <img src={`http://localhost:5000/${src}`} alt="pic" />
  </div>
);

interface FormProps {
  onSubmit: (data: undefined | Prop) => void;
}

const Form = ({ onSubmit }: FormProps) => {
  const [matrixSize, setMatrixSize] = useState<number>(10);
  const [step, setStep] = useState<number>(0.01);
  const [intensityMaxtrix, setIntensityMaxtrix] = useState<string[][] | undefined>();

  const generateHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await postData('http://localhost:5000/lab2/generate', {
      matrixSize
    });
    setIntensityMaxtrix(result.result);
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await postData('http://localhost:5000/lab2/calculate', {
      intensityMaxtrix,
      step,
      matrixSize
    });
    console.log(result);
    onSubmit(result);
  };

  return (
    <div>
      <form onSubmit={generateHandler}>
        <Input
          onChange={(event) => {
            setMatrixSize(parseFloat(event.target.value) ?? 0.0);
          }}
          value={`${matrixSize}`}
          label="Quantity of conditions"
        />
        <button type="submit">Generate intensity</button>
      </form>
      <div>
        {intensityMaxtrix?.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((item, columnIndex) => (
              <input
                style={{ minWidth: 20, maxWidth: 60 }}
                key={columnIndex}
                value={item}
                onChange={(event) => {
                  const newArray = [...intensityMaxtrix];
                  newArray[rowIndex][columnIndex] = event.target.value;
                  setIntensityMaxtrix(newArray);
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <form onSubmit={submitHandler}>
        <Input
          onChange={(event) => {
            setStep(parseFloat(event.target.value) ?? 0.0);
          }}
          value={`${step}`}
          label="step on graph"
        />
        <button type="submit">Solve and build graph</button>
      </form>
    </div>
  );
};

export const Lab2 = () => {
  const [result, setResult] = useState<Prop | undefined>();
  const forceUpdate = useForceUpdate();

  return (
    <div>
      <Form
        onSubmit={(data: Prop | undefined) => {
          setResult(data);
          forceUpdate();
        }}
      />
      {result !== undefined && (
        <Result
          src={`${result.src}?${Math.random().toString(36)}`}
          p={result.p ?? ['']}
          t={result.t ?? ['']}
        />
      )}
    </div>
  );
};
