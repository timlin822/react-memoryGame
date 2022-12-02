import Card from './Card';

import './Card.css';

const CardsList=({cards,choiceOne,choiceTwo,clickHandler})=>{
    return (
        <div className="card-grid">
            {cards.map((image,index)=>(
                <Card key={index} image={image} flip={image===choiceOne || image===choiceTwo || image.match} clickHandler={clickHandler} />
            ))}
        </div>
    );
}

export default CardsList;