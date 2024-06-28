import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { createData } from '../server/Api';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from "aos";
import "aos/dist/aos.css";

const schema = yup.object().shape({
  name: yup.string().required('First name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  profile: yup.string().required('Profile is required'),
});

function Create() {

  useEffect(() => {
    AOS.init({
      disable: "phone",
      duration: 1000,
      easing: "ease-out-cubic",
    });
  }, []);


  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createData,
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
    console.log(data)
    toast.success('Created successfully');
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };


  
  return (
    <div>
      <ToastContainer />
      <div className="flex flex-col  justify-center items-center gap-5 shadow-lg my-5 p-20">
        <h1 className="text-2xl  uppercase font-bold">React Hook form - create</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-[50%] flex-col justify-center items-center p-5 rounded bg-blue-300 gap-5">
          <input
            placeholder="First name"
            
            {...register('name')}
            className="px-3 border outline-none border-red-500 w-[50%] text-xl p-2 rounded"
          />
         {errors.name && <p data-aos="fade-left" className="text-red-500">{errors.name.message}</p>}
          
          <input
            placeholder="Email"
            {...register('email')}
            className="px-3 border outline-none border-red-500 w-[50%] text-xl p-2 rounded"          />
          {errors.email && <p data-aos="fade-left" className="text-red-500">{errors.email.message}</p>}
          
          <input
            placeholder="Phone"
            {...register('phone')}
            className="px-3 border outline-none border-red-500 w-[50%] text-xl p-2 rounded"          />
          {errors.phone && <p  data-aos="fade-left" className="text-red-500">{errors.phone.message}</p>}
          
          <input
            placeholder="Profile"
            {...register('profile')}
            className="px-3 border outline-none border-red-500 w-[50%] text-xl p-2 rounded"          />
          {errors.profile && <p data-aos="fade-left" className="text-red-500">{errors.profile.message}</p>}
          
          <input
            type="submit"
            className="p-1 border bg-green-500 text-white border-red-500 w-[20%] text-2xl rounded"
          />
        </form>
      </div>
    </div>
  );
}

export default Create;
