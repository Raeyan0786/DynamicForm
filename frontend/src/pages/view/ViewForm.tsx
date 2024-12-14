import React, { useState,useEffect } from 'react'
import { useParams,useNavigate} from 'react-router-dom';
import { toast } from "react-hot-toast";
import { Input } from '../../components';
import { InputType } from '../create/CreateOrUpdate';

const ViewForm = () => {
  const [formTitle, setFormTitle] = useState('');
  const [inputs, setInputs] = useState<InputType[]>([]);
  const [formValues, setFormValues] = useState<{[key: number]: string}>({});
  const [errors, setErrors] = useState<{[key: number]: string}>({});
  const parms=useParams();
  const navigate = useNavigate();

  const fetchForms = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/forms/${parms.id}`);
      const data = await response.json();
      setInputs(data.inputs)
      setFormTitle(data.title)
      // Initialize form values
      const initialValues = data.inputs.reduce((acc: {[key: number]: string}, input: InputType) => {
        acc[input.id] = '';
        return acc;
      }, {});
      setFormValues(initialValues);
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  };

  const validateInput = (type: string, value: string): string => {
    if (!value) return 'This field is required';

    switch (type) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        break;
      case 'number':
        const numberRegex = /^[0-9]+$/;
        if (!numberRegex.test(value)) return 'Please enter a valid number (digits only)';
        break;
      case 'password':
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!passwordRegex.test(value)) return 'Password must be at least 6 characters long and contain both letters and numbers';
        break;
      case 'date':
        const dateValue = new Date(value);
        if (dateValue.toString() === 'Invalid Date') return 'Please enter a valid date';
        const today = new Date();
        if (dateValue > today) return 'Date cannot be in the future';
        break;
      case 'text':
        if (value.length < 2) return 'Text must be at least 2 characters long';
        if (value.length > 100) return 'Text cannot exceed 100 characters';
        break;
    }
    return '';
  };

  const handleInputChange = (id: number, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Validate input as user types
    const input = inputs.find(input => input.id === id);
    if (input) {
      const error = validateInput(input.type, value);
      setErrors(prev => ({
        ...prev,
        [id]: error
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all inputs
    const newErrors: {[key: number]: string} = {};
    let hasErrors = false;
    
    inputs.forEach(input => {
      const error = validateInput(input.type, formValues[input.id]);
      if (error) {
        newErrors[input.id] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);

    if (!hasErrors) {
      toast.success("Form submitted successfullly")
      
      const initialValues = inputs.reduce((acc: {[key: number]: string}, input: InputType) => {
        acc[input.id] = '';
        return acc;
      }, {});
      setFormValues(initialValues);
    }
  };

  useEffect(()=>{
    if(parms.id){
      fetchForms()
    }
  },[])
      
  return (
    <div>
      <div className='w-full flex justify-center mt-16'>
        <div className='w-[70%] flex flex-col border-2 border-gray-400 rounded-lg'>
          <h1 className='font-bold text-center my-8 text-bold text-4xl'>{formTitle}</h1>
          <form className='w-full' onSubmit={handleSubmit}>
            <div className='grid w-full grid-cols-2 gap-4 place-items-center'>
              {inputs.map(input => (
                <div key={input.id} className="relative p-4 w-[90%]">
                  <Input
                    type={input.type}
                    label={input.placeholder || input.title}
                    value={formValues[input.id]}
                    onChange={(e) => handleInputChange(input.id, e.target.value)}
                    className='mb-4'
                    // error={errors[input.id]}
                  />
                  {errors[input.id] && (
                    <p className="absolute bottom-0 text-red-500 text-sm mt-1">{errors[input.id]}</p>
                  )}
                </div>
              ))}
            </div>
            <div className='flex justify-center gap-8'>
            <button 
                type="button"
                className='rounded-lg text-white bg-green-700 font-medium p-4 mt-4 mb-4'
                onClick={()=>navigate(-1)}
              >
                Back
              </button>
              <button 
                type="submit"
                className='rounded-lg text-white bg-green-700 font-medium p-4 mt-4 mb-4'
                
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ViewForm