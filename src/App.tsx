import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CountryList from './components/ContryList/CountryList';
import CountryDetails from './components/CountryDatails/CountryDatails';
import './App.css';

interface Country {
  alpha3Code: string;
  name: string;
}

const App: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get<Country[]>('https://restcountries.com/v2/all?fields=alpha3Code,name');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="app-container">
      <CountryList countries={countries} onSelectCountry={setSelectedCountryCode} />
      <CountryDetails countryCode={selectedCountryCode} />
    </div>
  );
};

export default App;