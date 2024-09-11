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
                    2022 PHILIPPINE NATIONAL ELECTION | PRESIDENT RACE
            </div>
        </Header>
    );
};

export default HeaderLayout;