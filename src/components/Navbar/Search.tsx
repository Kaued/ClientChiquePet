import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useFormik } from "formik";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

interface SearchValue {
  search: string;
}

export const Search = () => {
  const initialValue: SearchValue = {
    search: "",
  };

  const navigate = useNavigate();

  const formik = useFormik<SearchValue>({
    initialValues: initialValue,
    validationSchema: Yup.object().shape({
      search: Yup.string().required(),
    }),
    onSubmit: async ({ search }) => {
      navigate('/produtos/pesquisar/'+search)
    },
  });

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <FaSearch />
      </InputLeftElement>
      <Input
        value={formik.values.search}
        onChange={formik.handleChange}
        type="text"
        name="search"
        id="search"
        onKeyUpCapture={(e)=>{
          if(e.key === "Enter")
            formik.handleSubmit();
        }}
      />
    </InputGroup>
  );
};
