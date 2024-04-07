import React, { useState, useEffect } from 'react';
import './styles.css';
import icon from './globe-solid.svg'

export default function Country() {
    const [data, setData] = useState({
        error: true,
        data: []
    });
    const [selectedRegion, setSelectedRegion] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    async function fetchData() {
        try {
            const url = selectedRegion
                ? `https://restcountries.com/v3.1/region/${selectedRegion.toLowerCase()}`
                : 'https://restcountries.com/v3.1/all';

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("An error occurred");
            }

            const result = await response.json();
            console.log(result)

            setData({
                error: false,
                data: result
            });
        } catch (error) {
            console.log(error.message);
            setData({
                error: true,
                data: []
            });
        }
    }

    useEffect(() => {
        fetchData();
    }, [selectedRegion]);

    const handleRegionChange = (e) => {
        setSelectedRegion(e.target.value);
    };


    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredData = data.data.filter((country) => {
        return country.name.common.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const linkStyle = {
        color: "#ffff",
        textDecoration: "none"
    }

    return (
        <div className='global-container'>
            <div className="header">
                <h1>Where in the world ?</h1>
                <img src={icon} alt="" />
            </div>

            <div className="app-container">
                <div className="form">
                    <form action="">
                        <input type="text" placeholder='Search for a country 🔍' onChange={handleSearch} value={searchQuery} />
                    </form>
                    <select name="" id="" onChange={handleRegionChange}>
                        <option value="">Filter by Region </option>
                        <option value="Africa">Africa</option>
                        <option value="Americas">Americas</option>
                        <option value="Europe">Europe</option>
                        <option value="Asia">Asia</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                </div>

                <div className="country-container">
                    {data.error === false && filteredData.map((element, index) => (
                        <div key={index} className="pattern">
                            <img src={element.flags.png} alt="" />
                            <div className="country-data">
                                <h3>{element.name.common}</h3>
                                <div className="details">
                                    <p>Population: <span style={{ color: "#e0e0e0" }}>{element.population}</span></p>
                                    <p>Region : <span style={{ color: "#e0e0e0" }}>{element.region}</span></p>
                                    <p>Capital : <span style={{ color: "#e0e0e0" }}>{element.capital}</span></p>
                                    <a target='_blank' href={element.maps.googleMaps}>SEE ON THE MAP</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
