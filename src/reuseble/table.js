import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Table, Image, Button, Typography, Space } from 'antd';
import SelectAddress from './selectAddress.js';
import { SearchData, SelectDataforPandVP } from './search.js';

const { Title } = Typography;

function DataTable() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [defaultRole, setDefaultRole] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [selectedLocation, setSelectedLocation] = useState({
        country: '',
        groupOfIsland: '',
        region: '',
        province: '',
        city: '',
        barangay: '',
    });

    const [locationFilter, setlocationFilter] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.PUBLIC_URL}/mock/data.json`)
            .then((res) => {
                setData(res.data.Users);
                setFilteredData(res.data.Users);
            })
            .catch((err) => {
                console.error('Error fetching the data:', err);
            });
    }, []);

    const filterData = () => {
        const { country, groupOfIsland, region, province, city, barangay } = selectedLocation;

        const filtered = data.filter((user) => {
            const matchesRole = defaultRole ? user.for === defaultRole : true;
            const matchesSearch = user.candidates.some(candidate =>
                candidate.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
                candidate.lastName.toLowerCase().includes(searchInput.toLowerCase())
            );

            const matchesLocation = (
                (!country || user.address.country === country) &&
                (!groupOfIsland || user.address.groupOfIsland === groupOfIsland) &&
                (!region || user.address.region === region) &&
                (!province || user.address.province === province) &&
                (!city || user.address.city === city) &&
                (!barangay || user.address.barangay === barangay)
            );

            return matchesRole && matchesSearch && matchesLocation;
        });

        setFilteredData(filtered);
    };

    
    useEffect(() => {
        filterData();
    }, [data, defaultRole, searchInput, selectedLocation]);

    const handleRoleChange = (value) => {
        setDefaultRole(value);
    };
    
    const handleCandidateChange = (value) => {
    };
    
    const handleSearchInputChange = (value) => {
        setSearchInput(value);
    };

    
    const normalReverse = [
        {
            title: '',
            dataIndex: 'profile',
            key: 'profile',
            render: (dataIndex) => {
                return <Image style={{ borderRadius: '5px' }} width={100} height={80} src={`${process.env.PUBLIC_URL}/${dataIndex}`} />;
            },
            width: 110,
        },
        {
            title: 'Candidates',
            dataIndex: 'candidates',
            key: 'candidates',
            render: (dataIndex) => (
                <>
                {dataIndex.map((candidate, index) => (
                    <span key={`${candidate.firstName}-${candidate.lastName}-${index}`}>
                        {candidate.firstName} {candidate.lastName}
                    </span>
                ))}
              </>
            ),
            width: 300,
        },
        {
            title: 'Votes',
            dataIndex: 'result',
            key: 'result',
            render: (dataIndex) => {
                const totalVotes = dataIndex.reduce((acc, item) => acc + item.votes, 0);
                return <>{totalVotes.toLocaleString()}</>;
            },
            width: 300,
        },
        {
            title: 'For',
            dataIndex: 'for',
            key: 'for',
            width: 100,
        },
    ];

    const reverse = [
        {
            title: '',
            dataIndex: 'profile',
            key: 'profile',
            render: (dataIndex) => {
                return <Image style={{ borderRadius: '5px' }} width={100} height={80} src={`${process.env.PUBLIC_URL}/${dataIndex}`} />;
            },
            width: 110,
        },
        {
            title: 'Candidates',
            dataIndex: 'candidates',
            key: 'candidates',
            render: (dataIndex) => (
                <>
                    {dataIndex.map((item, index) => (
                        <span key={`${item.firstName}-${item.lastName}-${index}`}>
                            {[...item.firstName].reverse().join('')} {[...item.lastName].reverse().join('')}
                        </span>
                    ))}
                </>
            ),
            width: 300,
        },
        {
            title: 'Votes',
            dataIndex: 'result',
            key: 'result',
            render: (dataIndex) => {
                const totalVotes = [dataIndex.reduce((acc, item) => acc + item.votes, 0)];
                return <>{[...totalVotes.toLocaleString()].reverse().join('')}</>;
            },
            
            width: 300,
        },
        {
            title: 'For',
            dataIndex: 'for',
            key: 'for',
            render: (dataIndex) => <>{[...dataIndex].reverse().join('')}</>,
            width: 100,
        },
    ];

    const [columns, setColumns] = useState(normalReverse);
    const [show, setShow] = useState(false);

    const onColumn = (value) => {
        setColumns(value === reverse ? reverse : normalReverse);
    };

    const changeButton = () => {
        setShow(!show);
    };
    
    console.log("asas", locationFilter)

    return (
        <>
            <Title level={5}>Search Role and Candidates</Title>
            <Space wrap>
                <SelectDataforPandVP
                    data={data}
                    setData={(newData) => {
                        handleRoleChange(newData);
                        setFilteredData(newData);
                    }}
                    defaultValue={setDefaultRole}
                    placeholder={"Select Role"}
                />
                <SearchData 
                    materials={data} 
                    setData={(newData) => {
                        handleCandidateChange(newData);
                        setFilteredData(newData);
                    }}
                    placeholder="Search Candidates" 
                    defaultRole={defaultRole} 
                    onChange={handleSearchInputChange} // Handle input changes
                    locationFilter={locationFilter} // Pass the location filter funct
                />
            </Space>

            <SelectAddress 
                materials={data} 
                setMaterialsData={setFilteredData}
                defaultRole={defaultRole}
                onChange={setSelectedLocation} // Update the selected 
                setlocationFilter={setlocationFilter}
            />

            <Table dataSource={filteredData} columns={columns} rowKey="key" />
            <Title level={5}>Reverse Data</Title>
            {show
                ? <Button onClick={() => [onColumn(normalReverse), changeButton()]}>Back to Normal String</Button>
                : <Button onClick={() => [onColumn(reverse), changeButton()]}>Reverse String</Button>
            }
        </>
    );
}

export default DataTable;
