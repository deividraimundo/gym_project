import React from "react";

import "./styles.css";

interface InputProps {
  text: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type: React.HTMLInputTypeAttribute;
}

const Input: React.FC<InputProps> = ({
  onChange,
  text,
  type = "text",
  placeholder,
}) => {
  return (
    <label htmlFor="text" className="container-label-input">
      <p>{text}</p>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className="input input-color input-focus input-hover input-disabled"
      />
    </label>
  );
};

export default Input;
