import egg from 'images/egg.jpg';

import './Card.css';

const Card=({image,flip,clickHandler})=>{
    return (
		<div className={flip?"flip card":"card"}>
			<img src={image.url} className="card-front" alt="image" />
			<img src={egg} className="card-back" onClick={()=>clickHandler(image)} alt="cover" />
		</div>
    );
}

export default Card;