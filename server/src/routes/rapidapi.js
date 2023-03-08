const axios = require('axios')

function getMeals() {// webnox
    const options = {
        method: 'GET',
        url: 'https://webknox-recipes.p.rapidapi.com/recipes/mealplans/generate',
        params: { timeFrame: 'week', targetCalories: '2000' },
        headers: {
            'X-RapidAPI-Key': 'ebbe703737msh1045a73b436ac9bp1ee217jsn3581de1d190b',
            'X-RapidAPI-Host': 'webknox-recipes.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}
function getMealsWeek() {
    const options = {
        method: 'GET',
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate',
        params: {
            timeFrame: 'week',
            targetCalories: '2200',
            diet: 'primal',
            exclude: 'shellfish, olives'
        },
        headers: {
            'X-RapidAPI-Key': 'ebbe703737msh1045a73b436ac9bp1ee217jsn3581de1d190b',
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}

function getRecipe() {
    let id = '622598'
    const options = {
        method: 'GET',
        url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`,
        headers: {
            'X-RapidAPI-Key': 'ebbe703737msh1045a73b436ac9bp1ee217jsn3581de1d190b',
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}

function searchRecipe(Query, sort, sort_dir) {

    const options = {
        method: 'GET',
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
        params: {
            query: 'chicken',
            cuisine: '',
            excludeCuisine: '',
            diet: 'primal',
            intolerances: '',
            equipment: '',
            includeIngredients: '',
            excludeIngredients: 'eggplant',
            type: '',
            instructionsRequired: 'true',
            fillIngredients: 'false',
            addRecipeInformation: 'false',
            titleMatch: '',
            maxReadyTime: '25',
            ignorePantry: 'true',
            sort: 'meta-rating',
            sortDirection: 'desc',
            minCarbs: '10',
            maxCarbs: '130',
            minProtein: '10',
            maxProtein: '130',
            minCalories: '50',
            maxCalories: '1200',
            minFat: '10',
            maxFat: '130',
            minAlcohol: '0',
            maxAlcohol: '200',
            minCaffeine: '0',
            maxCaffeine: '200',
            minCopper: '0',
            maxCopper: '200',
            minCalcium: '0',
            maxCalcium: '200',
            minCholine: '0',
            maxCholine: '200',
            minCholesterol: '0',
            maxCholesterol: '200',
            minFluoride: '0',
            maxFluoride: '200',
            minSaturatedFat: '0',
            maxSaturatedFat: '200',
            minVitaminA: '0',
            maxVitaminA: '200',
            minVitaminC: '0',
            maxVitaminC: '200',
            minVitaminD: '0',
            maxVitaminD: '200',
            minVitaminE: '0',
            maxVitaminE: '200',
            minVitaminK: '0',
            maxVitaminK: '200',
            minVitaminB1: '0',
            maxVitaminB1: '200',
            minVitaminB2: '0',
            maxVitaminB2: '200',
            minVitaminB5: '0',
            maxVitaminB5: '200',
            minVitaminB3: '0',
            maxVitaminB3: '200',
            minVitaminB6: '0',
            maxVitaminB6: '200',
            minVitaminB12: '0',
            maxVitaminB12: '200',
            minFiber: '0',
            maxFiber: '200',
            minFolate: '0',
            maxFolate: '200',
            minFolicAcid: '0',
            maxFolicAcid: '200',
            minIodine: '0',
            maxIodine: '200',
            minIron: '0',
            maxIron: '200',
            minMagnesium: '0',
            maxMagnesium: '200',
            minManganese: '0',
            maxManganese: '200',
            minPhosphorus: '0',
            maxPhosphorus: '200',
            minPotassium: '0',
            maxPotassium: '200',
            minSelenium: '0',
            maxSelenium: '200',
            minSodium: '0',
            maxSodium: '200',
            minSugar: '0',
            maxSugar: '200',
            minZinc: '0',
            maxZinc: '200',
            offset: '0',
            number: '10',
            limitLicense: 'false',
            ranking: '2'
        },
        headers: {
            'X-RapidAPI-Key': 'ebbe703737msh1045a73b436ac9bp1ee217jsn3581de1d190b',
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}

module.exports = { getMeals, getRecipe, searchRecipe }


searchRecipe()
// getMealsWeek()
// getRecipe()
