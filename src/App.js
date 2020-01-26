import React, {Component} from 'react';
import './App.css';

import Form from './components/Form';
import Recipes from './components/Recipes';

const APP_ID = '4327c824';
const APP_KEY = '57824ae7544369a3c67c79a495bf48d0';

class App extends Component {
  state = {
    recipes: []
  }

  getRecipe = async (e) => {
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();
    const api_call = await fetch(`https://api.edamam.com/search?q=${recipeName}&app_id=${APP_ID}&app_key=${APP_KEY}`); // The API Hamza used, Food2Fork is no longer available, so I am using Edamam API here.

    const data = await api_call.json();
    this.setState({ recipes: data.hits });
    console.log(this.state.recipes);
  }

  componentDidMount = () => {
    const json = localStorage.getItem('recipes');
    const recipes = JSON.parse(json);
    this.setState({recipes}); // same as this.setState({recipes: recipes});
  }

  // As soon as a component updates (e.g., when the state changes), whatever's inside this ComponentDidUpdate will run.
  componentDidUpdate = () => {
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem('recipes', recipes); // Assign to local storage
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe} />
        <Recipes recipes={this.state.recipes} />
      </div>
    );
  }
}

export default App;