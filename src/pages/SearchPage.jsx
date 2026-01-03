import { useState } from "react";
import SearchForm from "../components/SearchForm";
import ResultsList from "../components/ResultsList";

function SearchPage({ properties, favourites, setFavourites }) {

  const [criteria, setCriteria] = useState({
    type: "",
    minPrice: "",
    maxPrice: "",
    minBeds: "",
    maxBeds: "",
    postcode: "",
  });

  const filteredProperties = properties.filter((property) => {
    if (criteria.type && property.type !== criteria.type) return false;

    if (criteria.minPrice && property.price < Number(criteria.minPrice))
      return false;

    if (criteria.maxPrice && property.price > Number(criteria.maxPrice))
      return false;

    if (criteria.minBeds && property.bedrooms < Number(criteria.minBeds))
      return false;

    if (criteria.maxBeds && property.bedrooms > Number(criteria.maxBeds))
      return false;

    if (
      criteria.postcode &&
      !property.location.toUpperCase().includes(criteria.postcode)
    )
      return false;

    return true;
  });

  return (
    <div className="search-page">
      <h2>Search Properties</h2>

      <h3>Favourites</h3>
      <ul>
        {favourites.length === 0 && <li>No favourites yet</li>}

        {favourites && favourites.map((id) => (
          <li key={id}>{id}</li>
        ))}
      </ul>

      <SearchForm criteria={criteria} setCriteria={setCriteria} />

      <ResultsList properties={filteredProperties} />
    </div>
  );

}

export default SearchPage;
