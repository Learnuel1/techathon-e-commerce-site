import { Box, VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button, Checkbox, Text, Textarea, Heading  } from "@chakra-ui/react";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup'
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";

const RegisterForm = () => {
   // setting the show and not password
   const [show, setShow] = useState(false);

   // validating form
  const userValidateSchema = yup.object().shape({
    firstname: yup.string('first name is required').required(),
    lastname: yup.string('first name is required').required(),
    email: yup.string().email().required(),
    phonenumber: yup.number('phone number is required').required(),
    password:yup.string().min(6).max(32),
    check: yup.bool('Accept terms and condition').isTrue().required()
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
        G2T Gadgets registration form
      </Heading>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
    <VStack  gap={3} border={'blue solid 1px'} borderRadius='2xl' p={5}>
      <FormControl w={'50%'}>
        <FormLabel>First Name:</FormLabel>
        <Input type={'text'} placeholder='First name'
          {...register('firstname')}
          variant={'filled'} />
          {errors.firstname?.message && <Text textColor={'red'} textAlign={'center'}>{errors.firstname?.message}</Text>} 
      </FormControl>

      <FormControl w={'50%'}>
        <FormLabel>Last Name:</FormLabel>
        <Input type={'text'} placeholder='First Last' 
          {...register('lastname')}
          variant={'filled'} />
          {errors.lastname?.message && <Text textColor={'red'} textAlign={'center'}>{errors.lastname?.message}</Text>}
      </FormControl>

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
        <FormLabel>Phone Number:</FormLabel>
        <Input type={'number'} placeholder='+234- number'
            {...register('phonenumber')} 
            variant={'filled'} />
            {errors.phonenumber?.message && <Text textColor={'red'} textAlign={'center'}>{errors.phonenumber?.message}</Text>}
      </FormControl>

    <FormControl w={'50%'}>
      <FormLabel>Address:</FormLabel>
      <Textarea placeholder="Enter your Address" {...register('address')} />
    </FormControl>

      <FormControl w={'50%'}>
      <Checkbox  {...register('check')} >
        I accept terms and condition
      </Checkbox>
      </FormControl>
      {errors.check?.message && <Text textColor={'red'} textAlign={'center'}>{errors.check?.message}</Text>}
      <Button type="submit" w={'50%'} colorScheme={'blue'}>Creat Account</Button>
    </VStack>
    </form>
    </Box>
  )
};

export default RegisterForm;
