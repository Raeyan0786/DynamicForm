import cn from '../../../tailwindcss-config';
import React, { InputHTMLAttributes } from 'react';


import { cva, type VariantProps } from 'class-variance-authority';

const inputvariants = cva(
  ' peer block  w-full appearance-none  px-2.5 pb-0 pt-0 md:pt-5 indent-[0.625rem] font-normal text-black focus:outline-none focus:ring-0 md:placeholder:text-gray-400 border-b border-gray-400 text-sm md:text-base',
  {
    variants: {
      variant: {
        primary: 'bg-[#E9FAFF]',
        new:'bg-white'
       
      },
    },
    defaultVariants: {
      variant: 'new',
    },
  },
);

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement>,
VariantProps<typeof inputvariants>  {
  className?: string;
  label?: string;
  name?: string;
  error?: any;
  value?:any;
  position?:any;
  placeholder?: string;
  type?: string;
  inputClassName?: string;
  labelClassName?: string;
  disabled?: boolean; 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// const classes = {
//   root: 'bg-gray-50 border border-gray-300 text-[#696767] sm:text-sm rounded-lg focus:ring-[#FF2800] focus:border-primary-600 block w-full p-2.5 outline-0',
// };

export const Input = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      className,
      label,
      name,
      value,
      position,
      error,
      variant,
      placeholder,
      type ,
      inputClassName,
      labelClassName,
      disabled = false,
      onChange,
      onBlur, 
      ...props
    },ref,
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    // const rootClassName = cn(classes.root, inputClassName);

    return (
      <div className='relative w-full '>
        <input
          id={name}
          name={name}
          type={showPassword ? 'text' : type}
          value={value}
          ref={ref}
          placeholder={placeholder}
          className={cn(inputvariants({ variant, className }))}
          autoComplete='off'
          spellCheck='false'
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={()=>setIsFocused(false)}
          // onBlur={onBlur}
          aria-invalid={error ? 'true' : 'false'}
          disabled={disabled} 
          {...props}
          
        />
        {label && (
          <label
            htmlFor={name}
            // className={cn(
            //   'hidden md:block w-full absolute left-[1.25rem] top-[1.2rem] origin-[0] -translate-y-4 scale-75 transform text-[#696767] duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[0.875rem]  peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-[#696767]',
            //   labelClassName,
            // )}
            className={`absolute left-3 transition-all duration-300 ease-in-out 
              ${isFocused || value ? '-top-2 text-sm text-blue-500' : 'top-3 text-gray-400'}`}
          >
            {label}
          </label>
        )}
        {type === 'password' ? (
          <button
            type='button'
            className={`absolute ${position} ${showPassword ? `top-4` : `top-[19px]`}`}
            onClick={() => setShowPassword((pre) => !pre)}
          >
            {showPassword ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='1.7rem'
                height='1.5rem'
                fill='none'
              >
                <path
                  fill='#696767'
                  d='M25.835 12.495c-.233-.318-5.767-7.78-12.835-7.78-7.068 0-12.603 7.462-12.835 7.78a.858.858 0 0 0 0 1.011c.232.318 5.767 7.78 12.835 7.78 7.068 0 12.602-7.462 12.835-7.78a.857.857 0 0 0 0-1.011ZM13 19.572c-5.207 0-9.716-4.953-11.051-6.572 1.333-1.62 5.833-6.57 11.05-6.57 5.207 0 9.716 4.951 11.052 6.571-1.333 1.62-5.833 6.571-11.051 6.571Z'
                />
                <path
                  fill='#696767'
                  d='M12.998 7.857A5.149 5.149 0 0 0 7.855 13a5.149 5.149 0 0 0 5.143 5.143A5.149 5.149 0 0 0 18.141 13a5.149 5.149 0 0 0-5.143-5.143Zm0 8.572A3.432 3.432 0 0 1 9.57 13a3.432 3.432 0 0 1 3.428-3.428A3.432 3.432 0 0 1 16.427 13a3.432 3.432 0 0 1-3.429 3.429Z'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='1.7rem'
                height='1.5rem'
                fill='none'
              >
                <path
                  fill='#696767'
                  d='m16.644 10.225 1.515-1.515c.11.412.174.843.174 1.29 0 2.757-2.243 5-5 5-.446 0-.877-.065-1.29-.175l1.515-1.514a3.318 3.318 0 0 0 3.086-3.086Zm9.918-.63c-.103-.184-1.557-2.731-4.398-4.89L20.95 5.918A16.677 16.677 0 0 1 24.853 10c-.988 1.504-4.863 6.666-11.52 6.666-.998 0-1.926-.128-2.8-.332l-1.37 1.37c1.26.386 2.643.628 4.17.628 8.724 0 13.049-7.605 13.229-7.928a.833.833 0 0 0 0-.81Zm-3.473-8.172L4.756 19.756a.831.831 0 0 1-1.36-.27.833.833 0 0 1 .181-.909l2.333-2.332C2.14 13.969.223 10.617.105 10.405a.833.833 0 0 1 0-.81c.18-.323 4.505-7.928 13.228-7.928 2.256 0 4.21.514 5.88 1.275L21.91.244a.833.833 0 1 1 1.178 1.179ZM7.153 15.003l2.11-2.11A4.967 4.967 0 0 1 8.332 10c0-2.757 2.243-5 5-5 1.078 0 2.075.346 2.893.929l1.706-1.706a12.27 12.27 0 0 0-4.599-.89C6.676 3.333 2.801 8.495 1.813 10c.628.95 2.43 3.356 5.34 5.003Zm3.32-3.32 4.543-4.544a3.296 3.296 0 0 0-1.683-.472A3.337 3.337 0 0 0 10 10c0 .616.18 1.187.472 1.682Z'
                />
              </svg>
            )}
          </button>
        ) : null}
        
        {error && (
          <p className='text-13px text-brand-danger my-2 text-opacity-70'>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
