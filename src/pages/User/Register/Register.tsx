import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Progress,
  Step,
  StepIcon,
  StepIndicator,
  StepStatus,
  Stepper,
  Text,
  Tooltip,
  useSteps,
} from '@chakra-ui/react';
import background from '../../../images/BackgrounRegister.jpg';
import './register.scss';
import { StepOne } from '../../../components/Steps/Register/StepOne';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setStep } from '../../../features/register/registerSlice';
import { useEffect, useState } from 'react';
import { StepTwo } from '../../../components/Steps/Register/StepTwo';
import { StepThree } from '../../../components/Steps/Register/StepThree';
import { useNavigate } from 'react-router-dom';
import logo from '../../../images/logo.jpg';

export const Register = () => {
  const registerData = useAppSelector((state) => state.register);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const steps = [
    { title: 'Primeiro', description: 'Nome & Email', component: <StepOne /> },
    { title: 'Segundo', description: 'Senha', component: <StepTwo /> },
    {
      title: 'Terceiro',
      description: 'Data de Nascimento',
      component: <StepThree />,
    },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: registerData.step,
    count: steps.length,
  });

  const max = steps.length - 1;
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [beforeStep, setBeforeStep] = useState<number>(activeStep - 1);

  useEffect(() => {
    setBeforeStep(activeStep);
    setActiveStep(registerData.step);
  }, [registerData.step]);

  useEffect(() => {
    document.title = 'Cadastro';
  }, []);

  useEffect(() => {
    let state = progressPercent;

    if (beforeStep > activeStep) {
      const removeProgress = setInterval(() => {
        setProgressPercent((count) => count - 1);
        state -= 1;
        if (state <= (activeStep / max) * 100) {
          clearInterval(removeProgress);
        }
      }, 10);
    } else {
      const addProgress = setInterval(() => {
        setProgressPercent((count) => count + 1);
        state += 1;
        if (state >= (activeStep / max) * 100) {
          clearInterval(addProgress);
        }
      }, 10);
    }
  }, [activeStep]);

  return (
    <Flex minH={'100vh'} justifyContent={'center'} alignItems={'center'} bg={'#ffb013'}>
      <Flex className="register">
        <Flex className="register-image">
          <Image src={background} />

          <Flex className="register-image__logo">
            <Image src={logo} />
            <Text>ChikPet</Text>
          </Flex>
        </Flex>
        <Box className="register-content">
          <Flex className="register-exist">
            <Text>Já tem o uma conta?</Text>
            <Button colorScheme="yellow" size="md" variant={'solid'} onClick={() => navigate('/login')}>
              Login
            </Button>
          </Flex>
          <Heading className="register-content__title">Registre sua conta</Heading>
          <Box position="relative" className="register-divider">
            <Divider />
            <AbsoluteCenter bg="#6c083d" px="4">
              Preencha os campos
            </AbsoluteCenter>
          </Box>
          <Box position="relative" marginTop={'30px'}>
            <Stepper size="sm" colorScheme="yellow" index={activeStep} gap="0" zIndex={2} position={'relative'}>
              {steps.map((step, index) => (
                <Tooltip
                  key={index}
                  hasArrow
                  label={step.description}
                  bg="gray.300"
                  color="black"
                  placement="auto-start"
                >
                  <Step aria-label={step.description} onClick={() => dispatch(setStep({ step: index }))}>
                    <StepIndicator bg="#6c083d">
                      <StepStatus complete={<StepIcon />} />
                    </StepIndicator>
                  </Step>
                </Tooltip>
              ))}
            </Stepper>
            <Progress
              value={progressPercent}
              position="absolute"
              height="3px"
              width="full"
              colorScheme="yellow"
              bgColor={'#ffffff50'}
              top="10px"
              zIndex={1}
            />
          </Box>
          {steps[activeStep].component}
        </Box>
      </Flex>
    </Flex>
  );
};
