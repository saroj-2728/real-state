import '../styles/navbar.css';
// import { useState } from 'react';

const Navbar = () => {

    // const [tab, setTab] = useState("Buy");

    return (
        <nav>
            <div className="logo">
                <img
                    src="/images/logo.png" alt="Logo"
                    className='logo-img'
                />
                <p className='logo-text'>ORIGIN HOMES</p>
            </div>

            <div className="tabs">
                <ul>
                    <li>Buy</li>
                    <li>Sell</li>
                    <li>Rent</li>
                    <li>Rent Out</li>
                </ul>
                <div>
                    <input type="text" placeholder="Search..." />
                    <button>Search</button>
                </div>
            </div>

            

        </nav>
    )
}

export default Navbar
