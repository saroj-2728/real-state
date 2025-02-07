import { useState } from 'react'

const Sell = () => {

    const [propertyDetails, setPropertyDetails] = useState({
        ownerName: '',
        propertyLocation: '',
        propertyType: '',
        propertyTitle: '',
        phoneNumber: '',
        price: '',
        description: '',
        propertyImage: '',
        propertyFeatures: ''
    })

    const [message, setMessage] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target
        setPropertyDetails(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(propertyDetails)
        setMessage("Property Posted Successfully")
        setTimeout(() => {
            setMessage("")
        }, 3000);
    }

    return (
        <div className='sell-tab scrollbar-hidden'>
            <h1>Property Details</h1>

            <form
                className=''
                onSubmit={handleSubmit}
            >
                <div className="form-group">
                    <div className="property-details">
                        <div className="form-field">
                            <input
                                type="text"
                                name='ownerName'
                                value={propertyDetails.ownerName}
                                placeholder="Owner's Name"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-field">
                            <select
                                name="propertyLocation"
                                value={propertyDetails.propertyLocation}
                                onChange={handleChange}
                            >
                                <option value="">Property Location</option>
                                <option value="apartment">Apartment</option>
                                <option value="house">House</option>
                                <option value="commercial">Commercial</option>
                                <option value="land">Land</option>
                            </select>
                        </div>
                        <div className="form-field">
                            <input
                                type="text"
                                name='propertyTitle'
                                value={propertyDetails.propertyTitle}
                                placeholder="Property Title"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-field">
                            <input
                                type="text"
                                name='phoneNumber'
                                placeholder="Phone Number"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-field">
                            <input
                                type="text"
                                name='price'
                                value={propertyDetails.price}
                                placeholder="Price ($)"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-field">
                            <select
                                name="propertyType"
                                value={propertyDetails.propertyType}
                                onChange={handleChange}
                            >
                                <option value="">Property Type</option>
                                <option value="apartment">Apartment</option>
                                <option value="house">House</option>
                                <option value="commercial">Commercial</option>
                                <option value="land">Land</option>
                            </select>
                        </div>
                    </div>

                    <div className='property-description'>
                        <div className="form-field">
                            <label htmlFor="description">Property Description</label>
                            <textarea
                                id='description'
                                name='description'
                                value={propertyDetails.description}
                                placeholder="Describe your property here"
                                onChange={handleChange}
                                rows={4}></textarea>
                        </div>

                        <div className="form-field">
                            <label htmlFor="property-image">Property Photo</label>
                            <input
                                type="file"
                                id="property-image"
                                accept="image/*"
                                multiple
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="property-features">Property Main Features</label>
                            <input
                                id='property-features'
                                name='propertyFeatures'
                                value={propertyDetails.propertyFeatures} placeholder="Highlight the main components"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                {message &&
                    <div className='confirmation-message'>
                        <p>{message}</p>
                    </div>
                }

                <div>
                    <button
                        className='submit-btn'
                    >
                        Post the Property
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Sell
