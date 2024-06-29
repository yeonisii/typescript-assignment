import React from "react";
import { Country } from "../types/County";
import "./CountryCard.css";

interface CountryCardProps {
  country: Country;
  isSelected: boolean;
  onSelect: (cca2: string) => void;
}

const CountryCard: React.FC<CountryCardProps> = ({
  country,
  isSelected,
  onSelect,
}) => {
  return (
    <li
      className={`country-card ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(country.cca2)}
    >
      <img
        className="country-img"
        src={country.flags.png}
        alt={`${country.name.common} flag`}
      />
      <h2 className="country-title">{country.name.common}</h2>
      <p className="country-content">{country.capital?.[0] || "No capital"}</p>
    </li>
  );
};

export default CountryCard;
