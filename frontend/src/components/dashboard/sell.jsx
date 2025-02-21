/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react'
import MyListings from '../my-listings/MyListings';
import { validateForm } from '../../utils/validatePropertyForm';

const Sell = ({ isSellComponent = true }) => {

    const SERVER_ROOT = import.meta.env.VITE_SERVER_ROOT;

    const user = JSON.parse(localStorage.getItem('user'))

    const [propertyDetails, setPropertyDetails] = useState({
        ownerName: '',
        propertyLocation: '',
        propertyType: '',
        propertyTitle: '',
        phoneNumber: '',
        price: '',
        description: '',
        propertyFeatures: ''
    })
    const [propertyImage, setPropertyImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [showListings, setShowListings] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)

    const [message, setMessage] = useState("")
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const fileInputRef = useRef(null)
    const MAX_FILE_SIZE = 1024 * 1024 * 5

    useEffect(() => {
        if (isUpdating) {
            setShowListings(false)
        }
    }, [isUpdating])

    const handleChange = (e) => {
        const { name, value } = e.target
        setPropertyDetails(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPropertyImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors({})

        const errors = validateForm(propertyDetails, propertyImage, MAX_FILE_SIZE);
        setErrors(errors || {});

        if (errors) {
            console.log("Validation errors: ", errors);
            return;
        }

        const formData = new FormData();
        // Append all property details
        Object.entries(propertyDetails).forEach(([key, value]) => {
            formData.append(key, value);
        });
        // Append the image
        formData.append("propertyImage", propertyImage);
        if (!isUpdating) formData.append("sellerId", user.id); // Append user ID if it isn't already, that is when updating

        try {
            setIsLoading(true)
            let response;
            if (isUpdating) {
                response = await fetch(`${SERVER_ROOT}/api/${isSellComponent ? "property" : "rentalProperty"}/update/${propertyDetails.id}`, {
                    method: 'PUT',
                    body: formData
                })
            }
            else {
                response = await fetch(`${SERVER_ROOT}/api/${isSellComponent ? "property/sell" : "rentalProperty/rentout"}`, {
                    method: 'POST',
                    body: formData
                })
            }
            const data = await response.json()

            if (!data.success) {
                setErrors(prev => ({
                    ...prev,
                    serverError: data.error || data.message
                }));
                return
            }

            setMessage(isUpdating ? "Property updated successfully" : "Property posted successfully")

            setTimeout(() => {
                setMessage("")
                setPropertyDetails({
                    ownerName: '',
                    propertyLocation: '',
                    propertyType: '',
                    propertyTitle: '',
                    phoneNumber: '',
                    price: '',
                    description: '',
                    propertyFeatures: ''
                })
                setImagePreview(null)
                setPropertyImage(null)
                setIsUpdating(false)
            }, 2000);
        }
        catch (error) {
            console.log(error)
            setErrors(prev => ({
                ...prev,
                serverError: "An error occured. Please try again."
            }))
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='sell-tab scrollbar-hidden'>
            {!showListings &&
                <>
                    <div className='sell-header'>
                        <p style={{
                            visibility: "hidden",
                        }}
                        >
                            This text is hidden
                        </p>
                        <h1>Property Details</h1>
                        <button
                            className='go-to-listings'
                            onClick={() => {
                                setShowListings(true);
                                setIsUpdating(false)
                            }}
                        >
                            My Listings
                        </button>
                    </div>

                    <form
                        className=''
                        onSubmit={handleSubmit}
                    >
                        <div className="form-group">
                            <div className="property-details">
                                <div className="sell-form-field">
                                    <input
                                        type="text"
                                        name='ownerName'
                                        value={propertyDetails.ownerName}
                                        placeholder="Owner's Name"
                                        onChange={handleChange}
                                    />
                                    {errors.ownerName &&
                                        <p className="sell-error-message">{errors.ownerName}</p>
                                    }
                                </div>
                                <div className="sell-form-field">
                                    <select
                                        name="propertyLocation"
                                        value={propertyDetails.propertyLocation}
                                        onChange={handleChange}
                                    >
                                        <option value="">Property Location</option>
                                        <option value="Kathmandu">Kathmandu</option>
                                        <option value="Pokhara">Pokhara</option>
                                        <option value="Palpa">Palpa</option>
                                        <option value="Chitwan">Chitwan</option>
                                    </select>
                                    {errors.propertyLocation &&
                                        <p className="sell-error-message">{errors.propertyLocation}</p>
                                    }
                                </div>
                                <div className="sell-form-field">
                                    <input
                                        type="text"
                                        name='propertyTitle'
                                        value={propertyDetails.propertyTitle}
                                        placeholder="Property Title"
                                        onChange={handleChange}
                                    />
                                    {errors.propertyTitle &&
                                        <p className="sell-error-message">{errors.propertyTitle}</p>
                                    }
                                </div>
                                <div className="sell-form-field">
                                    <input
                                        type="text"
                                        name='phoneNumber'
                                        value={propertyDetails.phoneNumber}
                                        placeholder="Phone Number"
                                        onChange={handleChange}
                                    />
                                    {errors.phoneNumber &&
                                        <p className="sell-error-message">{errors.phoneNumber}</p>
                                    }
                                </div>
                                <div className="sell-form-field">
                                    <input
                                        type="text"
                                        name='price'
                                        value={propertyDetails.price}
                                        placeholder="Price ($)"
                                        onChange={handleChange}
                                    />
                                    {errors.price &&
                                        <p className="sell-error-message">{errors.price}</p>
                                    }
                                </div>
                                <div className="sell-form-field">
                                    <select
                                        name="propertyType"
                                        value={propertyDetails.propertyType}
                                        onChange={handleChange}
                                    >
                                        <option value="">Property Type</option>
                                        <option value="Apartment">Apartment</option>
                                        <option value="House">House</option>
                                        <option value="Commercial">Commercial</option>
                                        <option value="Land">Land</option>
                                    </select>
                                    {errors.propertyType &&
                                        <p className="sell-error-message">{errors.propertyType}</p>
                                    }
                                </div>
                            </div>

                            <div className='property-description'>
                                <div className="sell-form-field">
                                    <label htmlFor="description">Property Description</label>
                                    <textarea
                                        id='description'
                                        name='description'
                                        value={propertyDetails.description}
                                        placeholder="Describe your property here"
                                        onChange={handleChange}
                                        rows={4}></textarea>
                                    {errors.description &&
                                        <p className="sell-error-message">{errors.description}</p>
                                    }
                                </div>

                                <div className="sell-form-field">
                                    <label htmlFor="property-image">Property Photo</label>
                                    <input
                                        type="file"
                                        id="property-image"
                                        accept="image/*"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                        hidden
                                    />
                                    <div onClick={() => fileInputRef.current.click()} className="property-image-container">
                                        <img src={imagePreview || '/images/property_image_placeholder.png'} alt="Property image" />
                                    </div>
                                    {errors.propertyImage &&
                                        <p className="sell-error-message">{errors.propertyImage}</p>
                                    }
                                </div>

                                <div className="sell-form-field">
                                    <label htmlFor="property-features">Property Main Features</label>
                                    <input
                                        id='property-features'
                                        name='propertyFeatures'
                                        value={propertyDetails.propertyFeatures} placeholder="Main components separated by comma"
                                        onChange={handleChange}
                                    />
                                    {errors.propertyFeatures &&
                                        <p className="sell-error-message">{errors.propertyFeatures}</p>
                                    }
                                </div>
                            </div>
                        </div>

                        {message &&
                            <div className='confirmation-message'>
                                <p>{message}</p>
                            </div>
                        }

                        <div>
                            {errors.serverError &&
                                <p style={{ textAlign: "center" }} className='sell-error-message'>{errors.serverError}</p>
                            }
                            <button
                                disabled={isLoading}
                                className='submit-btn'
                            >
                                {isUpdating ? (isLoading ? "Updating..." : "Update the property") : (isLoading ? "Posting..." : "Post the property")}
                            </button>
                        </div>
                    </form>
                </>
            }

            {(showListings && !isUpdating) &&
                <MyListings
                    isSellListings={isSellComponent}
                    setIsUpdating={setIsUpdating}
                    setShowListings={setShowListings}
                    setPropertyDetails={setPropertyDetails}
                />
            }
        </div>
    )
}

export default Sell
