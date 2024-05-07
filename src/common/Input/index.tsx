import { KeyboardEventHandler } from "react";

interface InputProperties {
    onKeyDown: KeyboardEventHandler<HTMLInputElement>;
    value: string;
    label: string;
}

const Input = ({onKeyDown, value, label}: InputProperties) => <div>
    <label htmlFor={label}>Enter integral {label} value:</label>
    <br />
    <input name={label} onKeyDown={onKeyDown} defaultValue={value} />
  </div>;

export {Input};
