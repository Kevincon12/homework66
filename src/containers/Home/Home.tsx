import React, {useEffect, useState} from 'react';
import type {Meal} from "../../types";
import axiosApi from "../../axiosAPI.ts";

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [meals, setMeals] = useState<Meal[]>([]);

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

    return (
        <div>
            <h1 className='card-title'>Calorie Tracker</h1>
            <p className='card-text'>Total calories: </p>
            <button className='btn btn-primary'>Add new meal</button>

            {loading && (
                <div className="text-center my-3">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Sending</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;