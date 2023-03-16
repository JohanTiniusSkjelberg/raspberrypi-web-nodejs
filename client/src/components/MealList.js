import React, { useState } from 'react';
import Meal from './Meal';

export default function MealList({ mealData }) {
    // const mealValues = 
    const [mealValue, setMealValue] = useState(mealData.items.map(obj => JSON.parse(obj.value)));

    const handleNextMealClick = (idx) => {
        const newValue = mealValue.filter((value) => {
            return value.id!=idx;
        })
        setMealValue(newValue);
    };
    function handleMealprepp() {
        const currentMeals = mealValue.slice(0,6)
    }
    return (
        <main>
           {/* <section className='nutrients'>
            <h1>Macros</h1>
           </section> */}
           <section className='meals'>
                {mealValue.slice(0, 6).map((recipe) => {
                return <Meal
                key={recipe.id} 
                meal={recipe} 
                onNextMealClick={handleNextMealClick}
                isLastMeal={ mealValue.length===6}
                />
            })}
           </section>
           <button onClick={handleMealprepp}>
             Finish
           </button>
        </main>
    );
}