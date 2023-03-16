import React, { useEffect, useState } from 'react';
import MealList from "./components/MealList";
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

export default function App() {
    const userEmail = 'johantin@hotmail.com';
    const [showLogin, setShowLogin] = useState(false);
    const [mealData, setMealData] = useState(null);
    const [calories, setCalories] = useState(2100);
    const [id, setId] = useState(null);
    function handleChange(e) {
            setCalories(e.target.value)
        }
    function toggleLogin() {
        setShowLogin(!showLogin);
    }

    function getMealData() {
        const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate';
        const requestOptions = {
            method: 'GET',
            params: {
                timeFrame: 'week',
                targetCalories: calories,
                diet: 'primal',
                exclude: 'shellfish, olives'
            },
            headers: {
                'X-RapidAPI-Key': 'ebbe703737msh1045a73b436ac9bp1ee217jsn3581de1d190b',
                'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
            }
        };
        fetch(url,requestOptions)
        .then((response) => response.json())
        .then((data) => {
            setMealData(data);
            console.log(data);
        }).catch(() => {
            console.log("error");
        })
    }
        
    const checkDbItems = async () => {
        //hardcoded change
        let arr = ['123456', '65432','21323','12345','abc']
        const response = await fetch(`http://localhost:8000/check-data?ids=${arr}`)
        const json = await response.json()
        let array = json.map(obj => obj.id)
        let notStoredIds = arr.filter(item => !array.includes(item))
        setId(json)
        console.log(json,notStoredIds);
        return notStoredIds;
    };
    function getIndividualMeal() {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'ebbe703737msh1045a73b436ac9bp1ee217jsn3581de1d190b',
                'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
            }
        };
        let id = '123456';
        let ingredients = true;
        fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information?includeNutrition=${ingredients}`, options)
            .then(response => response.json())
            .then(response => {
                setMealData(response)
            })
            .catch(err => console.error(err));
    }
    useEffect(() => checkDbItems, [])
    return (
    <div className='App'>
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
        <Navbar onLoginClick={toggleLogin} />
        <section className='controls'>
            <input
            type="number"
            placeholder='Calories pr day (e.g. 2100)'
            onChange={handleChange} />
        </section>
        <button onClick={getMealData}>Get Daily Meal Plan</button>
        {mealData && <MealList mealData={mealData} />}
        {showLogin && (
            <div className='overlay'>
                <Login onLoginClick={toggleLogin} />
            </div>
        )}
    </div>
)}
