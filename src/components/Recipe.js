import React from 'react';
import {Link} from 'react-router-dom';

const APP_ID = 'ca890d5b';
const APP_KEY = 'ace12022edc035fe6eb277d959a67755';

// Class-based component
class Recipe extends React.Component {
    state = {
        activeRecipe: []
    }
    componentDidMount = async () => {
        const title = this.props.location.state.recipe;
        const req = await fetch
        (`https://api.edamam.com/search?q=${title}&app_id=${APP_ID}&app_key=${APP_KEY}`); 
        // The API Hamza used, Food2Fork is no longer available, so I am using Edamam API here.
    
        const res = await req.json();
        this.setState({activeRecipe: res.hits[0]});
        console.log(this.state.activeRecipe);
    }
    render() {
        const recipe = this.state.activeRecipe;
        return (
            <div className='container'>
                { this.state.activeRecipe.length !== 0 &&
                    <div className='active-recipe'>
                        <img className='active-recipe__img' src={recipe.recipe.image} alt={recipe.recipe.label}></img>
                        <h3 className='active-recipe__title'>{recipe.recipe.label}</h3>
                        <h4 className='active-recipe__publisher'>
                            Source: <span>{recipe.recipe.source}</span>
                        </h4>
                        <p className='active-recipe__website'>
                            Website: <span><a href={recipe.url}>{recipe.recipe.url}</a></span>
                        </p>
                        <button className='active-recipe__button'>
                            <Link to='/'>Go Home</Link>
                        </button>
                    </div>
                }
            </div>
        );
    }
};

export default Recipe;