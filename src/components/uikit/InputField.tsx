import React, { InputHTMLAttributes } from 'react';
import { AiFillEyeInvisible, AiOutlineEye } from 'react-icons/ai';

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
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {label && <label>{label}</label>}
      <div style={{ position: 'relative', display: 'flex' }}>
        <input
          {...inputProps}
          type={open ? 'text' : inputProps.type}
          style={{ width: '100%' }}
        />
        {inputProps.type === 'password' && (
          <div
            onClick={() => setOpen(!open)}
            style={{ position: 'absolute', right: 0, cursor: 'pointer' }}
          >
            {open ? (
              <AiFillEyeInvisible size="24px" />
            ) : (
              <AiOutlineEye size="24px" />
            )}
          </div>
        )}
      </div>
      {errorMessage && (
        <div style={{ color: 'red', fontSize: 12 }}>{errorMessage}</div>
      )}
    </div>
  );
};

export default InputField;
