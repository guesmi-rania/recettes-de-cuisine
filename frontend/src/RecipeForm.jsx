import { useState } from 'react';
import axios from 'axios';

function RecipeForm() {
  const [form, setForm] = useState({ title: '', ingredients: '', instructions: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/recipes', form);
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Titre" onChange={handleChange} required />
      <textarea name="ingredients" placeholder="Ingrédients" onChange={handleChange} required />
      <textarea name="instructions" placeholder="Instructions" onChange={handleChange} required />
      <button type="submit">Ajouter</button>
    </form>
  );
}

export default RecipeForm;
