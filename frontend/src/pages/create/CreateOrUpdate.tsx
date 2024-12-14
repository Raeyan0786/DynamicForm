import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormEditor from '../../components/FormEditor';
import FormDetails from '../../components/FormDetails';

export type InputType={
    id:number,
    type:string,
    title:string,
    placeholder:string
}

function CreateOrUpdateForm() {
  const [formTitle, setFormTitle] = useState('');
  const [showTitle,setShowTitle]=useState(false)
  const [showInput,setShowInput]=useState(false)
  const [showEdit,setShowEdit]=useState(false)
  const [editId,setEditId]=useState<number>()
  const [inputs, setInputs] = useState<InputType[]>([]);
  const history = useNavigate();
  const parms=useParams();

  const updateInput = (id:number, field:string, value:string) => {
    setInputs(inputs.map(input => 
      input.id === id ? { ...input, [field]: value } : input
    ));
  };

  const fetchForms = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/forms/${parms.id}`);
      const data = await response.json();
      // setForms(data);
      setInputs(data.inputs)
      setFormTitle(data.title)
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  };

  const saveForm = async () => {
    try {
      if(parms.id){
        const response = await fetch(`http://localhost:5000/api/forms/${parms.id}`, {
          method: 'PUT', // HTTP method
          headers: {
            'Content-Type': 'application/json', // Define content type
          },
          body: JSON.stringify({ title: formTitle, inputs })
        });
        // const response = await fetch('http://localhost:5000/api/forms');
        const data = await response.json();
        // fetchForms()
        if (response.ok) {
          history('/');
        }
      }
      else{
        const response = await fetch('http://localhost:5000/api/forms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title: formTitle, inputs })
        });
        
        if (response.ok) {
          history('/');
        }
      }
    } catch (error) {
      console.error('Error saving form:', error);
    }
  };

  useEffect(()=>{
    if(parms.id){
      fetchForms()
    }
  },[])

  return (
    <div >
      <h2 className='text-center text-3xl font-medium mt-8'>{`${parms.id?"Edit Form":"Create Form"}`}</h2>
    <div className='w-full flex justify-center mt-2'>
       
    <div className='w-[70%] flex border-2 border-gray-400 rounded-lg'>
    <div className='w-[70%] flex flex-col items-center'>
        <FormDetails
          editId={editId}
          showInput={showInput}
          formTitle={formTitle}
          setShowInput={setShowInput}
          setEditId={setEditId}
          setShowTitle={setShowTitle}
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          inputs={inputs}
          setInputs={setInputs}
        />
      </div>
      <div className='w-[30%] border-l-2 border-gray-400'>
        <FormEditor
          editId={editId} 
          formTitle={formTitle} 
          setFormTitle={setFormTitle}
          showTitle={showTitle}
          showEdit={showEdit}
          inputs={inputs}
          setInputs={setInputs}
        />
        {/* <div className='flex flex-col items-center'>
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

        </div> */}
      </div>
    </div>
    </div>
    <div className='w-full flex justify-center'>
       <button className='rounded-lg text-white bg-green-700 font-medium p-4 mt-4 mb-4' onClick={saveForm}>
         {`${parms.id?"Edit Form":"Create Form"}`}
       </button>
    </div>
    </div>
  );
}

export default CreateOrUpdateForm