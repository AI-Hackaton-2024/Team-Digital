import './Card.css';

function Card(props) {
    const { img, name, description } = props;
    return (
        <div className="card">
            <div className="image-container">
                <img className="card-img" src={img} alt={name} />
            </div>
            <div className="info-container">
                <label className="card-name">{name}</label>
                <label className="card-description">{description}</label>
                <button className="addButton">+ Add</button>
            </div>
        </div>
    );
}

export default Card;
