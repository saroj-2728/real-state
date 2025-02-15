/* eslint-disable react/prop-types */
import { getFormattedPrice } from "../utils/getFormattedPrice"

const PropertyCard = ({ property, onClick }) => {
    return (
        <div
            className="card"
            style={{ position: 'relative' }}
            onClick={() => onClick(property.id)}
        >
            {property.status &&
                <p style={{
                    fontSize: '14px',
                    position: 'absolute',
                    top: '-16px',
                    right: '-2px',
                    padding: '3px 10px',
                    backgroundColor: property.status === 'onSale' ? 'green' : property.status === 'sold' ? 'red' : 'gray',
                    color: 'white',
                    borderRadius: '0 0 0 5px'
                }}>
                    {property.status}
                </p>
            }
            <img src={property.propertyImage} alt="Villa" />
            <div className="card-content">
                <p className="content-price">
                    Rs. {getFormattedPrice(property.price)}
                </p>
                <h4>{property.propertyTitle}, {property.propertyLocation}</h4>
                <p className="buy-property-features">{property.propertyFeatures}</p>
                <p className="buy-property-description">{property.description}</p>
            </div>
        </div>
    )
}

export default PropertyCard
