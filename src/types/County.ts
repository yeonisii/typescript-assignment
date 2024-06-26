export type CountryName = {
  common: string;
  official: string;
  nativeName?: {
    [key: string]: {
      official: string;
      common: string;
    };
  };
};

export type Country = {
  name: CountryName;
  cca2: string; //Country의 2글자 코드
  capital?: string[];
};
