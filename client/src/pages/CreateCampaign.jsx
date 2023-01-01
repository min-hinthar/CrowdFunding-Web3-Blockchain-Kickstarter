import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {ethers } from 'ethers';
import { money } from '../assets';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../utils';
import { useStateContext } from '../context';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: ''
  });

  // Handle Form Change
  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // CHECK Image validity before Submit
    checkIfImage(form.image, async(exists) => {
      if(exists) {
        //Ethers unit rendering functionality
        await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18)})
        setIsLoading(false);
        navigate('/');
      } else {
        alert('Error: Please provide valid image URL!')
        setForm({ ...form, image: ''});
      }
    })
  }

  return (
    <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'>
      {isLoading && <Loader />}
      <div className='flex justify-center items-center p-[16px] sm:min-w-[300px] bg-[#3a3a43] rounded-[10px]'>
        <h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white'>
          Start a new Campaign
        </h1>
      </div>
      <form onSubmit={handleSubmit} className='w-full mt-[65px] flex flex-col gap-[30px]'>
        <div className='flex flex-wrap gap-[40px]'>
          {/* Campaign NAME */}
          <FormField 
            labelName="Your Name*"
            placeholder="Aung San Suu Kyi"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          {/* Campaign TITLE */}
          <FormField 
            labelName="Campaign Title*"
            placeholder="Burma's Freedom from Fear"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>
          {/* Campaign DESCRIPTION */}
          <FormField 
              labelName="Campaign Story*"
              placeholder="We need your support to aid the Burmese freedom fighters rise against fascist military dictators!"
              isTextArea
              value={form.description}
              handleChange={(e) => handleFormFieldChange('description', e)}
            />
          <div className='w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]'>
            <img src={money} alt="money" className='w-[40px] h-[40px] object-contain' />
            <h4 className='font-epilogue font-bold text-[25px] text-white ml-[20px]'>You will get 100% of successfully raised donations!</h4>
          </div>
        <div className='flex flex-wrap gap-[40px]'>
          {/* Campaign TARGET */}
          <FormField 
            labelName="Campaign Goal*"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          {/* Campaign DEADLINE */}
          <FormField 
            labelName="Campaign End Date*"
            placeholder="Burma's Freedom from Fear"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>
          {/* Campaign IMAGE */}
          <FormField 
            labelName="Campaign Image*"
            placeholder="Burma's Freedom from Fear"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange('image', e)}
          />
        <div className='flex justify-center items-center mt-[40px]'>
          {/* SUBMIT Button */}
          <CustomButton 
            btnType="submit"
            title="Submit Campaign"
            styles="bg-[#1dc071] rounded-[100px]"
          />
        </div>
      </form>
    </div>
  )
}

export default CreateCampaign