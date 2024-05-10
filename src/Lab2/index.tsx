import { FormEvent, useEffect, useState } from 'react';
import { Input } from '../common/Input';
import { postData } from '../utils';

interface ProbabilityTable {
  [key: string]: number[];
}

interface Prop {
  probabilityTable: ProbabilityTable;
  url: string;
}

const Result = ({ probabilityTable, url }: Prop) => (
  <div>
    <h1>Результат вычисления</h1>
    <div>
      {Object.keys(probabilityTable).map((rowName) => (
        <div key={rowName}>
          {probabilityTable[rowName].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      ))}
    </div>
    <img src={url} alt="pic" />
  </div>
);

interface FormProps {
  onSubmit: (data: undefined | Prop) => void;
}

const Form = ({ onSubmit }: FormProps) => {
  const [conditionsQuantity, setConditionsQuantity] = useState<number>(10);
  const [step, setStep] = useState<number>(0.01);
  const [intensityMaxtrix, setIntensityMaxtrix] = useState<string[][] | undefined>();

  const generateHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await postData('http://localhost:5000/lab2/generate', {
      conditionsQuantity
    });
    setIntensityMaxtrix(result.result);
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await postData('http://localhost:5000/lab2/calculate', {
      intensityMaxtrix,
      step
    });
    onSubmit(result);
  };

  return (
    <div>
      <form onSubmit={generateHandler}>
        <Input
          onChange={(event) => {
            setConditionsQuantity(parseFloat(event.target.value) ?? 0.0);
          }}
          value={`${conditionsQuantity}`}
          label="Quantity of conditions"
        />
        <button type="submit">Generate intensity</button>
      </form>
      <div>
        {intensityMaxtrix?.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((item, columnIndex) => (
              <input style={{minWidth: 20, maxWidth: 60}} key={columnIndex} value={item} onChange={(event) => {
                const newArray = [...intensityMaxtrix];
                newArray[rowIndex][columnIndex] = event.target.value;
                setIntensityMaxtrix(newArray);
              }} />
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
        <p>{`${conditionsQuantity} ${step}`}</p>
        <button type="submit">Solve and build graph</button>
      </form>
    </div>
  );
};

export const Lab2 = () => {
  const [result, setResult] = useState<Prop | undefined>();
  return (
    <div>
      <Form onSubmit={(data: Prop | undefined) => setResult(data)} />
      {result !== undefined && (
        <Result url={result.url ?? ''} probabilityTable={result.probabilityTable ?? [[]]} />
      )}
    </div>
  );
};
