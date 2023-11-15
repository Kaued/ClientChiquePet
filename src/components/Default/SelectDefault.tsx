/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputGroup, Select } from '@chakra-ui/react';
import './default.scss';

interface SelectProps {
  value: any;
  formik: any;
  required: boolean;
  name: string;
  classField?: string;
  placeholderField?: string;
  options: {
    value: string | number,
    text: string
  }[],
  error?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  change?: Function;
  blur?: Function;
}

export const SelectDefault = (props: SelectProps) => {
  const { value, formik, required, name, classField, placeholderField, error,  options, change, blur } = props;

  return (
    <InputGroup
      className={classField ? classField : "default-input"}
      display="flex"
      flexDirection="column"
    >
      <Select
        onChange={change ? (e) => change(e) : formik.handleChange}
        value={value}
        onClick={() => formik.setErrors({})}
        isRequired={required}
        name={name}
        placeholder={placeholderField}
        isInvalid={!!error}
        id={name}
        onBlur={() => (blur ? blur() : null)}>
        
        {options.map((option)=>{
          return <option value={option.value}>{option.text}</option>;  
        })}
        </Select>
      {!!error && <span className="input-error">{error}</span>}
    </InputGroup>
  );
};
