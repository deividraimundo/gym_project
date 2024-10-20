import React from "react";

import "./styles.css";

interface InputProps {
  text: string;
  placeholder?: string;
  value?: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type: React.HTMLInputTypeAttribute;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  onChange,
  text,
  type = "text",
  placeholder,
  disabled,
  value,
}) => {
  return (
    <label htmlFor="text" className="container-label-input">
      <p>{text}</p>
      <input
        value={value ?? undefined}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className="input input-color input-focus input-hover input-disabled"
        disabled={disabled}
      />
    </label>
  );
};

export default Input;
