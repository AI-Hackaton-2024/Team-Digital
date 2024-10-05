import './Card.css';

function Card(props) {
    const {img , name , description} = props;
    return (
        <div className = "card">
            <div>
                <img className = "card-img" src = {img}/>
            </div>
            <div>
                <label className = 'card-name'>{name}</label>
                <label className = 'card-description'>{description}</label>
                <button>+ add</button>
            </div>
        </div>
    );
}

export default Card;
