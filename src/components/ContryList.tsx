import { useState, useEffect } from "react";
import { Countries } from "../api/Countries";
import { Country } from "../types/County";
import CountryCard from "./CountryCard";
import "./CountryListStyle.css";

export default function CountryList() {
  //상태 지정
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  // 컴포넌트가 마운트 될 때 api호출
  useEffect(() => {
    const getCountries = async () => {
      try {
        const data = await Countries();
        setCountries(data);
      } catch (err) {
        setError("나라를 찾을 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };
    getCountries();
  }, []);

  // 국가 선택/해제
  const handleSelectCountries = (cca2: string) => {
    setSelectedCountries((prev) => {
      if (prev.includes(cca2)) {
        return prev.filter((countryCode) => countryCode !== cca2);
      } else {
        return [...prev, cca2];
      }
    });
  };

  // 로딩 상태

  if (loading) {
    return <div>로딩중...</div>;
  }

  // 에러 상태
  if (error) {
    return <div>{error}</div>;
  }

  // 선택된 국가와 선택되지 않은 국가를 분리
  const favoriteCountries = countries.filter((country) =>
    selectedCountries.includes(country.cca2)
  );
  const otherCountries = countries.filter(
    (country) => !selectedCountries.includes(country.cca2)
  );

  // 국가 리스트 랜더링
  return (
    <div className="countryListbox">
      <h1 className="countryTitle">My Favorite Countries</h1>
      <ul className="countryGrid">
        {favoriteCountries.map((country) => (
          <CountryCard
            key={country.cca2}
            country={country}
            isSelected={selectedCountries.includes(country.cca2)}
            onSelect={handleSelectCountries}
          />
        ))}
      </ul>
      <h1 className="countrylistTitle">Countries</h1>
      <ul className="countryGrid">
        {otherCountries.map((country) => (
          <CountryCard
            key={country.cca2}
            country={country}
            isSelected={selectedCountries.includes(country.cca2)}
            onSelect={handleSelectCountries}
          />
        ))}
      </ul>
    </div>
  );
}
