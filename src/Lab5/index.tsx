import { FormEvent, useState } from 'react';
import { postData } from '../utils';
import { Input } from '../common/Input';

interface Result {
  processed: number;
  refusals: number;
  percentage: number;
}

const Result = ({ processed, refusals, percentage }: Result) => (
  <div>
    <p>Result:</p>
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
  const [firstComputerInterval, setFirstComputerInterval] = useState<string>('15');
  const [secondComputerInterval, setSecondComputerInterval] = useState<string>('30');
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
      firstComputerInterval,
      secondComputerInterval
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
        <Input
          value={firstComputerInterval}
          onChange={(event) => setFirstComputerInterval(event.target.value)}
          label="Computer 1"
        />
        <Input
          value={secondComputerInterval}
          onChange={(event) => setSecondComputerInterval(event.target.value)}
          label="Computer 2"
        />
        <p>{`${requests} ${clientInterval} ${clientIntervalRange}`}</p>
        <p>{`${firstOperatorInterval} ${firstOperatorIntervalRange} ${secondOperatorInterval} ${secondOperatorIntervalRange} ${thirdOperatorIntervalRange}`}</p>
        <p>{`${firstComputerInterval} ${secondComputerInterval}`}</p>
        <button>Get result</button>
      </form>
      {result !== undefined && <Result {...result} />}
    </div>
  );
};
