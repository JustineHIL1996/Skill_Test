import React from 'react';
import { Layout, theme } from 'antd';
import HeaderLayout from '../layout/header.js';

import DataTable from '../reuseble/table.js';

const { Content } = Layout;

const ContentLayout = () => {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>

      <HeaderLayout/>

      <Content
        style={{
          padding: '48px 48px',
        }}
      >
        <Layout
          style={{
            padding: '24px 0',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
            }}
          >
            <DataTable />
          </Content>
        </Layout>

      </Content>
    </Layout>
  );
};
export default ContentLayout;