import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Typography, Space } from 'antd';
import { SelectData, SelectDataAlternative } from './search.js';

const { Title } = Typography;

const SelectAddress = ({ materials, setMaterialsData, defaultRole, resetValues }) => {
  const [data, setData] = useState({ countrys: [] });
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedGroupOfIsland, setSelectedGroupOfIsland] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedBarangay, setSelectedBarangay] = useState('');

  useEffect(() => {
    axios.get(`${process.env.PUBLIC_URL}/mock/data.json`)
      .then((res) => {
        setData(res.data.Address[0]); // Access the first item of Address
      })
      .catch((err) => {
        console.error('Error fetching the data:', err);
      });
  }, []);

    // Build the complete address whenever selections change
    const address = `${selectedGroupOfIsland} ${selectedRegion} ${selectedProvince} ${selectedCity} ${selectedBarangay}`.trim();

    const filterDataByRole = useCallback((address) => {
        if (!address) {
            setMaterialsData(materials);
        } else {
            const filtered = materials.map(item => {
                const filteredResults = item.result.filter(result => 
                    result.address.includes(address) && (item.for === defaultRole || (item.for === (defaultRole || 'President')))
                );
                return { ...item, result: filteredResults };
            }).filter(item => item.result.length > 0);

            setMaterialsData(filtered);
            console.log(filtered, address);
        }
    }, [materials, defaultRole, setMaterialsData]);

    useEffect(() => {
        // Call filterDataByRole whenever the address changes
        filterDataByRole(address);
    }, [address, filterDataByRole]);

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
  };

  const handleGroupOfIslandChange = (value) => {
    setSelectedGroupOfIsland(value);
  };

  const handleRegionChange = (value) => {
    setSelectedRegion(value);
  };

  const handleProvinceChange = (value) => {
    setSelectedProvince(value);
  };

  const handleCityChange = (value) => {
    setSelectedCity(value);
  };

  const handleBarangayChange = (value) => {
    setSelectedBarangay(value);
  };

  const getCountry = useCallback(() => {
    return data.countrys || []; // Ensure it's an array
  }, [data]);

  const getGroups = useCallback(() => {
    const country = getCountry().find(country => country.name === selectedCountry);
    return country ? country.groups || [] : []; // Ensure it's an array
  }, [selectedCountry, getCountry]);

  const getRegions = useCallback(() => {
    const group = getGroups().find(group => group.name === selectedGroupOfIsland);
    return group ? group.regions || [] : []; // Ensure it's an array
  }, [selectedGroupOfIsland, getGroups]);

  const getProvinces = useCallback(() => {
    const region = getRegions().find(region => region.name === selectedRegion);
    return region ? region.provinces || [] : []; // Ensure it's an array
  }, [selectedRegion, getRegions]);

  const getCities = useCallback(() => {
    const province = getProvinces().find(province => province.name === selectedProvince);
    return province ? province.cities || [] : []; // Ensure it's an array
  }, [selectedProvince, getProvinces]);

  const getBarangays = useCallback(() => {
    const city = getCities().find(city => city.name === selectedCity);
    return city ? city.barangays || [] : []; // Ensure it's an array
  }, [selectedCity, getCities]);

  useEffect(() => {
    // Reset the selections when resetValues changes
    if (resetValues) {
        setSelectedCountry('');
        setSelectedGroupOfIsland('');
        setSelectedRegion('');
        setSelectedProvince('');
        setSelectedCity('');
        setSelectedBarangay('');
    }
}, [resetValues]);

  return (
    <>
      <Title level={5}>Select Country</Title>
      <Space wrap>
        <SelectData onChange={handleCountryChange} getData={getCountry()} placeholder="Select Country" />
      </Space>
      
      <Title level={5}>Select Group/Island</Title>
      <Space wrap>
        <SelectData onChange={handleGroupOfIslandChange} getData={getGroups()} placeholder="Select Group/Island" />
      </Space>

      <Title level={5}>Select Address</Title>
      <Space wrap style={{ marginBottom: 30 }}>
        <SelectData id={"region"} onChange={handleRegionChange} getData={getRegions()} placeholder="Select Region" />
        <SelectData id={"province"} onChange={handleProvinceChange} getData={getProvinces()} placeholder="Select Provinces" />
        <SelectData id={"city"} onChange={handleCityChange} getData={getCities()} placeholder="Select City" />
        <SelectDataAlternative id={"barangay"} onChange={handleBarangayChange} getData={getBarangays()} placeholder="Select Barangay" />
      </Space>
    </>
  );
};

export default SelectAddress;
