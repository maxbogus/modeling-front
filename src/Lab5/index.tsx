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
  const [requests, setRequests] = useState<string>('300');
  const [clientInterval, setClientInterval] = useState<string>('10');
  const [clientIntervalRange, setClientIntervalRange] = useState<string>('2');
  const [firstOperatorInterval, setFirstOperatorInterval] = useState<string>('20');
  const [firstOperatorIntervalRange, setFirstOperatorIntervalRange] = useState<string>('5');
  const [secondOperatorInterval, setSecondOperatorInterval] = useState<string>('40');
  const [secondOperatorIntervalRange, setSecondOperatorIntervalRange] = useState<string>('10');
  const [thirdOperatorInterval, setThirdOperatorInterval] = useState<string>('40');
  const [thirdOperatorIntervalRange, setThirdOperatorIntervalRange] = useState<string>('20');
  const [computerIntervals, setComputerIntervals] = useState<string[]>(['15', '30']);
  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await postData('http://localhost:5000/lab5/calculate', {
      requests,
      clientInterval,
      clientIntervalRange,
      firstOperatorInterval,
      firstOperatorIntervalRange,
      secondOperatorInterval,
      secondOperatorIntervalRange,
      thirdOperatorInterval,
      thirdOperatorIntervalRange,
      computerIntervals
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
        <Input
          value={firstOperatorInterval}
          onChange={(event) => setFirstOperatorInterval(event.target.value)}
          label="Operator 1"
        />
        <Input
          value={firstOperatorIntervalRange}
          onChange={(event) => setFirstOperatorIntervalRange(event.target.value)}
          label="+/- minutes range"
        />
        <Input
          value={secondOperatorInterval}
          onChange={(event) => setSecondOperatorInterval(event.target.value)}
          label="Operator 2"
        />
        <Input
          value={secondOperatorIntervalRange}
          onChange={(event) => setSecondOperatorIntervalRange(event.target.value)}
          label="+/- minutes range"
        />
        <Input
          value={thirdOperatorInterval}
          onChange={(event) => setThirdOperatorInterval(event.target.value)}
          label="Operator 3"
        />
        <Input
          value={thirdOperatorIntervalRange}
          onChange={(event) => setThirdOperatorIntervalRange(event.target.value)}
          label="+/- minutes range"
        />
        {computerIntervals.map((item, index) => (
          <div key={index} style={{ display: 'flex', margin: 8, justifyContent: 'center', alignItems: 'center' }}>
            <Input
              value={item}
              onChange={(event) => {
                const newIntervals = [...computerIntervals];
                newIntervals[index] = event.target.value;
                setComputerIntervals(newIntervals);
              }}
              label={`Computer ${index + 1}`}
            />
            <button
              style={{ marginLeft: 8, padding: 0, width: 32, height: 32}}
              onClick={() => {
                setComputerIntervals(computerIntervals.filter((_, ndx) => ndx !== index));
              }}>
              x
            </button>
          </div>
        ))}
        <button
          onClick={() => {
            setComputerIntervals([...computerIntervals, getRandomIntInclusive(0, 100)]);
          }}>
          Add computer
        </button>
        <p>{`${requests} ${clientInterval} ${clientIntervalRange}`}</p>
        <p>{`${firstOperatorInterval} ${firstOperatorIntervalRange} ${secondOperatorInterval} ${secondOperatorIntervalRange} ${thirdOperatorIntervalRange}`}</p>
        <p>{computerIntervals.map((item) => `${item} `)}</p>
        <button>Get result</button>
      </form>
      {result !== undefined && <Result {...result} />}
    </div>
  );
};
