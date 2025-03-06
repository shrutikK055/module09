import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddRecipe = () => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:5000/api/recipes', {
      name,
      ingredients: ingredients.split(','),
      instructions
    }).then(() => navigate('/'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <textarea placeholder="Ingredients (comma separated)" onChange={(e) => setIngredients(e.target.value)} />
      <textarea placeholder="Instructions" onChange={(e) => setInstructions(e.target.value)} />
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default AddRecipe;
