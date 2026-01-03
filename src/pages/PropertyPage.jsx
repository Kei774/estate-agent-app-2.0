import { useParams } from "react-router-dom";
import { useState } from "react";

function PropertyPage({ properties, favourites, setFavourites }) {
  const { id } = useParams();
  const [tab, setTab] = useState("description");

  const property = properties.find((p) => p.id === id);

  if (!property) {
    return <p>Property not found.</p>;
  }

  const isFavourite = favourites.includes(property.id);

  const toggleFavourite = () => {
    if (isFavourite) {
      setFavourites(favourites.filter((favId) => favId !== property.id));
    } else {
      setFavourites([...favourites, property.id]);
    }
  };

  return (
    <div className="property-page">
      <div className="property-hero">
        <img
          src={`/${property.picture}`}
          alt={property.type}
        />
      </div>

      <div className="property-info">
        <h2>{property.type}</h2>
        <p>{property.location}</p>

        <button className="fav-btn" onClick={toggleFavourite}>
          {isFavourite ? "Remove from favourites" : "Add to favourites"}
        </button>

        <div className="tabs">
          <button
            className={tab === "description" ? "active" : ""}
            onClick={() => setTab("description")}
          >
            Description
          </button>

          <button
            className={tab === "details" ? "active" : ""}
            onClick={() => setTab("details")}
          >
            Details
          </button>
        </div>

        <div className="tab-content">
          {tab === "description" && <p>{property.description}</p>}

          {tab === "details" && (
            <ul>
              <li>Bedrooms: {property.bedrooms}</li>
              <li>Price: £{property.price}</li>
              <li>Tenure: {property.tenure}</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );

}

export default PropertyPage;
