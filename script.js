
let data = { meals: [] };//emty data

document.addEventListener("DOMContentLoaded", fetchAndShowRecipes);

//fetching api and hadling error
async function fetchAndShowRecipes() {
    try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
        if (!response.ok) {
            throw new Error('Failed to fetch recipes');
        }

        data = await response.json();
        showRecipes(data.meals);
    } catch (error) {
        console.error('Error fetching recipes:', error.message);
        
    }
}
// fetching api more meals cathcing error
async function fetchMoreMeals() {
    try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        if (!response.ok) {
            throw new Error('Failed to fetch more recipes');
        }

        const moreData = await response.json();
        data.meals = data.meals.concat(moreData.meals);
        showRecipes(data.meals);
    } catch (error) {
        console.error('Error fetching more recipes:', error.message);
    }
}

function showRecipes(recipes) {
    const recipeList = document.getElementById("recipeList");
    recipeList.innerHTML = "";

    recipes.forEach(recipe => {
        const recipeElement = createRecipeElement(recipe);
        recipeList.appendChild(recipeElement);
    });
}


// creating new div for the api function
function createRecipeElement(recipe) {
    const recipeElement = document.createElement("div");
    recipeElement.classList.add("recipe");

    recipeElement.innerHTML = `
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
        <h2>${recipe.strMeal}</h2>
        <p>Category: ${recipe.strCategory}</p>
        <p>Ingredients: ${getIngredients(recipe)}</p>
        <p>Instructions: ${recipe.strInstructions}</p>
    `;

    return recipeElement;
}

// loop recipe in the api
function getIngredients(recipe) {
    const ingredients = [];
    for (let i = 1; i <= 100; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        if (ingredient) {
            ingredients.push(ingredient);
        }
    }
    return ingredients.join(", ");
}

// function to search meals 
function searchRecipes() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const filteredRecipes = data.meals.filter(recipe => recipe.strMeal.toLowerCase().includes(searchInput));
    showRecipes(filteredRecipes);
}

// Example: Fetch more meals when the page loads
fetchMoreMeals();
