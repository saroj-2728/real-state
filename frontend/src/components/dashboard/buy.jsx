import {useState} from "react"
import { IoIosClose } from "react-icons/io"

const Buy = () => {

    const [viewSidePanel, setViewSidePanel] = useState(false)

    const handleClick = () => {
      setViewSidePanel(false)
    }
  
    const handleViewPanel = () => {
      setViewSidePanel(true)
    }
  
  return (
    <>
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
    </>
  )
}

export default Buy
