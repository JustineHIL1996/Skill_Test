import React from 'react';
import Input from 'antd/lib/input';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import Select from 'antd/lib/select';

export const SearchData = ({ materials, setData, defaultRole, placeholder }) => {
  const handleSearch = (e) => {
    const searchValue = e.target.value;

    if (!searchValue) {
      const filteredByRole = materials.filter(item => item.for === (defaultRole || (defaultRole === 'President')));
      setData(filteredByRole); 
      return;
    }

    const lowerCaseSearchValue = typeof searchValue === 'string' ? searchValue.toLowerCase() : '';

    const filtered = materials.filter(item => 
      (item.for === defaultRole || (item.for === (defaultRole || 'President'))) && 
      item.candidates.some(candidate => 
        candidate.firstName.toLowerCase().includes(lowerCaseSearchValue) || 
        candidate.lastName.toLowerCase().includes(lowerCaseSearchValue)
      )
    );

    setData(filtered);
  };

  return (
    <Input
      id='ID'
      allowClear={true} 
      className='search'
      placeholder={placeholder} 
      suffix={<SearchOutlined />}
      onChange={handleSearch}
    />
  );
};

export const SelectDataforPandVP = ({ data, setData, placeholder, defaultValue }) => {

  const onRoleSelect = (value) => {
    filterDataByRole(value);
    defaultValue(value)
  };

  const filterDataByRole = (role) => {
    if (!role) {
        setData(data);
    } else {
        const filtered = data.filter((user) => user.for === role);
        setData(filtered);
    }
  };

  return (
    <Select
      showSearch={false}
      allowClear={true}
      onChange={onRoleSelect}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className='select'
      optionFilterProp="children"
      options={[
        { key: 0, label: 'President', value: 'President' },
        { key: 1, label: 'Vice President', value: 'Vice-President' }
      ]}
      style={{
        width: '250px',
      }} 
    />
  );
};

export const SelectData = ({id, value, getData, onChange, placeholder}) => {
  return(
    <Select
      id={id}
      value={value}
      showSearch={false}
      allowClear={true}
      onChange={onChange}
      placeholder={placeholder}
      className='select'
      optionFilterProp="children"
      options={getData.map((item) => {
        return {
            key: item.name,
            label: item.name,
            value: item.name
          };
        })}
      style={{
        width: '250px'
      }} 
    />
  );
};

export const SelectDataAlternative = ({id, value, getData, onChange, placeholder}) => {
  return(
    <Select
      id={id}
      value={value}
      showSearch={false}
      allowClear={true}
      onChange={onChange}
      placeholder={placeholder}
      className='select'
      optionFilterProp="children"
      options={getData.map((item) => {
        return {
            key: item,
            label: item,
            value: item
          };
        })}
      style={{
        width: '250px'
      }} 
    />
  );
};