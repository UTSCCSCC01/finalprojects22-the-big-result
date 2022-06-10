import './ServiceCard.css'

const ServiceCard = (props) => {
    return (
        <div className="service-card">
            <h3>{props.service}</h3>
        </div>
    )
}

export default ServiceCard;