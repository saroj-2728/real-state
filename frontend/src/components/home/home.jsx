import '../../styles/home.css';

const Home = () => {
  return (
    <div
      className="home-container"
      style={{
        backgroundImage: "url('/images/villa 1.png')", 
        backgroundSize: "contain",
        backgroundPosition: "right", // Changed this line to move image up
        backgroundRepeat: "no-repeat",
        // border: "1px solid #000",
      }}
    >
      <header className="home-header">
        <div className="home-logo">ORIGIN HOMES</div>
        <nav>
          <a href="#contact">Contact Us</a>
          <a href="#about">About Us</a>
        </nav>
      </header>

      <div className="home-logo1">
        <img src="/images/logo.png" alt="Origin Homes Logo" />
      </div>

      <section className="home-hero">
        <div className="home-content">
          <h1>Find the property<br /> of Your dream in <br />Nepal.</h1>
          <p>
            “Successfully facilitated over 500 properties,<br />
            earning a reputation for trust, transparency, and <br />
            exceptional customer satisfaction.”
          </p>
          <a href="/auth">
            <button>Join Now</button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;