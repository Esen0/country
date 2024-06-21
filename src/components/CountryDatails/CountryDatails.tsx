import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface CountryDetailsProps {
  countryCode: string | null;
}

interface Country {
  name: string;
  capital: string;
  population: number;
  borders: string[];
  flag: string;  // Добавлено поле для флага
}

const CountryDetails: React.FC<CountryDetailsProps> = ({ countryCode }) => {
  const [country, setCountry] = useState<Country | null>(null);
  const [borderCountries, setBorderCountries] = useState<string[]>([]);

  useEffect(() => {
    if (countryCode) {
      const fetchCountry = async () => {
        try {
          const response = await axios.get<Country>(`https://restcountries.com/v2/alpha/${countryCode}`);
          setCountry(response.data);

          if (response.data.borders.length > 0) {
            const borderResponses = await Promise.all(
              response.data.borders.map((borderCode) => axios.get<{ name: string }>(`https://restcountries.com/v2/alpha/${borderCode}`))
            );
            setBorderCountries(borderResponses.map((res) => res.data.name));
          } else {
            setBorderCountries([]);
          }
        } catch (error) {
          console.error('Error fetching country:', error);
        }
      };

      fetchCountry();
    }
  }, [countryCode]);

  if (!countryCode) {
    return <div className="country-details">Please select a country</div>;
  }

  if (!country) {
    return <div className="country-details">Loading...</div>;
  }

  return (
    <div className="country-details">
      <h2>{country.name}</h2>
      <img src={country.flag} alt={`Flag of ${country.name}`} className="flag" /> {/* Добавлено отображение флага */}
      <p><strong>Capital:</strong> {country.capital}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Borders:</strong> {borderCountries.length > 0 ? borderCountries.join(', ') : 'None'}</p>
    </div>
  );
};

export default CountryDetails;