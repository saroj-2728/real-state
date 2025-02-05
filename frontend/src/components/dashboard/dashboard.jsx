import '../../styles/dashboard.css';
import { useState } from 'react';
import { FaHome } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

const Dashboard = () => {
  // const [tab, setTab] = useState("Buy");
  const [viewSidePanel, setViewSidePanel] = useState(false)

  const handleClick = () => {
    setViewSidePanel(false)
  }

  const handleViewPanel = () => {
    setViewSidePanel(true)
  }

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
            <li>Buy</li>
            <li>Sell</li>
            <li>Rent</li>
            <li>Rent Out</li>
          </ul>
          <div className='search'>
            <input className='searchBar' type="text" placeholder="Search..." />
          </div>
        </div>
        <div className='heart'>
          <img className='heart-img' src="/images/heart.png" alt="" />
        </div>
      </nav>

      <div className="container">
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


        <main className="main-content">
          <div className='card-container'>
            {
              Array(20).fill(0).map((_, i) => (
                <div
                  key={i}
                  className="card"
                  onClick={handleViewPanel}
                >
                  <img src="/images/image_villa.png" alt="Villa" />
                  <div className="card-content">
                    <h3>House for Sale</h3>
                    <p>Price: Rs. 1,00,00,000</p>
                    <p>Location: Pokhara</p>
                    <p>Area: 1000 sq. ft.</p>
                  </div>
                </div>
              ))
            }
          </div>

          {viewSidePanel &&
            <div className="side-panel">
              <button
                type='button'
                onClick={handleClick}
              >
                <IoIosClose className='close-button' />
              </button>
              <img src="/images/image_villa.png" alt="" />
              <div className='side-info'>
                <div className="side-panel-name">
                  <h1>TriVilla Pokhara-8</h1>
                  <h2>$ 3.4 Cr.</h2>
                </div>
                <div className="side-panel-tags">
                  <p>3 BHK</p>
                  <p>3 Bath</p>
                  <p>2 Parking</p>
                  <p>2 Parking</p>
                </div>
                <p className='side-panel-description'>TriVilla is a luxurious villa with a beautiful view of the mountains. It is located in Pokhara-8 and is a perfect place for a family.</p>
                <div className="side-panel-contact">
                  <p>Owner: Sushim Ruphakheti </p>
                  <p>Contact: 9841XXXXXX</p>
                </div>
              </div>
            </div>
          }
        </main>
      </div>
    </div>
  )
}

export default Dashboard
