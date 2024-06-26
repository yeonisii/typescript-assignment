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
    <div>
      <h1>Countries</h1>
      <ul>
        {countries.map((country) => (
          <li
            key={country.cca2}
            onClick={() => handleSelectCountries(country.cca2)}
            style={{
              cursor: "pointer",
              backgroundColor: selectedCountries.has(country.cca2)
                ? "lightblue"
                : "white",
            }}
          >
            {country.name.common} - {country.capital?.[0] || "No capital"}
          </li>
        ))}
      </ul>
    </div>
  );
}
