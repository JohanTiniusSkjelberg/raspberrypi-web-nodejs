import React, {useState, useEffect} from 'react';

export default function Meal({ meal, onNextMealClick }) {
    const [imageUrl, setImageUrl] = useState('');
    function handleButtonClick(event) {
        const parent = event.target.parentNode;
        const image = parent.querySelector('img').src;
        let idx = image.match(/(?<=\/)[^\/-]+(?=-)/);
        onNextMealClick(idx);
    }
    function redirectURL(event) {
        let text = event.target.innerHTML
        text = text.replace(/\s+/g, '-');
        const parent = event.target.parentNode;
        const image = parent.querySelector('img').src;
        let idx = image.match(/(?<=\/)[^\/-]+(?=-)/);
        let url = `https://spoonacular.com/recipes/${text}-${idx}`
        window.open(url)
    }
    return (
        <article style={{ flexGrow: 1, borderRight: '1px solid #ccc', padding: '1rem' }}>
            <button className="button-round" onClick={(event) => {
                handleButtonClick(event);
            }}>
            </button>
            <h1 style={{ cursor: 'pointer' }} onClick={redirectURL}>{meal.title}</h1>
            <img onClick={redirectURL} style={{ cursor: 'pointer' }}  src={`https://spoonacular.com/recipeImages/${meal.id}-556x370.${meal.imageType}`} alt={meal.title} />
        </article>
    );
}