import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import '../../styles/dashboard.css';
import { FaHome } from "react-icons/fa";
import { PiBuildingApartment } from "react-icons/pi";
import { LuLandPlot } from "react-icons/lu";
import Buy from './buy';
import Sell from './sell';
import Logo from '../logo';

const Dashboard = () => {

  const navigate = useNavigate()

  const [tab, setTab] = useState("Buy");

  const [filters, setFilters] = useState({
    propertyType: "",
    location: "",
    priceRange: ""
  });

  const handlePropertyTypeFilter = (type) => {
    setFilters(prev => ({
      ...prev,
      propertyType: prev.propertyType === type ? "" : type
    }));
  };

  const handleLocationFilter = (location) => {
    setFilters(prev => ({
      ...prev,
      location
    }));
  };

  const handlePriceFilter = (price) => {
    setFilters(prev => ({
      ...prev,
      priceRange: price
    }));
  };

  const clearFilters = () => {
    setFilters({
      propertyType: "",
      location: "",
      priceRange: ""
    });
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      navigate('/auth')
    }
  }, [navigate])

  return (
    <div>
      <nav className="navbar">
        <Logo />
        
        <div className="tabs">
          <ul className='tabs-list'>
            <li
              className={tab === "Buy" ? "active-tab" : ""}
              onClick={() => setTab("Buy")}
            >
              Buy
            </li>
            <li
              className={tab === "Sell" ? "active-tab" : ""}
              onClick={() => setTab("Sell")}
            >
              Sell
            </li>
            <li
              className={tab === "Rent" ? "active-tab" : ""}
              onClick={() => setTab("Rent")}
            >
              Rent
            </li>
            <li
              className={tab === "Rent Out" ? "active-tab" : ""}
              onClick={() => setTab("Rent Out")}
            >
              Rent Out
            </li>
          </ul>
          <div className='search'>
            <input className='searchBar' type="text" placeholder="Search..." />
          </div>
        </div>
        <div className='heart'>
          <img className='heart-img' src="/images/heart.png" alt="" />
        </div>
      </nav>

      <div className="container-dash">
        {
          (tab === "Buy" || tab === "Rent") &&
          <div className="filters">
            <h3>Filters</h3>
            <button
              className='clear-filters'
              onClick={clearFilters}
            >
              Clear Filters
            </button>
            <p className='property-type-filter'>Property Type: </p>
            <div className='filter-options'>
              <div
                onClick={() => handlePropertyTypeFilter('house')}
                className='filter-option'
                style={{
                  background: filters.propertyType === 'house' ? 'linear-gradient(to right, #FF5959, #737373)' : ''
                }}
              >
                <FaHome className='filter-icon' />
              </div>
              <div
                onClick={() => handlePropertyTypeFilter('apartment')}
                className='filter-option'
                style={{
                  background: filters.propertyType === 'apartment' ? 'linear-gradient(to right, #FF5959, #737373)' : ''
                }}
              >
                <PiBuildingApartment className='filter-icon' />
              </div>
              <div
                onClick={() => handlePropertyTypeFilter('land')}
                className='filter-option'
                style={{
                  background: filters.propertyType === 'land' ? 'linear-gradient(to right, #FF5959, #737373)' : ''
                }}
              >
                <LuLandPlot className='filter-icon' />
              </div>
            </div>

            <div className='location-filter'>
              <p>Location: </p>
              <select
                className='location-select'
                value={filters.location}
                onChange={(e) => handleLocationFilter(e.target.value)}
              >
                <option value="" disabled>Location</option>
                <option value="pokhara">Pokhara</option>
                <option value="kathmandu">Kathmandu</option>
                <option value="location3">Location3</option>
                <option value="location4">Location4</option>
              </select>
            </div>

            <div className='price-filter'>
              <p>Price Range: </p>
              <select
                 className='price-select'
                 value={filters.priceRange}
                 onChange={(e) => handlePriceFilter(e.target.value)}
              >
                <option value="" disabled>Price Range</option>
                <option value="100000">Upto 1 Lakh</option>
                <option value="10000000">Upto 1 Crore</option>
                <option value="100000000">Upto 10 Crore</option>
                <option value="100000001">Above 10 Crore</option>
              </select>
            </div>
          </div>
        }


        <main className="main-content">
          {tab === "Buy" && <Buy filters={filters} isBuyComponent={true} />}
          {tab === "Sell" && <Sell isSellComponent={true} />}
          {tab === "Rent" && <Buy filters={filters} isBuyComponent={false} />}
          {tab === "Rent Out" && <Sell isSellComponent={false} />}
        </main>
      </div>
    </div>
  )
}

export default Dashboard
