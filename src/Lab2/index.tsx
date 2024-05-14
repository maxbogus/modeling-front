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
      <div style={{ display: 'flex', border: '1px solid white' }}>
        <p style={{ padding: 8, margin: 0, width: 50 }}>P:</p>
        {p.map((item) => (
          <p key={item} style={{ padding: 8, margin: 0, width: 50, borderLeft: '1px solid white' }}>
            {`${item}`.slice(0, 6)}
          </p>
        ))}
      </div>
      <div style={{ display: 'flex', border: '1px solid white', marginBottom: 8 }}>
        <p style={{ padding: 8, margin: 0, width: 50 }}>T:</p>
        {t.map((item) => (
          <p key={item} style={{ padding: 8, margin: 0, width: 50, borderLeft: '1px solid white' }}>
            {`${item}`.slice(0, 6)}
          </p>
        ))}
      </div>
    </div>
    <img src={`http://localhost:5000/${src}`} alt="pic" />
  </div>
);

interface FormProps {
  onSubmit: (data: undefined | Prop) => void;
}

const Form = ({ onSubmit }: FormProps) => {
  const [matrixSize, setMatrixSize] = useState<string>('10');
  const [step, setStep] = useState<string>('0.01');
  const [intensityMaxtrix, setIntensityMaxtrix] = useState<string[][] | undefined>();

  const generateHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const matrixSizeValue = parseInt(matrixSize, 10);
    if (matrixSizeValue < 2 || matrixSizeValue > 10) {
      alert('Matrix size should be in range 2 and 10!');
      return;
    }
    if (isNaN(matrixSizeValue)) {
      alert('please enter valid value!');
      return;
    }
    if (!Number.isInteger(parseFloat(matrixSize))) {
      alert('Should be integer!');
      return;
    }
    const result = await postData('http://localhost:5000/lab2/generate', {
      matrixSize
    });
    setIntensityMaxtrix(result.result);
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const stepValue = parseFloat(step);
    const matrixSizeValue = parseInt(matrixSize, 10);
    if (matrixSizeValue < 2 || matrixSizeValue > 10) {
      alert('Matrix size should be in range 2 and 10!');
      return;
    }
    if (isNaN(matrixSizeValue) || isNaN(stepValue)) {
      alert('please enter valid value!');
      return;
    }
    if (!Number.isInteger(parseFloat(matrixSize))) {
      alert('Should be integer!');
      return;
    }
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
            setMatrixSize(event.target.value);
          }}
          value={`${matrixSize}`}
          label="Quantity of conditions"
        />
        <button type="submit" style={{ margin: 8 }}>
          Generate intensity
        </button>
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
            setStep(event.target.value);
          }}
          value={`${step}`}
          label="Step on graph"
        />
        <button type="submit" style={{ margin: 8 }}>
          Solve and build graph
        </button>
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
