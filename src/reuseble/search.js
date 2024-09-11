import React from 'react';
import Input from 'antd/lib/input';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import Select from 'antd/lib/select';

const { Option } = Select;

export const DataSearch = ({materials, setData, placeholder}) => {
  const searchItems = (value) => {
    if (value?.length) {
        const tempData = materials.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(value.toLowerCase())
        })
        setData(tempData)
    } else {
        setData(materials)
    }
  }

  return (
    <Input
      id='ID'
      allowClear={true} 
      className='search'
      placeholder={placeholder} 
      suffix={<SearchOutlined/>}
      onChange={(e) => searchItems(e.target.value)}
      style={{
        width: '20%'
      }} 
    />
  );
};

export const DataSelectRegion = ({getData, onChange, onSelect, placeholder}) => {
  return(
    <Select
      onSelect={onSelect}
      showSearch={true}
      allowClear={true}
      onChange={onChange}
      placeholder={placeholder}
      className='select'
      optionFilterProp="children"
      options={getData && getData.length > 0 && getData.map((item, index) => {
        return {
            key: index,
            label: item.region_name,
            value: item.region_code
          };
        })}
      style={{
        width: '250px'
      }} 
    />
  );
};

export const DataSelectProvices = ({getData, onChange, disabled, placeholder}) => {
  return(
    <Select
      disabled={disabled}
      showSearch={true}
      allowClear={true}
      onChange={onChange}
      placeholder={placeholder}
      className='select'
      optionFilterProp="children"
      options={getData && getData.length > 0 && getData.map((item, index) => {
        return {
            key: index,
            label: item.province_name,
            value: item.province_code
          };
        })}
      style={{
        width: '200px'
      }} 
    />
  );
};

export const DataSelectCities = ({getData, onChange, disabled, placeholder}) => {
  return(
    <Select
      disabled={disabled}
      showSearch={true}
      allowClear={true}
      onChange={onChange}
      placeholder={placeholder}
      className='select'
      optionFilterProp="children"
      options={getData && getData.length > 0 && getData.map((item, index) => {
        return {
            key: index,
            label: item.city_name,
            value: item.city_code
          };
        })}
      style={{
        width: '200px'
      }} 
    />
  );
};

export const DataSelectBarangays = ({getData, onChange, disabled, placeholder}) => {
  return(
    <Select
      disabled={disabled}
      showSearch={true}
      allowClear={true}
      onChange={onChange}
      placeholder={placeholder}
      className='select'
      optionFilterProp="children"
      options={getData && getData.length > 0 && getData.map((item, index) => {
        return {
            key: index,
            label: item.brgy_name,
            value: item.brgy_code
          };
      })}
      style={{
        width: '200px'
      }} 
    />
  );
};