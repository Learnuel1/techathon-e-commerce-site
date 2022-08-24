import { Box, VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button, Checkbox, Text,  Heading  } from "@chakra-ui/react";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup'
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";


const UserLogin = () => {
   // setting the show and not password
   const [show, setShow] = useState(false);

   // validating form
  const userValidateSchema = yup.object().shape({
    email: yup.string().email().required(),
    password:yup.string().min(6).max(32),
  });

  // connecting validation with react form
  const {
    register,
    formState: {errors},
    handleSubmit,
    reset
  } = useForm({
    resolver: yupResolver(userValidateSchema),
    reValidateMode:'onChange',
    criteriaMode: 'all',
    mode:'onSubmit',
  });

  // accessing form data
  const onSubmitHandler = (data) => {
    console.log({data})
    reset()
  };

  return (
    <Box p={5} >
      <Heading size={'lg'} textColor="blue" textAlign={'center'} p={3}>
        Login to G2T Gadgets 
      </Heading>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
    <VStack  gap={3} border={'blue solid 1px'} borderRadius='2xl' p={5}>
      <FormControl w={'50%'}>
        <FormLabel>Email:</FormLabel>
        <Input type={'email'} placeholder='email'
          {...register('email')}
            variant={'filled'} />
          {errors.email?.message && <Text textColor={'red'} textAlign={'center'}>{errors.email?.message}</Text>}
      </FormControl>

      <FormControl w={'50%'}>
      <FormLabel>password:</FormLabel>
        <InputGroup >
        <Input type={show? 'text' : 'password'} placeholder='choose a password'
            {...register('password')}
            variant={'filled'} />
        <InputRightElement>
          <Button p={1} size='sm' onClick={() => setShow(!show)}>
            {show ? <ViewOffIcon /> : <ViewIcon /> }
          </Button>
        </InputRightElement>
        </InputGroup>
        {errors.password?.message && <Text textColor={'red'} textAlign={'center'}>{errors.password?.message}</Text>}
      </FormControl>

      <FormControl w={'50%'}>
      <Checkbox  {...register('check')} >
        Remember me
      </Checkbox>
      </FormControl>
      {errors.check?.message && <Text textColor={'red'} textAlign={'center'}>{errors.check?.message}</Text>}
      <Button type="submit" w={'50%'} colorScheme={'blue'}>Login</Button>
    </VStack>
    </form>
    </Box>
  )
};

export default UserLogin;
