import { FormEvent, useState } from 'react';
import { getRandomIntInclusive, postData } from '../utils';
import { Input } from '../common/Input';

interface Result {
  processed: number;
  refusals: number;
  percentage: number;
}

const Result = ({ processed, refusals, percentage }: Result) => (
  <div>
    <h6>Result:</h6>
    <p>Completed: {processed}</p>
    <p>Denied: {refusals}</p>
    <p>Percent: {percentage}%</p>
  </div>
);

export const Lab5 = () => {
  const [result, setResult] = useState<Result>();
  const [requests, setRequests] = useState<string>(`${getRandomIntInclusive(100, 1000)}`);
  const [clientInterval, setClientInterval] = useState<string>(`${getRandomIntInclusive(10, 20)}`);
  const [clientIntervalRange, setClientIntervalRange] = useState<string>(
    `${getRandomIntInclusive(1, 5)}`
  );
  const [operators, setOperators] = useState<string[][]>([
    [`${getRandomIntInclusive(10, 40)}`, `${getRandomIntInclusive(5, 20)}`],
    [`${getRandomIntInclusive(10, 40)}`, `${getRandomIntInclusive(5, 20)}`],
    [`${getRandomIntInclusive(10, 40)}`, `${getRandomIntInclusive(5, 20)}`]
  ]);
  const [computerIntervals, setComputerIntervals] = useState<string[]>([
    `${getRandomIntInclusive(10, 20)}`,
    `${getRandomIntInclusive(20, 50)}`
  ]);
  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await postData('http://localhost:5000/lab5/calculate', {
      requests,
      clientInterval,
      clientIntervalRange,
      computerIntervals,
      operators
    });
    console.log(result);
    setResult(result);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <Input
          value={requests}
          onChange={(event) => setRequests(event.target.value)}
          label="Number of requests"
        />
        <Input
          value={clientInterval}
          onChange={(event) => setClientInterval(event.target.value)}
          label="Client arrival interval"
        />
        <Input
          value={clientIntervalRange}
          onChange={(event) => setClientIntervalRange(event.target.value)}
          label="+/- minutes range"
        />
        {operators.map((operator, index) => (
          <div key={index}>
            <Input
              value={operator[0]}
              onChange={(event) => {
                const newOpetarors = [...operators];
                newOpetarors[index][0] = event.target.value;
                setOperators(newOpetarors);
              }}
              label={`Operator ${index + 1}`}
            />
            <Input
              value={operator[1]}
              onChange={(event) => {
                const newOpetarors = [...operators];
                newOpetarors[index][1] = event.target.value;
                setOperators(newOpetarors);
              }}
              label="+/- minutes range"
            />
          </div>
        ))}
        {computerIntervals.map((item, index) => (
          <div
            key={index}
            style={{ display: 'flex', margin: 8, justifyContent: 'center', alignItems: 'center' }}>
            <Input
              value={item}
              onChange={(event) => {
                const newIntervals = [...computerIntervals];
                newIntervals[index] = event.target.value;
                setComputerIntervals(newIntervals);
              }}
              label={`Computer ${index + 1}`}
            />
          </div>
        ))}
        <p>{`${requests} ${clientInterval} ${clientIntervalRange}`}</p>
        <p>{operators.map((item) => `${item[0]} ${item[1]} | `)}</p>
        <p>{computerIntervals.map((item) => `${item} `)}</p>
        <button>Get result</button>
      </form>
      {result !== undefined && <Result {...result} />}
    </div>
  );
};
