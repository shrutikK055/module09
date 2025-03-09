import React, { useState } from 'react';

const App = () => {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({ name: '', category: '', area: '', video: '' });
  const [editRecipe, setEditRecipe] = useState(null);

  // Function to fetch recipes based on search
  const fetchRecipes = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    const data = await response.json();
    setRecipes(data.meals || []);
  };

  // Function to handle adding a new recipe
  const handleAddRecipe = () => {
    if (!newRecipe.name || !newRecipe.category || !newRecipe.area || !newRecipe.video) {
      alert('Please fill all the fields');
      return;
    }

    setRecipes([
      ...recipes,
      {
        idMeal: Date.now(), // Temporary unique ID using current timestamp
        strMeal: newRecipe.name,
        strCategory: newRecipe.category,
        strArea: newRecipe.area,
        strYoutube: newRecipe.video,
        strMealThumb: '', // Placeholder for thumbnail
      },
    ]);
    setNewRecipe({ name: '', category: '', area: '', video: '' }); // Reset the form
  };

  // Function to handle editing a recipe
  const handleEditRecipe = (recipe) => {
    setEditRecipe(recipe); // Set recipe to edit
  };

  // Function to save edited recipe
  const handleSaveEdit = () => {
    if (!editRecipe.strMeal || !editRecipe.strCategory || !editRecipe.strArea || !editRecipe.strYoutube) {
      alert('Please fill all the fields');
      return;
    }

    setRecipes(
      recipes.map((recipe) =>
        recipe.idMeal === editRecipe.idMeal ? { ...recipe, ...editRecipe } : recipe
      )
    );
    setEditRecipe(null); // Reset the edit form
  };

  // Function to delete a recipe
  const handleDeleteRecipe = (id) => {
    setRecipes(recipes.filter(recipe => recipe.idMeal !== id)); // Remove the recipe from the list
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">Recipe Finder</h1>
      
      {/* Add new recipe form */}
      <div className="mb-6">
        <h2 className="text-2xl mb-2">Add New Recipe</h2>
        <input
          type="text"
          placeholder="Recipe Name"
          value={newRecipe.name}
          onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
          className="border p-2 rounded-lg mb-2"
        />
        <input
          type="text"
          placeholder="Category"
          value={newRecipe.category}
          onChange={(e) => setNewRecipe({ ...newRecipe, category: e.target.value })}
          className="border p-2 rounded-lg mb-2"
        />
        <input
          type="text"
          placeholder="Area"
          value={newRecipe.area}
          onChange={(e) => setNewRecipe({ ...newRecipe, area: e.target.value })}
          className="border p-2 rounded-lg mb-2"
        />
        <input
          type="text"
          placeholder="YouTube Video Link"
          value={newRecipe.video}
          onChange={(e) => setNewRecipe({ ...newRecipe, video: e.target.value })}
          className="border p-2 rounded-lg mb-4"
        />
        <button
          onClick={handleAddRecipe}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Add Recipe
        </button>
      </div>
      
      {/* Search input */}
      <div className="flex justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-lg"
        />
        <button
          onClick={fetchRecipes}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Search Recipe
        </button>
      </div>

      {/* Display Recipes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div key={recipe.idMeal} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={recipe.strMealThumb || 'https://via.placeholder.com/150'}
              alt={recipe.strMeal}
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
            <h2 className="text-lg font-semibold">{recipe.strMeal}</h2>
            <p><strong>Category:</strong> {recipe.strCategory}</p>
            <p><strong>Area:</strong> {recipe.strArea}</p>
            <a
              href={recipe.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              Watch Recipe
            </a>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleEditRecipe(recipe)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteRecipe(recipe.idMeal)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Recipe Form */}
      {editRecipe && (
        <div className="mt-6">
          <h2 className="text-2xl mb-2">Edit Recipe</h2>
          <input
            type="text"
            value={editRecipe.strMeal}
            onChange={(e) => setEditRecipe({ ...editRecipe, strMeal: e.target.value })}
            className="border p-2 rounded-lg mb-2"
          />
          <input
            type="text"
            value={editRecipe.strCategory}
            onChange={(e) => setEditRecipe({ ...editRecipe, strCategory: e.target.value })}
            className="border p-2 rounded-lg mb-2"
          />
          <input
            type="text"
            value={editRecipe.strArea}
            onChange={(e) => setEditRecipe({ ...editRecipe, strArea: e.target.value })}
            className="border p-2 rounded-lg mb-2"
          />
          <input
            type="text"
            value={editRecipe.strYoutube}
            onChange={(e) => setEditRecipe({ ...editRecipe, strYoutube: e.target.value })}
            className="border p-2 rounded-lg mb-4"
          />
          <button
            onClick={handleSaveEdit}
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
