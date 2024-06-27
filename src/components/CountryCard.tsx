import React from "react";
import { Country } from "../types/County";

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
      onClick={() => onSelect(country.cca2)}
      style={{
        cursor: "pointer",
        backgroundColor: isSelected ? "lightblue" : "white",
        margin: "10px",
        padding: "20px",
        border: `2px solid ${isSelected ? "green" : "#ccc"}`,
        listStyleType: "none",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        width: "200px",
      }}
    >
      <img
        src={country.flags.png}
        alt={`${country.name.common} flag`}
        style={{ width: "100px", height: "auto", marginBottom: "10px" }}
      />
      <h2 style={{ fontSize: "18px", textAlign: "center" }}>
        {country.name.common}
      </h2>
      <p style={{ fontSize: "15px", textAlign: "center" }}>
        {country.capital?.[0] || "No capital"}
      </p>
    </li>
  );
};

export default CountryCard;
