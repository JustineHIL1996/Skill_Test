import React , { useEffect, useState } from 'react';
import { Table, Image, Button, Divider  } from 'antd';
import { dataUser } from '../dataSource/user.js';

import Location from './location.js';
import { DataSearch } from './search.js';

function DataTable() {

    const [data, setData] = useState([]);
    const [userMaterials, setUserMaterials] = useState([]);
    const [locationMaterials, setLocationMaterials] = useState([]);

    useEffect(() => {
        setData(dataUser);
        setUserMaterials(dataUser);                      
        setLocationMaterials(dataUser);
        // eslint-disable-next-line 
    },[dataUser])

    const normalReverse = [
        {
            title: '',
            dataIndex: 'profile',
            key: 'profile',
            render: (dataIndex) => <Image style={{borderRadius:'100px'}} width={70} height={70} src={dataIndex}/>,
            width: 110
        },
        {
            title: 'Candidates',
            dataIndex: 'candidates',
            key: 'candidates',
            width: 300
        },
        {
            title: 'Votes',
            dataIndex: 'result',
            key: 'result',
            render: (dataIndex) => <>{dataIndex.map(item => item.votes).reduce((a, b) => a + b).toLocaleString()}</>,
            width: 300,
        },
        {
            title: 'For',
            dataIndex: 'for',
            key: 'for',
            width: 100
        },
    ];

    const reverse = [
        {
            title: '',
            dataIndex: 'profile',
            key: 'profile',
            render: (dataIndex) => <Image style={{borderRadius:'100px'}} width={70} height={70} src={dataIndex}/>,
            width: 110
        },
        {
            title: 'Candidates',
            dataIndex: 'candidates',
            key: 'candidates',
            render: (dataIndex) => <>{[...dataIndex].reverse().join('')}</>,
            width: 300
        },
        {
            title: 'Votes',
            dataIndex: 'result',
            key: 'result',
            render: (dataIndex) => <>{[...dataIndex.map(item => item.votes).reduce((a, b) => a + b).toLocaleString()].reverse().join('')   }</>,
            width: 300,
        },
        {
            title: 'For',
            dataIndex: 'for',
            key: 'for',
            render: (dataIndex) => <>{[...dataIndex].reverse().join('')}</>,
            width: 100
        },
    ];

    const [columns, setColumns] = useState(normalReverse);
    const [show, setShow] = useState(false);
    
    const onColumn = (value) => {
        if(value === reverse) {
            setColumns(reverse);
        } else {
            setColumns(normalReverse);
        }
    };

    const changeButton = () => {
      setShow(!show);
    }

    return (
        <>  
            <Divider orientation="left"> Seacr Candicates </Divider>
            <DataSearch materials={userMaterials} setData={setData} placeholder="Search Candidates"/>

            <Divider orientation="left"> Seacr Location </Divider>
            <Location materials={locationMaterials} setData={setData}/>

            <Table dataSource={data} columns={columns}/>

            <Divider orientation="left"> Reverse Data </Divider>
            {show
                ?  <Button onClick={() => [onColumn(normalReverse), changeButton()]}> Back to Normal String </Button>
                :  <Button onClick={() => [onColumn(reverse), changeButton()]}> Reverse String </Button>
            }
        </>
    );
}

export default DataTable;






