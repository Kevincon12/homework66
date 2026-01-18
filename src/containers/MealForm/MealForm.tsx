import React, {useEffect, useState} from 'react';
import type {Meal} from "../../types";
import axiosApi from "../../axiosAPI.ts";
import {useNavigate, useParams} from "react-router-dom";

const MealForm = () => {
    const [meal, setMeal] = useState<Meal>({
        type: "breakfast",
        description: "",
        calories: 0,
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {id} = useParams<{ id: string }>();

    const formSend = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoading(true);
            if (id) {
                await axiosApi.put(`/meals/${id}.json`, meal);
            } else {
                await axiosApi.post("/meals.json", meal);
                navigate("/");
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setMeal(prev => {
            const newMeal = { ...prev };

            if (name === "calories") {
                newMeal.calories = Number(value);
            } else if (name === "type") {
                newMeal.type = value as Meal["type"];
            } else if (name === "description") {
                newMeal.description = value;
            }

            return newMeal;
        });
    };

    useEffect(() => {
        const getInfoForChanges = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const res = await axiosApi.get(`/meals/${id}.json`);
                if (res.data) {
                    setMeal(res.data);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        getInfoForChanges();
    }, [id]);

    return (
        <div className='container'>
            <h2>{id ? "Edit meal" : "Add new meal"}</h2>

            {loading && (
                <div className="text-center my-3">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Sending</span>
                    </div>
                </div>
            )}

            <form onSubmit={formSend}>
                <label className="form-label">Type</label>
                <select
                    className="form-select"
                    name="type"
                    value={meal.type}
                    onChange={handleChange}
                    required
                >
                    <option value="breakfast">Breakfast</option>
                    <option value="snack">Snack</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                </select>

                <label className="form-label">Description</label>
                <input
                    type="text"
                    className="form-control mb-2"
                    name="description"
                    value={meal.description}
                    onChange={handleChange}
                    required
                />

                <label className="form-label">Calories</label>
                <input
                    type="number"
                    className="form-control mb-2"
                    name="calories"
                    value={meal.calories}
                    onChange={handleChange}
                    min={0}
                    required
                />

                <button className="btn btn-primary" type="submit">{id ? "Save changes" : "Add new meal"}</button>
            </form>
        </div>
    );
};

export default MealForm;