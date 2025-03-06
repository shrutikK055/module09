import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: '',
    instructions: ''
  });

  // Fetch existing recipe details
  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/api/recipes/${id}`)
      .then(res => {
        setRecipe({
          name: res.data.name,
          ingredients: res.data.ingredients.join(', '), // Convert array to string
          instructions: res.data.instructions
        });
      })
      .catch(err => console.error(err));
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://127.0.0.1:5000/api/recipes/${id}`, {
      name: recipe.name,
      ingredients: recipe.ingredients.split(',').map(item => item.trim()), // Convert string to array
      instructions: recipe.instructions
    })
    .then(() => navigate('/'))
    .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={recipe.name}
          onChange={handleChange}
          placeholder="Recipe Name"
          required
        />
        <textarea
          name="ingredients"
          value={recipe.ingredients}
          onChange={handleChange}
          placeholder="Ingredients (comma-separated)"
          required
        />
        <textarea
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
          placeholder="Instructions"
          required
        />
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
};

export default EditRecipe;
