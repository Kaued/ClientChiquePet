/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex } from '@chakra-ui/react';
import { InputDefault } from './InputDefault';
import { AiOutlineSearch } from 'react-icons/ai';

export const SeachTable = ({
  formik,
  placeholder,
}: {
  formik: any;
  placeholder: string;
}) => {
  return (
    <Flex className="mt-4" width={'100%'}>
      <InputDefault
        name="search"
        value={formik.values.search}
        formik={formik}
        error={formik.errors.search}
        required={true}
        type="text"
        placeholderField={placeholder}
        classField=""
      />
      <Button
        colorScheme="blue"
        className="ms-2 col-lg-1"
        onClick={() => formik.handleSubmit()}
      >
        <AiOutlineSearch />
      </Button>
    </Flex>
  );
};
