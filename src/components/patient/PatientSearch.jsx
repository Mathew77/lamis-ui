import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Form, Input } from 'reactstrap';
import {Card, CardContent} from '@material-ui/core';
import './PatientSearch.css';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';

/**Find table documentations at
 * 1.https://www.npmjs.com/package/react-data-table-component#storybook-dependencies----rootdirstoriespackagejson
 * 2. https://jbetancur.github.io/react-data-table-component/?path=/story/conditional-styling--conditional-cells */
const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <Form  className="cr-search-form" onSubmit={e => e.preventDefault()} >
        <Card>
            <CardContent>
                  <Input
                    type="search"
                    placeholder="Search by Patient Name, Hospital Number "
                    className="cr-search-form__input pull-right"
                    value={filterText} onChange={onFilter}
                  />
            </CardContent>
        </Card>
    </Form>
);

const SampleExpandedComponent = ({ data }) => (
    <p>
      {data.website} | {data.address.street} {data.address.city}
    </p>
);
const handleDelete = () => {
    
  console.log('clicked');
};

const columns = [
  {
    name: 'Patient ID',
    selector: 'id',
    sortable: false,
  },
  {
    name: 'Patient Name',
    selector: 'name',
    sortable: false,
  },
  {
    name: 'Phone Number',
    selector: 'phone',
    sortable: false,
  },
  {
    name: 'Gender',
    selector: 'username',
    sortable: false,
  },
  {
    name: 'Age',
    selector: 'username',
    sortable: false,
  },
  {
      
    cell: () =>  <IconButton color="primary" onClick={handleDelete} aria-label="Archive Patient" title="Archive Patient">
    <Delete />
  </IconButton>,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];
const customStyles = {
  headCells: {
    style: {
      color: '#202124',
      fontSize: '14px',
      fontWeight: 'bold',
     
    },
  }
};
const BasicTable = () => {
  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const [data, setData] = useState([])
  const filteredItems = data.filter(
    item => (item.name && item.name.toLowerCase().includes(filterText.toLowerCase()))
    || (item.id && item.id.toString().toLowerCase().includes(filterText.toLowerCase())));
  
  useEffect(() => {    
      async function fetchData() {
          try{
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const result = await response.json(); 
        setData(result);
        console.log(result); 
          }catch(error){

          }
        }
    fetchData();     
  
  }, []);   
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
  }, [filterText, resetPaginationToggle]);

  return (
    <DataTable
      columns={columns}
      data={filteredItems}
      customStyles={customStyles}
      pagination
      paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      highlightOnHover={true}
      striped={true}
      subHeaderAlign={'left'}
        noHeader={true}
        expandableRows
        expandableRowsComponent={<SampleExpandedComponent />}
    />
  );
};

export default BasicTable;
