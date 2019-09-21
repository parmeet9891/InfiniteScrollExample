import React from 'react';

const PokemonCard = ({list,image}) => {
    return (
        <div className = "col-md-3">
            <div className = "card pokemon">        
                <img src = {image} alt = {list.name} className = "card-img-top center-block avatar"/>
                <div className = "card-body">
                    <div className = "card-title">{list.id}</div>
                    <div className = "card-text">{list.name}</div>
                </div>
            </div>
        </div>
    )
}

export default PokemonCard;