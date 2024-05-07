import { FormEvent, useState } from "react";
import { Input } from "../common/Input";
import { postData } from "../utils";

interface Prop {
    result: Record<string, string>;
  }
  
const Result = ({result}: Prop) => <div>{Object.keys(result).map((item)=> <div key={item}><p>{item}:</p><img alt={item} src={result[item]} /></div>)}</div>;

interface FormProps {
    onSubmit: (data: undefined | Record<string, string>) => void;
}

const Form = ({onSubmit}: FormProps) => {
    const [xMin, setXMin] = useState<string>("-10");
    const [xMax, setXMax] = useState<string>("10");
    const [a, setA] = useState<string>("-5");
    const [b, setB] = useState<string>("5");
    const [k, setK] = useState<string>("2");
    const [lambda, setLambda] = useState<string>("3");

    const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await postData("http://localhost:5000/lab1/calculate", { a, b, k, lambda, xMax, xMin });
        console.log(result);
        onSubmit(result);
      };

      return <form onSubmit={submitHandler}>
      <Input onKeyDown={(event) => {setXMin(event.key);}} value={xMin} label="xMin" />
      <Input onKeyDown={(event) => {setXMax(event.key);}} value={xMax} label="xMax" />
      <Input onKeyDown={(event) => {setA(event.key);}} value={a} label="a" />
      <Input onKeyDown={(event) => {setB(event.key);}} value={b} label="b" />
      <Input onKeyDown={(event) => {setK(event.key);}} value={k} label="k" />
      <Input onKeyDown={(event) => {setLambda(event.key);}} value={lambda} label="lambda" />
      <p>{`${xMin} ${xMax} ${a} ${b} ${k} ${lambda}`}</p>
      <button type="submit">Calculate</button>
    </form>;
}
  
export const Lab1 = () => {
    const [result, setResult] = useState<Record<string, string> | undefined>();
    return <div>
        <Form onSubmit={(data: Record<string, string> | undefined) => setResult(data)} />
        {
            result !== undefined && (<Result result={result} />)
        }
    </div>;
}
