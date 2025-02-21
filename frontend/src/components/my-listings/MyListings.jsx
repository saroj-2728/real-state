/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import '../../styles/my-listings.css'
import PropertyCard from "../PropertyCard"

const MyListings = ({isSellListings = true, setIsUpdating, setShowListings, setPropertyDetails}) => {

    const SERVER_ROOT = import.meta.env.VITE_SERVER_ROOT
    const user = JSON.parse(localStorage.getItem('user'))

    const [properties, setProperties] = useState([])
    const [isFetching, setIsFetching] = useState(true)

    useEffect(() => {
        // Fetch all properties listed by the seller
        const fetchProperties = async () => {
            try {
                setIsFetching(true)
                const response = await fetch(`${SERVER_ROOT}/api/${isSellListings ? "property" : "rentalProperty"}/seller/${user.id}`)
                const data = await response.json()

                if (!data.success) {
                    console.error(data.error || data.message || 'Failed to fetch properties')
                    return
                }

                setProperties(data.property)
            }
            catch (error) {
                console.log(error)
            }
            finally {
                setIsFetching(false)
            }
        }
        fetchProperties()
    }, [user.id, SERVER_ROOT, isSellListings])

    const handleEdit = (id) => {
        console.log('Edit property:', id);
        setIsUpdating(true);
        setShowListings(false);
        setPropertyDetails(properties.find(property => property.id === id));
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${SERVER_ROOT}/api/${isSellListings ? "property" : "rentalProperty"}/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
    
            if (data.success) {
                // Remove the deleted property from the state
                setProperties(properties.filter(property => property.id !== id));
            } else {
                console.error(data.error || data.message || 'Failed to delete property');
            }
        } catch (error) {
            console.error('Error deleting property:', error);
        }
    };

    return (
        <div className="my-listings-component">
            <h1 className="my-listings-title">My Listings</h1>
            <h2 className="my-listings-subtitle">Manage your property.</h2>

            <div className="my-listings-container">
                <div className="my-listings">
                    {isFetching ?
                        <p>Loading... Please wait!</p>
                        :
                        properties?.length === 0 ?
                            <p>No properties listed yet.</p>
                            :
                            properties?.map(property => (
                                <PropertyCard
                                    key={property.id}
                                    property={property}
                                    showStatus={true}
                                    onClick={(e) => { console.log(e) }}
                                    onDelete={handleDelete}
                                    onEdit={handleEdit}
                                />
                            ))
                    }
                </div>
            </div>
        </div>
    )
}

export default MyListings
