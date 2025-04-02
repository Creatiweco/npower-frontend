import { Link } from 'react-router-dom';

const Hero = ({ heroData}) => {
  if (!heroData) return null;

  const items = heroData.HeroItem || [];

  return (
    <div className="hero-section">
      <h1>{heroData.MainTitle}</h1>
      <div className="container hero-container">
        <div className="hero-grid">
          {items.map((item) => (
            <Link
              to={`/${item.Link}`}
              className="hero-item"
              key={item.id}
              style={{ backgroundImage: `url(${item.Background[0]?.url})` }}
            >
              <p>{item.Title}</p>
              {item.Description?.map((desc, index) => (
                <p className="hero-desc" key={index}>
                  {desc.children?.map((child, childIndex) => child.text)}
                </p>
              ))}
              {item.Image?.[0] && <img src={item.Image[0].url} alt={item.Title} />}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
