/* eslint-disable react/prop-types */

const Logo = ({styles}) => {
    return (
        <div style={styles} className="logo">
            <img
                src="/images/logo.png" alt="Logo"
                className='logo-img'
            />
            <p className='logo-text'>ORIGIN HOMES</p>
        </div>
    )
}

export default Logo
