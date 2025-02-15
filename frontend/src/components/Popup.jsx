/* eslint-disable react/prop-types */
import { IoMdClose } from "react-icons/io"
import '../styles/popup.css'

const Popup = ({message, showPopup, setShowPopup }) => {

    if (!showPopup) return null

    return (
        <div className="popup-container">
            <div className="popup-message">
                <p>{message}</p>
                <IoMdClose
                    className="close-icon-popup"
                    onClick={() => setShowPopup(false)}
                />
            </div>
        </div>
    )
}

export default Popup
