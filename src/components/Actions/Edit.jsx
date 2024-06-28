import { useMutation, useQuery } from '@tanstack/react-query';
import { singleData, updateData } from '../server/Api';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  profile: yup.string().required('Profile is required'),
});



function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['data', id],
    queryFn: () => singleData(id),
  });

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (data) {
      setValue('name', data.name);
      setValue('email', data.email);
      setValue('phone', data.phone);
      setValue('profile', data.profile);
    }
  }, [data, setValue]);

  const mutation = useMutation({
    mutationFn: ({ id, updatedUser }) => updateData({ id, data: updatedUser }),
    onSuccess: () => {
      toast.success('Updated successfully');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    },
    onError: (error) => {
      toast.error(`Error updating user: ${error.message}`);
    }
  });

  const onSubmit = (data) => {
    mutation.mutate({ id, updatedUser: data });
    console.log(data)
  };

  return (
    <>
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
    </>
  );
}

export default Edit;
