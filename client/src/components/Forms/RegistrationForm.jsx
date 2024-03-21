import {  Flex, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import '../styles/style.css'

export default function RegistrationFrom() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <VStack w='100%' >
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={2} border='2px solid black' padding='10px'>
        {/* <Flex gap={2}>
          <label>Name</label>
          <VStack>
            <input
              {...register("name", { required: 'Name is required' })}
              aria-invalid={errors.name ? "true" : "false"}
            />
            
            {errors.name?.type === "required" && (
              <p style={{color:'red', fontSize:'12px'}} role="alert">{errors.name.message}</p>
            )}
          </VStack>
        </Flex> */}
      
        <Flex gap={2}>
          <label>Email </label>
          <VStack >
            <input
              {...register("mail", { required: "Email Address is required" })}
              aria-invalid={errors.mail ? "true" : "false"}
            />
            {errors.mail && <p style={{color:'red',fontSize:'12px',}} role="alert">{errors.mail.message}</p>}
          </VStack>
        </Flex>

        <Flex gap={2}>
          <label>Password </label>
          <VStack >
            <input
              {...register("password", { required: "Password is required" })}
              aria-invalid={errors.password ? "true" : "false"}
            />
          
            {errors.password && <p style={{color:'red', fontSize:'12px', }} role="alert">{errors.password.message}</p>}
          </VStack>
        </Flex>

      

        <input type="submit" />
      </VStack>
    </form>
    </VStack>
  );
}
