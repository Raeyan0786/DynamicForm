import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
// import { Toaster } from "react-hot-toast";
import Home from './pages/home/Home';
import CreateForm from './pages/create/CreateOrUpdate';
// import CreateFormNew from './pages/createnew/CreateOrUpdate';
import ViewForm from './pages/view/ViewForm';
import { Toaster } from 'react-hot-toast';
// import Todo from './pages/todo/Todo';
// import Blog from './pages/blog/Blog';
// import Copy from './pages/copy/Copy';


function App() {

  // const handleOnUnload = () => {
  //   localStorage.removeItem("activeMenu");
  // };
  // window.addEventListener("unload", handleOnUnload);

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
      <Route  path="/" element={<Home/>} />
      <Route path="/form/create" element={<CreateForm/>} />
      {/* <Route path="/form/create" element={<CreateFormNew/>} /> */}
        {/* <Route path="/form/create" component={CreateForm} /> */}
        <Route path="/form/:id/edit" element={<CreateForm/>} />
        <Route path="/form/:id" element={<ViewForm/>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
