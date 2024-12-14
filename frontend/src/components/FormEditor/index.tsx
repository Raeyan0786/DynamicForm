import React, { Dispatch } from 'react'
import { Input } from '../Input'
import { InputType } from '../../pages/create/CreateOrUpdate';

type FormEditorProps={
    editId:number | undefined;
    formTitle:string;
    setFormTitle:Dispatch<React.SetStateAction<string>>
    showTitle:boolean;
    // setShowTitle:Dispatch<React.SetStateAction<boolean>>;
    showEdit:boolean;
    // setShowEdit:Dispatch<React.SetStateAction<boolean>>;
    inputs:InputType[];
    setInputs:Dispatch<React.SetStateAction<InputType[]>>;
}

const FormEditor = (props: FormEditorProps) => {
    const {
        editId,
        formTitle,
        setFormTitle,
        showTitle,
        showEdit,
        inputs,
        setInputs
    } =props

    const updateInput = (id:number, field:string, value:string) => {
        setInputs(inputs.map(input => 
          input.id === id ? { ...input, [field]: value } : input
        ));
      };
  return (
    <div className='flex flex-col items-center'>
          <h3 className=' font-medium text-2xl p-4'>Form Editor</h3>

          {!showTitle && !showEdit && <p>Select to see editor</p>}

          {showTitle && (
            <div>
            <Input
            type="text"
            label="Form Title"
            className=''
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
          />
          </div>
          )}
          {showEdit && (
            <>
            {inputs.filter((item:any)=>item.id===editId).map((item)=>(
              <>
                <p className='font-medium text-lg mb-4'>{item.type.toUpperCase()}</p>
              <div  className="">
            <Input
              type="text"
              label='Input Title'
              value={item.title}
              onChange={(e) => updateInput(item.id, 'title', e.target.value)}
              className='mb-4'
            />
            <Input
              type="text"
              label='Placeholder'
              value={item.placeholder}
              onChange={(e) => updateInput(item.id, 'placeholder', e.target.value)}
            />
          </div>
              </>
            ))}
            </>
          )}

        </div>
  )
}

export default FormEditor