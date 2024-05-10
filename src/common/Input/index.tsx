import { ChangeEventHandler } from 'react';

interface InputProperties {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  label: string;
}

const Input = ({ onChange, value, label }: InputProperties) => (
  <div>
    <label htmlFor={label}>{label}</label>
    <br />
    <input name={label} onChange={onChange} defaultValue={value} />
  </div>
);

export { Input };
