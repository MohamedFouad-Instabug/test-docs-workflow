import React, { useState } from 'react';
import './App.css';

const recipes = [
  {
    id: 1,
    name: 'Spaghetti Carbonara',
    ingredients: [
      '200g spaghetti',
      '100g pancetta',
      '2 large eggs',
      '50g pecorino cheese',
      '50g parmesan',
      'Black pepper',
      'Salt'
    ],
    instructions: [
      'Boil the spaghetti in salted water.',
      'Fry the pancetta until crisp.',
      'Beat the eggs and mix with the cheeses.',
      'Drain the pasta and mix with pancetta and egg-cheese mixture off the heat.',
      'Season with black pepper and serve.'
    ]
  },
  {
    id: 2,
    name: 'Chicken Curry',
    ingredients: [
      '500g chicken breast',
      '2 onions',
      '3 cloves garlic',
      '1 tbsp curry powder',
      '400ml coconut milk',
      'Salt',
      'Pepper'
    ],
    instructions: [
      'Sauté onions and garlic.',
      'Add chicken and brown.',
      'Stir in curry powder.',
      'Pour in coconut milk and simmer until chicken is cooked.',
      'Season and serve with rice.'
    ]
  },
  {
    id: 3,
    name: 'Greek Salad',
    ingredients: [
      '2 tomatoes',
      '1 cucumber',
      '1/2 red onion',
      '100g feta cheese',
      'Olives',
      'Olive oil',
      'Oregano',
      'Salt',
      'Pepper'
    ],
    instructions: [
      'Chop vegetables and combine in a bowl.',
      'Add feta and olives.',
      'Drizzle with olive oil and sprinkle oregano.',
      'Season and toss gently.'
    ]
  }
];

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Food Recipes</h1>
        {selectedRecipe ? (
          <div className="recipe-detail">
            <button onClick={() => setSelectedRecipe(null)} style={{marginBottom: '1rem'}}>← Back to recipes</button>
            <h2>{selectedRecipe.name}</h2>
            <h3>Ingredients:</h3>
            <ul>
              {selectedRecipe.ingredients.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <h3>Instructions:</h3>
            <ol>
              {selectedRecipe.instructions.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>
        ) : (
          <div className="recipe-list">
            <h2>Choose a recipe:</h2>
            <ul>
              {recipes.map(recipe => (
                <li key={recipe.id}>
                  <button onClick={() => setSelectedRecipe(recipe)}>{recipe.name}</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
