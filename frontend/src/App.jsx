import RecipeForm from './RecipeForm';
import RecipeList from './RecipeList';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>🍲 Recettes de Cuisine</h1>
      <RecipeForm />
      <RecipeList />
    </div>
  );
}

export default App;
