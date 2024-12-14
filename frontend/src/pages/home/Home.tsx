import {
  Dialog,
  DialogContent,
  DialogHeader,
} from '../../components/ui/dailog'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';

interface Input {
  id:number;
  type: string;
  title: string;
  placeholder: string;
}

 interface Form  {
  _id:number;
  title: string;
  inputs: Input[];
  createdAt: Date;
}



const Home = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [formId,setFormId]=useState<number>(0);
  const [isDelete, setIsDelete] = useState(false)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/forms');
      const data = await response.json();
      setForms(data);
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  };

  const deleteForm=async(id:number)=>{

    try {

      const response = await fetch(`http://localhost:5000/api/forms/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      setIsDelete(false)
      fetchForms()
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  }
  const handleModel=(id:number)=>{
    setFormId(id);
    setIsDelete(true)

  }
  return (
    <div>
      <h1 className='text-center font-bold text-4xl mt-8 mb-4'>Welcome to Form.Com</h1>
      <p className='text-center mb-4'>This is simple form builder</p>
      <div className='flex justify-center'>
        <Link to="/form/create">
          <button className='bg-green-700 p-4 rounded-lg text-white'>Create New Form</button>
        </Link>
      </div>
      
      <div className="w-[80%] grid grid-cols-4 gap-4 mt-8 mb-8 mx-auto">
        {forms.map(form => (
          <div className="bg-white  h-[150px] shadow-lg rounded-lg p-6 ">
            <h2 className="text-xl text-center font-semibold text-gray-800 mb-2">
              {form.title}
            </h2>
            <div className='flex gap-4 justify-center mt-8'>
               <Link to={`/form/${form._id}`} className='text-green-600'>View</Link>
               <Link to={`/form/${form._id}/edit`} className='text-blue-600'>Edit</Link>
               <p className='text-red-600 cursor-pointer' onClick={()=>handleModel(form._id)}>Delete</p>
            </div>
            
          {/* </div> */}
          </div>
       
        ))}
      </div>
      <Dialog open={isDelete} onOpenChange={setIsDelete}>
            <DialogContent className="mb-[10] w-[22rem] lg:w-[32rem] px-[1rem] lg:px-[2rem]">
              <DialogHeader className="mb-[1.5rem] mt-[1.88rem] text-lg font-semibold">
                <p className="mb-2">Do You Want to Delete?</p>

                <div className="flex justify-center space-x-4">
                  <button
                    
                    className=" bg-brand text-white hover:bg-light_yellow mt-6 h-12 w-22 lg:w-44 rounded-lg outline-none"
                    type="button"
                    onClick={() => setIsDelete(false)}
                  >No</button>
                  <button
                    
                    className="bg-green-600 mt-6 h-12 w-22 lg:w-44 rounded-lg text-white hover:bg-light_yellow"
                    type="button"
                    onClick={() => deleteForm(formId)}
                  >Yes</button>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
    </div>
  )
}

export default Home