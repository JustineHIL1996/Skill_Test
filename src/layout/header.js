import React from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

const HeaderLayout = () => {
  return (
        <Header
            style={{
            display: 'flex',
            alignItems: 'center',
            }}
        >
            <div 
                style={{
                    color:'white', 
                    fontWeight:'bold'
                }}> 
                    2022 PHILIPPINE NATIONAL ELECTION | PRESIDENT AND VICE-PRESIDENT RACE
            </div>
        </Header>
    );
};

export default HeaderLayout;