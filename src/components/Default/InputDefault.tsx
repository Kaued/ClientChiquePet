/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, InputGroup } from '@chakra-ui/react';
import './default.scss';

interface InputProps {
  type: string;
  value: any;
  formik: any;
  required: boolean;
  name: string;
  classField?: string;
  placeholderField?: string;
  error?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  change?: Function;
}

export const InputDefault = (props: InputProps) => {
  const {
    type,
    value,
    formik,
    required,
    name,
    classField,
    placeholderField,
    error,
    change,
  } = props;

  return (
    <InputGroup
      className={classField ? classField : 'default-input'}
      display="flex"
      flexDirection="column"
    >
      <Input
        type={type}
        onChange={change ? (e) => change(e) : formik.handleChange}
        value={value}
        onClick={() => formik.setErrors({})}
        isRequired={required}
        name={name}
        placeholder={placeholderField}
        isInvalid={!!error}
        id={name}
      />
      {!!error && <span className="input-error">{error}</span>}
    </InputGroup>
  );
};
