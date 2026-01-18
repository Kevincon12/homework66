
import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home.tsx";

const App = () => {


  return (
    <>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="*" element={<h1 className="text-center mt-5">Not found</h1>} />
        </Routes>
    </>
  )
};

export default App
