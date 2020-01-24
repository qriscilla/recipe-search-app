import React from 'react';

const APP_ID = '4327c824';
const APP_KEY = '57824ae7544369a3c67c79a495bf48d0';

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
                <div className='active-recipe'>
                    <img className='active-recipe__img' src={recipe.image} alt={recipe.label}></img>
                    <h3 className='active-recipe__title'>{recipe.label}</h3>
                    <h4 className='active-recipe__publisher'>
                        Source: <span>{recipe.source}</span>
                    </h4>
                    <p className='active-recipe__website'>
                        Website: <span><a href={recipe.url}>{recipe.url}</a></span>
                    </p>
                    <button className='active-recipe__button'>Go Home</button>
                </div>
            </div>
        );
    }
};

export default Recipe;