/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import { IoIosClose } from "react-icons/io"
import Popup from '../Popup';
import PropertyCard from "../PropertyCard";
import { getFormattedPrice } from "../../utils/getFormattedPrice";

const Buy = ({ filters }) => {

  const SERVER_ROOT = import.meta.env.VITE_SERVER_ROOT

  const [viewSidePanel, setViewSidePanel] = useState(false)
  const [properties, setProperties] = useState([])
  const [selectedProperty, setSelectedProperty] = useState({})
  const [isFetching, setIsFetching] = useState(true)
  const [isBuying, setIsBuying] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    // Fetch all unsold properties
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${SERVER_ROOT}/api/property/unsold`)
        const data = await response.json()
        setProperties(data)
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

  const filterProperties = (properties) => {
    return properties.filter(property => {
      const matchesType = !filters.propertyType || property.propertyType.toLowerCase() === filters.propertyType.toLowerCase();
      const matchesLocation = !filters.location || property.propertyLocation.toLowerCase() === filters.location.toLowerCase();
      const matchesPrice = !filters.priceRange || (+filters.priceRange === 100000001 ? +property.price >= 100000001 : +property.price < +filters.priceRange);

      return matchesType && matchesLocation && matchesPrice;
    });
  };

  const filteredProperties = filterProperties(properties);

  const handlePropertyBuy = async (propertyId) => {
    setIsBuying(true)

    try {
      const response = await fetch(`${SERVER_ROOT}/api/property/buy/${propertyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()

      if (data.success) {
        setProperties(properties.filter(property => property.id !== propertyId))
        setViewSidePanel(false)
        setShowPopup(true)
        setTimeout(() => {
          setShowPopup(false)
        }, 5000);
      }
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setIsBuying(false)
    }
  }

  return (
    <>
      <Popup
        message='Property bought successfully!'
        showPopup={showPopup}
        setShowPopup={setShowPopup}
      />
      <div className='card-container'>
        {
          isFetching ?
            <div className="fetch-loader">
              Loading... Please wait!
            </div>
            :
            filteredProperties.length > 0 ?
              filteredProperties.map((property, index) => (
                <PropertyCard
                  key={index}
                  property={property}
                  onClick={handleViewPanel}
                />
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
            disabled={isBuying}
            onClick={handleClick}
            className="buy-close-button"
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
            <div className="buy-button-container">
              <button
                className="buy-button"
                disabled={isBuying}
                type="button"
                onClick={() => handlePropertyBuy(selectedProperty.id)}
              >
                {isBuying ? 'Buying...' : 'Buy'}
              </button>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Buy