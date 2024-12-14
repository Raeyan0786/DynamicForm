import { Pencil, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Input } from '../../components';
import toast from 'react-hot-toast';

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
  console.log("parms")
  console.log(parms.id)

  const inputTypes = ['text', 'email', 'password', 'number', 'date'];

  const addInput = (type:string) => {
    // if (inputs.length >= 20) return;
    if (inputs.length >= 20) {
      toast.error("Maximum 20 inputs allowed")
      alert('Maximum 20 inputs allowed');
      return;
    }
    
    const newInput = {
      id: Date.now(),
      type,
      title: '',
      placeholder: ''
    };
    
    setInputs((prevInputs:InputType[])=>[...prevInputs,newInput]);
  };

  const updateInput = (id:number, field:string, value:string) => {
    setInputs(inputs.map(input => 
      input.id === id ? { ...input, [field]: value } : input
    ));
  };

  const deleteInput = (id:number) => {
    setInputs(inputs.filter(input => input.id !== id));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = [...inputs];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setInputs(items);
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
        console.log(data);
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
      <h2 className='text-center text-3xl font-medium mt-8'>{`${parms.id?"Edit Form":"Create Form New"}`}</h2>
    <div className='w-full flex justify-center mt-2'>
       
    <div className='w-[70%] flex border-2 border-gray-400 rounded-lg'>
    <div className='w-[70%] flex flex-col items-center'>
    <div className='flex justify-center items-center gap-4'>
    <h3 className=' font-medium text-3xl p-4'>{`${formTitle?formTitle:"Untitled Form"}`}</h3>
    <div className='flex items-center justify-center h-8 w-8 hover:bg-blue-200' onClick={()=>{
      setShowTitle(true);
      if(showEdit===true){
        setShowEdit(false)
      }
      }}>
    <Pencil className='text-blue-500 ' />
    </div>
    
    </div>

    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="inputs">
        {(provided) => (
          <div 
            className="grid grid-cols-2 w-full gap-4 place-items-center"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {inputs.map((input, index) => (
              <Draggable key={input.id} draggableId={input.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="border border-gray-400 rounded-lg flex justify-between p-4 w-[90%]"
                  >
                    {input.title ? (
                      <p>{input.title}</p>
                    ) : (
                      <p className='text-gray-500'>title</p>
                    )}
                    <div className='flex gap-2'>
                      <Pencil 
                        className='text-blue-500' 
                        onClick={()=> {
                          setShowTitle(false); 
                          setShowEdit(true); 
                          setEditId(input.id)
                        }}
                      />
                      <Trash2 
                        className='text-red-600' 
                        onClick={() => deleteInput(input.id)}
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>

    <button className='border border-blue-400 text-blue-400 font-bold p-4 mt-8 mb-4 rounded-lg' onClick={()=> setShowInput(!showInput)}>
      {`${showInput?"CLOSE ADD INPUT":"ADD INPUT"}`}
    </button>

      {showInput && (
        <div className="flex gap-4">
        {inputTypes.map(type => (
          <button key={type} className='py-2 px-4 rounded-lg bg-blue-600 text-white' onClick={() => addInput(type)}>
          {type}
          </button>
        ))}
      </div>
      )}
      
      <button className='rounded-lg text-white bg-green-700 font-medium p-4 mt-4 mb-4' onClick={saveForm}>Submit</button>

      </div>
      <div className='w-[30%] border-l-2 border-gray-400'>
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