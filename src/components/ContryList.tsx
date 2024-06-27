import { useState, useEffect } from "react";
import { Countries } from "../api/Countries";
import { Country } from "../types/County";

export default function CountryList() {
  //상태 지정
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCountries, setSelectedCountries] = useState<Set<string>>(
    new Set()
  );

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
      const newSelected = new Set(prev);
      if (newSelected.has(cca2)) {
        newSelected.delete(cca2);
      } else {
        newSelected.add(cca2);
      }
      return newSelected;
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

  // 국가 리스트 랜더링
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "20px", marginTop: "20px" }}>
        My favorite Countries
      </h1>
      <h1 style={{ textAlign: "center", fontSize: "25px", marginTop: "20px" }}>
        Countries
      </h1>
      <ul
        style={{
          marginTop: "20px",
          width: "600px",
          listStyleType: "none",
          padding: "0",
        }}
      >
        {countries.map((country) => (
          <li
            key={country.cca2}
            onClick={() => handleSelectCountries(country.cca2)}
            style={{
              cursor: "pointer",
              backgroundColor: selectedCountries.has(country.cca2)
                ? "lightblue"
                : "white",
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={country.flags.png}
              alt={`${country.name.common} flag`}
              style={{
                width: "100px",
                marginRight: "10px",
                height: "auto",
                borderRadius: "4px",
              }}
            />
            <div style={{ fontWeight: "bold" }}>{country.name.common}</div>
            <div style={{ marginLeft: "10px" }}>
              {country.capital?.[0] || "No capital"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
