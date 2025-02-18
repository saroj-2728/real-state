/* eslint-disable react/prop-types */
import { getFormattedPrice } from "../utils/getFormattedPrice"
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

const PropertyCard = ({ property, showStatus = false, onClick, onEdit, onDelete }) => {
    return (
        <div
            className="card"
            style={{ position: 'relative' }}
            onClick={() => onClick(property.id)}
        >
            {showStatus &&
                <>
                    <MdOutlineEdit style={{
                        zIndex: '10',
                        position: 'absolute',
                        top: '-10px',
                        left: '-10px',
                        cursor: 'pointer',
                        color: 'black',
                        backgroundColor: 'white',
                        padding: '5px',
                        fontSize: '20px',
                        borderRadius: '50px'
                    }}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onEdit(property.id)
                        }}
                    />

                    <RiDeleteBin5Line style={{
                        zIndex: '10',
                        position: 'absolute',
                        bottom: '-10px',
                        right: '-10px',
                        cursor: 'pointer',
                        color: 'black',
                        backgroundColor: 'white',
                        padding: '5px',
                        fontSize: '20px',
                        borderRadius: '50px'
                    }}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onDelete(property.id)
                        }}
                    />


                    <p style={{
                        fontSize: '14px',
                        position: 'absolute',
                        top: '-14px',
                        right: '0px',
                        padding: '3px 10px',
                        backgroundColor: property.status === 'onSale' ? 'green' : property.status === 'sold' ? 'red' : 'gray',
                        color: 'white',
                        borderRadius: '0 5px 0 5px'
                    }}>
                        {property.status}
                    </p>
                </>
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
