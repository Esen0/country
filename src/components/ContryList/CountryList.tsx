import React from 'react';

interface Country {
  alpha3Code: string;
  name: string;
}

interface CountryListProps {
  countries: Country[];
  onSelectCountry: (code: string) => void;
}

const CountryList: React.FC<CountryListProps> = ({ countries, onSelectCountry }) => {
  return (
    <div className="country-list">
      <h2>Countries</h2>
      <ul>
        {countries.map((country) => (
          <li key={country.alpha3Code} onClick={() => onSelectCountry(country.alpha3Code)}>
            {country.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;