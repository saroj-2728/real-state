import { useEffect, useState } from "react"
import '../../styles/my-listings.css'
import PropertyCard from "../PropertyCard"

const MyListings = () => {

    const SERVER_ROOT = import.meta.env.VITE_SERVER_ROOT
    const user = JSON.parse(localStorage.getItem('user'))

    const [properties, setProperties] = useState([])
    const [isFetching, setIsFetching] = useState(true)

    useEffect(() => {
        // Fetch all properties listed by the seller
        const fetchProperties = async () => {
            try {
                setIsFetching(true)
                const response = await fetch(`${SERVER_ROOT}/api/property/seller/${user.id}`)
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
    }, [user.id, SERVER_ROOT])


    return (
        <div className="my-listings-component">
            <h1 className="my-listings-title">My Listings</h1>
            <h2 className="my-listings-subtitle">Manage your property.</h2>

            <div className="my-listings-container">
                <div className="my-listings">
                    {isFetching ?
                        <p>Loading... Please wait!</p>
                        :
                        properties.length === 0 ?
                            <p>No properties listed yet.</p>
                            :
                            properties.map(property => (
                                <PropertyCard
                                    key={property.id}
                                    property={property}
                                    onClick={(e) => { console.log(e) }}
                                />
                            ))
                    }
                </div>
            </div>
        </div>
    )
}

export default MyListings
