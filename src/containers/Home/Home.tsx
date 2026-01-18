import {useEffect, useState} from 'react';
import type {Meal} from "../../types";
import axiosApi from "../../axiosAPI.ts";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [meals, setMeals] = useState<Meal[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const showMeals = async () => {
            try {
                setLoading(true);
                const res = await axiosApi.get('/meals.json');
                const resData = res.data;

                const mealsArray = resData
                    ? Object.keys(resData).map(key => ({ id: key, ...resData[key] }))
                    : [];
                setMeals(mealsArray);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        showMeals();
    }, []);

    const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

    return (
        <div className='container mt-2'>
            <h1 className='card-title'>Calorie Tracker</h1>
            <hr/>
            <p className='card-text'>Total calories: {totalCalories}</p>
            <button
                className='btn btn-primary mb-3'
                onClick={() => navigate('/meals/newMeal')}
            >Add new meal</button>

            {loading && (
                <div className="text-center my-3">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Sending</span>
                    </div>
                </div>
            )}

            {meals.length > 0 && (
                <div className='container'>
                    <div className='row'>
                        {meals.map((meal) => (
                            <div key={meal.id} className='col-md-4 mb-2'>
                                <div className='card h-100 shadow-sm'>
                                    <div className='card-body d-flex flex-column justify-content-between'>
                                        <h3 className='card-title'>{meal.type}</h3>
                                        <p className="card-text">{meal.description}</p>
                                        <p className="card-text">Calories: {meal.calories}</p>
                                        <button type='button' className='btn btn-primary mb-2'>Edit</button>
                                        <button type='button' className='btn btn-warning'>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;