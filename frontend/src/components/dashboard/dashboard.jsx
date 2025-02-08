import '../../styles/dashboard.css';
import { FaHome } from "react-icons/fa";
import Buy from './buy';
import Sell from './sell';
import { useState } from 'react';

const Dashboard = () => {
  const [tab, setTab] = useState("Buy");

  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <img
            src="/images/logo.png" alt="Logo"
            className='logo-img'
          />
          <p className='logo-text'>ORIGIN HOMES</p>
        </div>

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
            <p>Property Type: </p>
            <div className='filter-options'>
              <div className='filter-option'>
                <FaHome className='filter-icon' />
              </div>
              <div className='filter-option'>
                <FaHome className='filter-icon' />
              </div>
              <div className='filter-option'>
                <FaHome className='filter-icon' />
              </div>
            </div>

            <div className='location-filter'>
              <p>Location: </p>
              <select className='location-select'>
                <option value="pokhara">Pokhara</option>
                <option value="kathmandu">Kathmandu</option>
                <option value="location3">Location3</option>
                <option value="location4">Location4</option>
              </select>
            </div>

            <div className='price-filter'>
              <p>Price Range: </p>
              <select className='price-select'>
                <option value="1">1 crore</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>
        }


        <main className="main-content">
          {tab === "Buy" && <Buy />}
          {tab === "Sell" && <Sell />}
        </main>
      </div>
    </div>
  )
}

export default Dashboard
