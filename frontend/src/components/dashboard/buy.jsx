/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import { IoIosClose } from "react-icons/io"

const Buy = ({ filter }) => {

  const SERVER_ROOT = import.meta.env.VITE_SERVER_ROOT

  const [viewSidePanel, setViewSidePanel] = useState(false)
  const [properties, setProperties] = useState([])
  const [selectedProperty, setSelectedProperty] = useState({})
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    // Fetch all unsold properties
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${SERVER_ROOT}/api/property/unsold`)
        const data = await response.json()
        setProperties(data)
        console.log(data);
      }
      catch (error) {
        console.log(error)
      }
      finally {
        setIsFetching(false)
      }
    }
    fetchProperties()
  }, [SERVER_ROOT])

  const handleClick = () => {
    setViewSidePanel(false)
  }

  const handleViewPanel = (propertyId) => {
    const selected = properties.find(property => property.id === propertyId)
    setSelectedProperty(selected)
    setViewSidePanel(true)
  }

  const getFormattedPrice = (price) => {
    switch (true) {
      case price < 100000:
        return `${price}`;
      case price >= 100000 && price < 10000000:
        return `${(price / 100000).toFixed(2)} Lakh`;
      case price >= 10000000:
        return `${(price / 10000000).toFixed(2)} Crore`;
    }
  }

  const filteredProperties = properties.filter((property) => {
    if (!filter) return true; // If no filter text, return all properties
    const lowerCaseFilter = filter.toLowerCase();
    return (
      property.propertyTitle.toLowerCase().includes(lowerCaseFilter) ||
      property.propertyLocation.toLowerCase().includes(lowerCaseFilter) ||
      property.propertyFeatures.toLowerCase().includes(lowerCaseFilter) ||
      property.propertyType.toLowerCase().includes(lowerCaseFilter) ||
      lowerCaseFilter === '100000001' ? +property.price >= 100000001 : +property.price < lowerCaseFilter
    );
  });

  return (
    <>
      <div className='card-container'>
        {
          isFetching ?
            <div className="fetch-loader">
              Loading... Please wait!
            </div>
            :
            filteredProperties.length > 0 ?
            filteredProperties.map((property, index) => (
                <div
                  key={index}
                  className="card"
                  onClick={() => handleViewPanel(property.id)}
                >
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
              ))
              :
              <div>
                No properties found.
              </div>
        }
      </div>

      {(viewSidePanel && selectedProperty) &&
        <div className="side-panel">
          <button
            type='button'
            onClick={handleClick}
          >
            <IoIosClose className='close-button' />
          </button>
          <img src={selectedProperty.propertyImage} alt="" />
          <div className='side-info'>
            <div className="side-panel-name">
              <h1>{selectedProperty.propertyTitle}, {selectedProperty.propertyLocation}</h1>
              <h2>Rs. {getFormattedPrice(selectedProperty.price)}</h2>
            </div>
            <div className="side-panel-tags">
              {selectedProperty.propertyFeatures.split(',').map((item, index) => (
                <p key={index}>
                  {item}
                </p>
              ))}
            </div>
            <p className='side-panel-description'>{selectedProperty.description}</p>
            <div className="side-panel-contact">
              <p>Owner: {selectedProperty.ownerName}</p>
              <p>Contact: {selectedProperty.phoneNumber}</p>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Buy
