import React, { useState, useEffect } from 'react';
import './App.css';

// Enhanced recipe data structure with categories, ratings, and user data
const recipes = [
  {
    id: 1,
    name: 'Spaghetti Carbonara',
    category: 'Italian',
    difficulty: 'Medium',
    prepTime: '15 minutes',
    cookTime: '20 minutes',
    servings: 4,
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
    ],
    dietaryInfo: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false
    },
    ratings: [],
    averageRating: 0,
    totalReviews: 0,
    createdBy: 'system',
    createdAt: '2024-01-01',
    tags: ['pasta', 'italian', 'quick-meal']
  },
  {
    id: 2,
    name: 'Chicken Curry',
    category: 'Indian',
    difficulty: 'Easy',
    prepTime: '10 minutes',
    cookTime: '30 minutes',
    servings: 6,
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
    ],
    dietaryInfo: {
      vegetarian: false,
      vegan: false,
      glutenFree: true,
      dairyFree: true
    },
    ratings: [],
    averageRating: 0,
    totalReviews: 0,
    createdBy: 'system',
    createdAt: '2024-01-01',
    tags: ['curry', 'chicken', 'spicy']
  },
  {
    id: 3,
    name: 'Greek Salad',
    category: 'Mediterranean',
    difficulty: 'Easy',
    prepTime: '10 minutes',
    cookTime: '0 minutes',
    servings: 4,
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
    ],
    dietaryInfo: {
      vegetarian: true,
      vegan: false,
      glutenFree: true,
      dairyFree: false
    },
    ratings: [],
    averageRating: 0,
    totalReviews: 0,
    createdBy: 'system',
    createdAt: '2024-01-01',
    tags: ['salad', 'vegetarian', 'healthy']
  },
  {
    id: 4,
    name: 'Beef Tacos',
    category: 'Mexican',
    difficulty: 'Easy',
    prepTime: '15 minutes',
    cookTime: '15 minutes',
    servings: 4,
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
    ],
    dietaryInfo: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false
    },
    ratings: [],
    averageRating: 0,
    totalReviews: 0,
    createdBy: 'system',
    createdAt: '2024-01-01',
    tags: ['tacos', 'mexican', 'beef']
  },
  {
    id: 5,
    name: 'Vegetable Stir Fry',
    category: 'Asian',
    difficulty: 'Easy',
    prepTime: '10 minutes',
    cookTime: '10 minutes',
    servings: 4,
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
    ],
    dietaryInfo: {
      vegetarian: true,
      vegan: true,
      glutenFree: false,
      dairyFree: true
    },
    ratings: [],
    averageRating: 0,
    totalReviews: 0,
    createdBy: 'system',
    createdAt: '2024-01-01',
    tags: ['stir-fry', 'vegetarian', 'vegan', 'asian']
  },
  {
    id: 6,
    name: 'Pancakes',
    category: 'Breakfast',
    difficulty: 'Easy',
    prepTime: '10 minutes',
    cookTime: '15 minutes',
    servings: 4,
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
    ],
    dietaryInfo: {
      vegetarian: true,
      vegan: false,
      glutenFree: false,
      dairyFree: false
    },
    ratings: [],
    averageRating: 0,
    totalReviews: 0,
    createdBy: 'system',
    createdAt: '2024-01-01',
    tags: ['breakfast', 'pancakes', 'sweet']
  },
  {
    id: 7,
    name: 'Caprese Salad',
    category: 'Mediterranean',
    difficulty: 'Easy',
    prepTime: '5 minutes',
    cookTime: '0 minutes',
    servings: 2,
    ingredients: [
      '2 tomatoes',
      '100g mozzarella',
      'Fresh basil',
      'Olive oil',
      'Salt',
      'Pepper'
    ],
    instructions: [
      'Slice tomatoes and mozzarella.',
      'Arrange on a plate with basil leaves.',
      'Drizzle with olive oil, season with salt and pepper.'
    ],
    dietaryInfo: {
      vegetarian: true,
      vegan: false,
      glutenFree: true,
      dairyFree: false
    },
    ratings: [],
    averageRating: 0,
    totalReviews: 0,
    createdBy: 'system',
    createdAt: '2024-01-01',
    tags: ['salad', 'italian', 'vegetarian']
  },
  {
    id: 8,
    name: 'Omelette',
    category: 'Breakfast',
    difficulty: 'Easy',
    prepTime: '5 minutes',
    cookTime: '5 minutes',
    servings: 1,
    ingredients: [
      '2 eggs',
      '1 tbsp milk',
      'Salt',
      'Pepper',
      'Butter',
      'Cheese (optional)',
      'Ham (optional)'
    ],
    instructions: [
      'Beat eggs with milk, salt, and pepper.',
      'Melt butter in a pan.',
      'Pour in eggs and cook gently.',
      'Add cheese/ham if desired, fold and serve.'
    ],
    dietaryInfo: {
      vegetarian: true,
      vegan: false,
      glutenFree: true,
      dairyFree: false
    },
    ratings: [],
    averageRating: 0,
    totalReviews: 0,
    createdBy: 'system',
    createdAt: '2024-01-01',
    tags: ['breakfast', 'eggs', 'quick']
  },
  {
    id: 9,
    name: 'Fruit Smoothie',
    category: 'Drinks',
    difficulty: 'Easy',
    prepTime: '5 minutes',
    cookTime: '0 minutes',
    servings: 2,
    ingredients: [
      '1 banana',
      '1 cup berries',
      '1 cup yogurt',
      'Honey',
      'Ice cubes'
    ],
    instructions: [
      'Combine all ingredients in a blender.',
      'Blend until smooth.',
      'Serve chilled.'
    ],
    dietaryInfo: {
      vegetarian: true,
      vegan: false,
      glutenFree: true,
      dairyFree: false
    },
    ratings: [],
    averageRating: 0,
    totalReviews: 0,
    createdBy: 'system',
    createdAt: '2024-01-01',
    tags: ['smoothie', 'drinks', 'healthy']
  }
];

// Collect all unique ingredients
const allIngredients = Array.from(
  new Set(recipes.flatMap(r => r.ingredients.map(i => i.toLowerCase())))
).sort();

// Get unique categories
const categories = [...new Set(recipes.map(r => r.category))];

// Mock user data (in a real app, this would come from authentication)
const mockUsers = [
  {
    id: 1,
    username: 'chef_john',
    email: 'john@example.com',
    preferences: {
      dietaryRestrictions: ['vegetarian'],
      favoriteCategories: ['Italian', 'Mediterranean'],
      spiceLevel: 'medium'
    },
    savedRecipes: [1, 3, 7],
    createdRecipes: []
  },
  {
    id: 2,
    username: 'vegan_chef',
    email: 'vegan@example.com',
    preferences: {
      dietaryRestrictions: ['vegan'],
      favoriteCategories: ['Asian', 'Mediterranean'],
      spiceLevel: 'high'
    },
    savedRecipes: [3, 5],
    createdRecipes: []
  }
];

function App() {
  // Authentication state
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Recipe state
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recipesList, setRecipesList] = useState(recipes);

  // Filtering and search state
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  // Rating and review state
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [ratingRecipe, setRatingRecipe] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');

  // User preferences state
  const [showPreferences, setShowPreferences] = useState(false);

  // Initialize user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Save user to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  // Filter recipes based on current filters
  useEffect(() => {
    let filtered = recipes;

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(recipe => recipe.category === selectedCategory);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Dietary filter
    if (dietaryFilter !== 'all') {
      filtered = filtered.filter(recipe => recipe.dietaryInfo[dietaryFilter]);
    }

    // Difficulty filter
    if (difficultyFilter !== 'all') {
      filtered = filtered.filter(recipe => recipe.difficulty.toLowerCase() === difficultyFilter);
    }

    setRecipesList(filtered);
  }, [selectedCategory, searchTerm, dietaryFilter, difficultyFilter]);

  // Authentication functions
  const handleLogin = (username, password) => {
    // Mock authentication
    const user = mockUsers.find(u => u.username === username);
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      setShowLogin(false);
    }
  };

  const handleRegister = (username, email, password) => {
    // Mock registration
    const newUser = {
      id: mockUsers.length + 1,
      username,
      email,
      preferences: {
        dietaryRestrictions: [],
        favoriteCategories: [],
        spiceLevel: 'medium'
      },
      savedRecipes: [],
      createdRecipes: []
    };
    mockUsers.push(newUser);
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    setShowRegister(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  // Recipe functions
  const handleIngredientChange = (ingredient) => {
    setShowSuggestions(false);
    setSelectedRecipe(null);
    setSelectedIngredients(prev =>
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleRecipeRating = (recipeId, rating, review) => {
    const updatedRecipes = recipesList.map(recipe => {
      if (recipe.id === recipeId) {
        const newRating = {
          userId: currentUser.id,
          username: currentUser.username,
          rating,
          review,
          date: new Date().toISOString()
        };
        
        const updatedRatings = [...recipe.ratings, newRating];
        const averageRating = updatedRatings.reduce((sum, r) => sum + r.rating, 0) / updatedRatings.length;
        
        return {
          ...recipe,
          ratings: updatedRatings,
          averageRating: Math.round(averageRating * 10) / 10,
          totalReviews: updatedRatings.length
        };
      }
      return recipe;
    });
    
    setRecipesList(updatedRecipes);
    setShowRatingModal(false);
    setRatingRecipe(null);
    setUserRating(0);
    setUserReview('');
  };

  const toggleSavedRecipe = (recipeId) => {
    if (!currentUser) return;
    
    const updatedUser = {
      ...currentUser,
      savedRecipes: currentUser.savedRecipes.includes(recipeId)
        ? currentUser.savedRecipes.filter(id => id !== recipeId)
        : [...currentUser.savedRecipes, recipeId]
    };
    setCurrentUser(updatedUser);
  };

  // Suggest recipes based on selected ingredients
  const suggestedRecipes = recipesList
    .map(recipe => {
      const matched = recipe.ingredients.filter(ing =>
        selectedIngredients.includes(ing.toLowerCase())
      ).length;
      return { ...recipe, matched };
    })
    .filter(r => r.matched > 0)
    .sort((a, b) => b.matched - a.matched);

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>🍳 RecipeHub</h1>
          <div className="auth-buttons">
            {!isAuthenticated ? (
              <>
                <button onClick={() => setShowLogin(true)}>Login</button>
                <button onClick={() => setShowRegister(true)}>Register</button>
              </>
            ) : (
              <div className="user-section">
                <span>Welcome, {currentUser.username}!</span>
                <button onClick={() => setShowPreferences(true)}>Preferences</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="search-filter-section">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select 
            value={dietaryFilter} 
            onChange={(e) => setDietaryFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Diets</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="glutenFree">Gluten Free</option>
            <option value="dairyFree">Dairy Free</option>
          </select>

          <select 
            value={difficultyFilter} 
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {!selectedRecipe && (
          <div className="ingredient-select" style={{marginBottom: '2rem'}}>
            <h2>Select the ingredients you have:</h2>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
              {allIngredients.map(ingredient => (
                <label key={ingredient} style={{marginRight: '1rem'}}>
                  <input
                    type="checkbox"
                    checked={selectedIngredients.includes(ingredient)}
                    onChange={() => handleIngredientChange(ingredient)}
                  />
                  {ingredient}
                </label>
              ))}
            </div>
            <button
              style={{marginTop: '1rem'}}
              onClick={() => setShowSuggestions(true)}
              disabled={selectedIngredients.length === 0}
            >
              Suggest Recipes
            </button>
          </div>
        )}

        {selectedRecipe ? (
          <div className="recipe-detail">
            <button onClick={() => setSelectedRecipe(null)} style={{marginBottom: '1rem'}}>← Back to recipes</button>
            
            <div className="recipe-header">
              <h2>{selectedRecipe.name}</h2>
              <div className="recipe-meta">
                <span className="category">{selectedRecipe.category}</span>
                <span className="difficulty">{selectedRecipe.difficulty}</span>
                <span className="time">{selectedRecipe.prepTime} + {selectedRecipe.cookTime}</span>
                <span className="servings">{selectedRecipe.servings} servings</span>
              </div>
              
              <div className="recipe-actions">
                {isAuthenticated && (
                  <button 
                    onClick={() => toggleSavedRecipe(selectedRecipe.id)}
                    className={currentUser?.savedRecipes.includes(selectedRecipe.id) ? 'saved' : ''}
                  >
                    {currentUser?.savedRecipes.includes(selectedRecipe.id) ? '❤️ Saved' : '🤍 Save'}
                  </button>
                )}
                <button onClick={() => {
                  setRatingRecipe(selectedRecipe);
                  setShowRatingModal(true);
                }}>
                  ⭐ Rate Recipe
                </button>
              </div>

              <div className="rating-section">
                <div className="average-rating">
                  ⭐ {selectedRecipe.averageRating} ({selectedRecipe.totalReviews} reviews)
                </div>
                {selectedRecipe.ratings.length > 0 && (
                  <div className="recent-reviews">
                    <h4>Recent Reviews:</h4>
                    {selectedRecipe.ratings.slice(-3).map((rating, idx) => (
                      <div key={idx} className="review">
                        <div className="review-header">
                          <span className="reviewer">{rating.username}</span>
                          <span className="review-rating">{'⭐'.repeat(rating.rating)}</span>
                        </div>
                        {rating.review && <p className="review-text">{rating.review}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="recipe-content">
              <div className="dietary-info">
                <h3>Dietary Information:</h3>
                <div className="dietary-tags">
                  {selectedRecipe.dietaryInfo.vegetarian && <span className="tag vegetarian">Vegetarian</span>}
                  {selectedRecipe.dietaryInfo.vegan && <span className="tag vegan">Vegan</span>}
                  {selectedRecipe.dietaryInfo.glutenFree && <span className="tag gluten-free">Gluten Free</span>}
                  {selectedRecipe.dietaryInfo.dairyFree && <span className="tag dairy-free">Dairy Free</span>}
                </div>
              </div>

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

              <div className="recipe-tags">
                <h3>Tags:</h3>
                <div className="tags">
                  {selectedRecipe.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : showSuggestions && selectedIngredients.length > 0 ? (
          <div className="recipe-list">
            <h2>Suggested Recipes:</h2>
            {suggestedRecipes.length === 0 ? (
              <p>No recipes match your selected ingredients.</p>
            ) : (
              <ul>
                {suggestedRecipes.map(recipe => (
                  <li key={recipe.id}>
                    <button onClick={() => setSelectedRecipe(recipe)}>
                      {recipe.name} ({recipe.matched} ingredient{recipe.matched > 1 ? 's' : ''} matched)
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <button style={{marginTop: '1rem'}} onClick={() => setShowSuggestions(false)}>← Back to ingredient selection</button>
          </div>
        ) : (
          <div className="recipe-list">
            <h2>Choose a recipe:</h2>
            <ul>
              {recipesList.map(recipe => (
                <li key={recipe.id}>
                  <button onClick={() => setSelectedRecipe(recipe)}>
                    <div className="recipe-card">
                      <h3>{recipe.name}</h3>
                      <div className="recipe-card-meta">
                        <span className="category">{recipe.category}</span>
                        <span className="difficulty">{recipe.difficulty}</span>
                        <span className="rating">⭐ {recipe.averageRating} ({recipe.totalReviews})</span>
                      </div>
                      <div className="dietary-tags">
                        {recipe.dietaryInfo.vegetarian && <span className="tag vegetarian">V</span>}
                        {recipe.dietaryInfo.vegan && <span className="tag vegan">VG</span>}
                        {recipe.dietaryInfo.glutenFree && <span className="tag gluten-free">GF</span>}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* Login Modal */}
      {showLogin && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Login</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleLogin(formData.get('username'), formData.get('password'));
            }}>
              <input name="username" placeholder="Username" required />
              <input name="password" type="password" placeholder="Password" required />
              <button type="submit">Login</button>
              <button type="button" onClick={() => setShowLogin(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegister && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Register</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleRegister(formData.get('username'), formData.get('email'), formData.get('password'));
            }}>
              <input name="username" placeholder="Username" required />
              <input name="email" type="email" placeholder="Email" required />
              <input name="password" type="password" placeholder="Password" required />
              <button type="submit">Register</button>
              <button type="button" onClick={() => setShowRegister(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* Rating Modal */}
      {showRatingModal && ratingRecipe && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Rate {ratingRecipe.name}</h2>
            <div className="rating-input">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => setUserRating(star)}
                  className={star <= userRating ? 'star active' : 'star'}
                >
                  ⭐
                </button>
              ))}
            </div>
            <textarea
              placeholder="Write a review (optional)..."
              value={userReview}
              onChange={(e) => setUserReview(e.target.value)}
            />
            <button onClick={() => handleRecipeRating(ratingRecipe.id, userRating, userReview)}>
              Submit Rating
            </button>
            <button onClick={() => setShowRatingModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {showPreferences && currentUser && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>User Preferences</h2>
            <div className="preferences">
              <h3>Dietary Restrictions:</h3>
              {['vegetarian', 'vegan', 'glutenFree', 'dairyFree'].map(diet => (
                <label key={diet}>
                  <input
                    type="checkbox"
                    checked={currentUser.preferences.dietaryRestrictions.includes(diet)}
                    onChange={(e) => {
                      const updatedUser = {
                        ...currentUser,
                        preferences: {
                          ...currentUser.preferences,
                          dietaryRestrictions: e.target.checked
                            ? [...currentUser.preferences.dietaryRestrictions, diet]
                            : currentUser.preferences.dietaryRestrictions.filter(d => d !== diet)
                        }
                      };
                      setCurrentUser(updatedUser);
                    }}
                  />
                  {diet.charAt(0).toUpperCase() + diet.slice(1)}
                </label>
              ))}
              
              <h3>Favorite Categories:</h3>
              {categories.map(category => (
                <label key={category}>
                  <input
                    type="checkbox"
                    checked={currentUser.preferences.favoriteCategories.includes(category)}
                    onChange={(e) => {
                      const updatedUser = {
                        ...currentUser,
                        preferences: {
                          ...currentUser.preferences,
                          favoriteCategories: e.target.checked
                            ? [...currentUser.preferences.favoriteCategories, category]
                            : currentUser.preferences.favoriteCategories.filter(c => c !== category)
                        }
                      };
                      setCurrentUser(updatedUser);
                    }}
                  />
                  {category}
                </label>
              ))}
            </div>
            <button onClick={() => setShowPreferences(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
