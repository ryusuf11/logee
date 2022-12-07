import React, { InputHTMLAttributes } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  errorMessage?: string;
};

const InputField = ({
  label,
  errorMessage,
  ...inputProps
}: InputFieldProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div
      className="textField"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      {label && <label className="textField__label">{label}</label>}
      <div style={{ position: 'relative', display: 'flex' }}>
        <input
          className={`textField__input ${
            errorMessage ? 'textField__input--error' : ''
          }`}
          {...inputProps}
          type={open ? 'text' : inputProps.type}
          role={inputProps.type}
          style={{ width: '100%' }}
        />
        {inputProps.type === 'password' && (
          <div
            onClick={() => setOpen(!open)}
            style={{
              position: 'absolute',
              right: '8px',
              top: '6px',
              cursor: 'pointer',
            }}
          >
            {open ? (
              <AiFillEyeInvisible size="24px" />
            ) : (
              <AiFillEye size="24px" />
            )}
          </div>
        )}
      </div>
      {errorMessage && (
        <div className="textField__errorMessage">{errorMessage}</div>
      )}
    </div>
  );
};

export default InputField;
