import React, { Dispatch } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { InputType } from '../../pages/create/CreateOrUpdate';
import toast from 'react-hot-toast';

type FormDetailsProps={
    editId:number | undefined;
    formTitle:string;
    showInput:boolean;
    setShowInput:Dispatch<React.SetStateAction<boolean>>;
    setEditId:Dispatch<React.SetStateAction<number | undefined>>
    setShowTitle:Dispatch<React.SetStateAction<boolean>>;
    showEdit:boolean;
    setShowEdit:Dispatch<React.SetStateAction<boolean>>;
    inputs:InputType[];
    setInputs:Dispatch<React.SetStateAction<InputType[]>>;
}

const FormDetails = (props: FormDetailsProps) => {
    const {
        showInput,
        formTitle,
        setShowInput,
        setEditId,
        setShowTitle,
        showEdit,
        setShowEdit,
        inputs,
        setInputs
    } =props;

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
  return (
    <div className='w-[100%] flex flex-col items-center'>
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
        <div className="flex gap-4 mb-8 mt-2">
        {inputTypes.map(type => (
          <button key={type} className='py-2 px-4 rounded-lg bg-blue-600 text-white' onClick={() => addInput(type)}>
          {type}
          </button>
        ))}
      </div>
      )}
      
      {/* <button className='rounded-lg text-white bg-green-700 font-medium p-4 mt-4 mb-4' onClick={saveForm}>Submit</button> */}

      </div>
  )
}

export default FormDetails