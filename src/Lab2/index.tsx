import { FormEvent, useState } from 'react';
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
  const [intensityMaxtrix, setIntensityMaxtrix] = useState<string[][]>([
    ['1', '2'],
    ['2', '1']
  ]);

  const generateHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await postData('http://localhost:5000/lab2/generate', {
      conditionsQuantity,
      step
    });
    console.log(result);
    onSubmit(result);
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await postData('http://localhost:5000/lab2/calculate', {
      conditionsQuantity,
      step
    });
    console.log(result);
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
        {intensityMaxtrix.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((item, columnIndex) => (
              <input defaultValue={item} onChange={() => console.log(item)} />
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
