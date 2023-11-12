import { useFormik } from "formik";
import { InputDefault } from "../../Default/InputDefault";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  RegisterSlice,
  setPassword,
  setStep,
} from "../../../features/register/registerSlice";
import * as Yup from "yup";
import { Button, SlideFade, Text, useDisclosure } from "@chakra-ui/react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import "./stepRegister.scss";
import { useEffect, useState } from "react";

interface StepTwoRegister {
  password: string;
}

export const StepTwo = () => {
  const registerData: RegisterSlice = useAppSelector((state) => state.register);
  const dispatch = useAppDispatch();
  const { isOpen, onToggle } = useDisclosure();

  const initialState: StepTwoRegister = {
    password: registerData.password ? registerData.password : "",
  };

  const [confirmPassword, setConfirmPassword] = useState<string>(registerData.password ? registerData.password : "");

  const formik = useFormik<StepTwoRegister>({
    initialValues: initialState,
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .required("O campo senha é necessário")
        .test(
          "equal",
          "As senhas não são iguais",
          (val) => val == confirmPassword,
        )
        .min(6, "A senha deve ter no mínimo 6 caracteres")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])/,
          "Deve contêr um letra minúscula, uma maiúscula, um número e um caracter especial",
        ),
    }),
    validateOnChange: false,
    onSubmit: ({ password }) => {
      dispatch(setPassword({ password }));
      dispatch(setStep({ step: 2 }));
    },
  });

  useEffect(() => {
    onToggle();
  }, []);

  return (
    <SlideFade in={isOpen} offsetY="20px">
      <form className="register-form">
        <Text className="register-form__label">Senha</Text>
        <InputDefault
          name="password"
          error={formik.errors.password}
          type="password"
          formik={formik}
          required={true}
          value={formik.values.password}
          classField="register-form__input"
          placeholderField="Digite sua senha"
        />

        <Text className="register-form__label">Confirmar senha</Text>
        <InputDefault
          name="confirmPassword"
          error={formik.errors.password}
          type="password"
          formik={formik}
          required={true}
          value={confirmPassword}
          classField="register-form__input"
          placeholderField="Confirme a sua senha"
          change={(val: Event) =>
            setConfirmPassword((val.target as HTMLInputElement).value)
          }
        />

        <Button
          colorScheme="green"
          size="md"
          variant={"solid"}
          onClick={() => formik.handleSubmit()}
          className="register-form__continue"
        >
          Continuar
        </Button>
      </form>
    </SlideFade>
  );
};
