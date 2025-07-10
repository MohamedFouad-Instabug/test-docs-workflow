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
  },
  {
    id: 4,
    name: 'Beef Tacos',
    ingredients: [
      '8 small tortillas',
      '300g ground beef',
      '1 onion',
      '2 cloves garlic',
      '1 tsp chili powder',
      'Lettuce',
      'Tomato',
      'Cheddar cheese',
      'Sour cream',
      'Salt',
      'Pepper'
    ],
    instructions: [
      'Cook onion and garlic until soft.',
      'Add ground beef and brown.',
      'Stir in chili powder, salt, and pepper.',
      'Warm tortillas.',
      'Fill tortillas with beef, lettuce, tomato, cheese, and sour cream.'
    ]
  },
  {
    id: 5,
    name: 'Vegetable Stir Fry',
    ingredients: [
      '1 bell pepper',
      '1 carrot',
      '100g broccoli',
      '1 onion',
      '2 tbsp soy sauce',
      '1 tbsp olive oil',
      '1 clove garlic',
      'Salt',
      'Pepper'
    ],
    instructions: [
      'Chop all vegetables.',
      'Heat oil in a wok.',
      'Add garlic and onion, stir fry for 2 minutes.',
      'Add remaining vegetables and stir fry until tender.',
      'Add soy sauce, salt, and pepper. Serve hot.'
    ]
  },
  {
    id: 6,
    name: 'Pancakes',
    ingredients: [
      '1 cup flour',
      '2 tbsp sugar',
      '1 tsp baking powder',
      '1/2 tsp salt',
      '1 cup milk',
      '1 egg',
      '2 tbsp melted butter',
      'Butter or oil for cooking'
    ],
    instructions: [
      'Mix dry ingredients in a bowl.',
      'Whisk in milk, egg, and melted butter.',
      'Heat a pan and add butter or oil.',
      'Pour batter to form pancakes and cook until bubbles form.',
      'Flip and cook until golden. Serve with syrup.'
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
