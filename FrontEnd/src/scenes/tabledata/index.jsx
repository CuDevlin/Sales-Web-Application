import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const TableData = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://localhost:8080/joined';

    fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((responseJson) => {

          if (responseJson && Array.isArray(responseJson)) {

            setData(responseJson);

            if (responseJson.length > 0) {
              const firstDataRow = responseJson[0];
              const generatedColumns = Object.keys(firstDataRow).map((key) => ({
                field: key,
                headerName: key,
                width: 150,
                editable: true,
              }));
              setColumns(generatedColumns);
            }
          } else {
            console.error('Invalid data structure received from the server.');
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
  }, []);

    const getRowId = (row) => row.order_id;

  return (
    <Box sx={{ height: 400, maxWidth: '98%', margin: '16px'}}>
        <h2>Sales Data</h2>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableRowSelectionOnClick
        getRowId={getRowId}
      />
    </Box>
  );
};

export default TableData;
