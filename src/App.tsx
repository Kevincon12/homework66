
import './App.css'
import {Route, Routes, useNavigate} from "react-router-dom";
import Home from "./containers/Home/Home.tsx";
import MealForm from "./containers/MealForm/MealForm.tsx";

const App = () => {
    const navigate = useNavigate();


  return (
    <>
        <header className="p-3 bg-light mb-3">
            <button className="btn btn-primary" onClick={() => navigate("/")}>
                Home
            </button>
        </header>


        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/meals/new" element={<MealForm/>}/>
            <Route path="/meals/edit/:id" element={<MealForm/>}/>
            <Route path="*" element={<h1 className="text-center mt-5">Not found</h1>}/>
        </Routes>
    </>
  )
};

export default App
