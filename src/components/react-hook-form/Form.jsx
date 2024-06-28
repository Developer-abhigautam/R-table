import React from 'react'
import { useForm } from "react-hook-form"


function Form() {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => console.log(data)
  return (
 
    <div className='flex flex-col justify-center items-center gap-5'>
      <h1 className='text-2xl uppercase text-bold'>react hook  form</h1>
    <form onSubmit={handleSubmit(onSubmit)} className='flex w-full flex-col justify-center items-center gap-5' >
      <input placeholder='firstname' {...register("firstName")} className= 'px-3 border border-red-500 w-[50%] text-2xl rounded' />
      <input placeholder='Lastname' {...register("LastName")} className='  px-3 border border-red-500  w-[50%] text-2xl rounded' />
      <input placeholder='phone' {...register("Phone")} className=' px-3 border border-red-500  w-[50%] text-2xl rounded' />
      <select  {...register("gender")} className='border border-red-500  w-[50%] text-2xl rounded'>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>
      <input type="submit" />
    </form>
    </div>
  )
}

export default Form
