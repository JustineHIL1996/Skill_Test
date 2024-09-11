import React , { useEffect, useState } from 'react';
import { Space } from 'antd';

import { regions, provinces, cities, barangays } from 'select-philippines-address';
import { DataSelectRegion, DataSelectProvices, DataSelectCities, DataSelectBarangays } from './search.js';

const Location = ({materials, setData}) => {

    const [regionData, setRegion] = useState([]);
    const [provinceData, setProvince] = useState([]);
    const [cityData, setCity] = useState([]);
    const [barangayData, setBarangay] = useState([]);

    const [regionCode, setRegionCode] = useState("");
    const [provinceCode, setProvinceCode] = useState("");
    const [cityCode, setCityCode] = useState("");
    const [barangayCode, setBarangayCode] = useState("");

    // const [provinceDisabled, setprovinceDisabled] = useState(true);
    // const [cityDisabled, setcityDisabled] = useState(true);
    // const [barangayDisabled, setbarangayDisabled] = useState(true);

    const [fullAddress, setFullAddress] = useState([]);

    const region = () => {
        regions().then(response => {
            setRegion(response);
        });
    }

    const province = (value) => {
        setRegionCode(value);
        provinces(value).then(response => {
            setProvince(response);
            setCity([]);
            setBarangay([]);
        });
        //setprovinceDisabled(!provinceDisabled);
    }

    const city = (value) => {
        setProvinceCode(value);
        cities(value).then(response => {
            setCity(response);
        });
        //setcityDisabled(!cityDisabled);
    }

    const barangay = (value) => {
        setCityCode(value);
        barangays(value).then(response => {
            setBarangay(response);
        });
        //setbarangayDisabled(!barangayDisabled);
    }

    const brgy = (value) => {
        setBarangayCode(value);
    }

    const dataLocation = () => {
        let addressCode = regionCode + provinceCode + cityCode + barangayCode
        setFullAddress(addressCode)

        if (fullAddress?.length) {
            const tempData = materials.filter((item) => {
                return Object.values(item.result).join('').toLowerCase().includes(fullAddress.toLowerCase())
            })
            setData(tempData)
        } else {
            setData(materials)
        }
        console.log(addressCode)
    }

    useEffect(() => {
        region()
        dataLocation()
        // eslint-disable-next-line 
    }, [])

  return (
    <Space wrap style={{marginBottom: '30px'}}>
      <DataSelectRegion onChange={(e) => [province(e), dataLocation()]} onSelect={region} getData={regionData} placeholder="Select Region" />
      <DataSelectProvices onChange={(e) => [city(e), dataLocation()]} getData={provinceData} placeholder="Select Provices" />
      <DataSelectCities onChange={(e) => [barangay(e), dataLocation()]} getData={cityData} placeholder="Select Cities" /> 
      <DataSelectBarangays onChange={(e) => [brgy(e), dataLocation()]} getData={barangayData} placeholder="Select Cities" /> 
    </Space>
  );
}

export default Location;
