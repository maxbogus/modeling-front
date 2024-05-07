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
      <Input onChange={(event) => {setXMin(event.target.value);}} value={xMin} label="xMin" />
      <Input onChange={(event) => {setXMax(event.target.value);}} value={xMax} label="xMax" />
      <Input onChange={(event) => {setA(event.target.value);}} value={a} label="a" />
      <Input onChange={(event) => {setB(event.target.value);}} value={b} label="b" />
      <Input onChange={(event) => {setK(event.target.value);}} value={k} label="k" />
      <Input onChange={(event) => {setLambda(event.target.value);}} value={lambda} label="lambda" />
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
