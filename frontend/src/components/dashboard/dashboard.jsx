import '../../styles/dashboard.css';
import { FaHome } from "react-icons/fa";
import { PiBuildingApartment } from "react-icons/pi";
import { LuLandPlot } from "react-icons/lu";
import Buy from './buy';
import Sell from './sell';
import { useState } from 'react';
import Logo from '../logo';

const Dashboard = () => {
  const [tab, setTab] = useState("Buy");
  const [filter, setFilter] = useState("")

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
          tab === "Buy" &&
          <div className="filters">
            <h3>Filters</h3>
            <button
              className='clear-filters'
              onClick={() => setFilter("")}
            >
              Clear Filters
            </button>
            <p className='property-type-filter'>Property Type: </p>
            <div className='filter-options'>
              <div
                onClick={() => setFilter('house')}
                className='filter-option'
                style={{
                  background: filter === 'house' ? 'linear-gradient(to right, #FF5959, #737373)' : ''
                }}
              >
                <FaHome className='filter-icon' />
              </div>
              <div
                onClick={() => setFilter('apartment')}
                className='filter-option'
                style={{
                  background: filter === 'apartment' ? 'linear-gradient(to right, #FF5959, #737373)' : ''
                }}
              >
                <PiBuildingApartment className='filter-icon' />
              </div>
              <div
                onClick={() => setFilter('land')}
                className='filter-option'
                style={{
                  background: filter === 'land' ? 'linear-gradient(to right, #FF5959, #737373)' : ''
                }}
              >
                <LuLandPlot className='filter-icon' />
              </div>
            </div>

            <div className='location-filter'>
              <p>Location: </p>
              <select
                className='location-select'
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
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
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
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
          {tab === "Buy" && <Buy filter={filter} />}
          {tab === "Sell" && <Sell />}
        </main>
      </div>
    </div>
  )
}

export default Dashboard
