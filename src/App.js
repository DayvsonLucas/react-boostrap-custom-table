import React from 'react';
import CustomTable from './table'
import { items } from './_mock_'

const headings = [
  { key: 'name', display: 'Nome', sort: true },
  { key: 'cpu', display: 'Cpus', sort: true },
  { key: 'mem', display: 'Memória', sort: true },
  { key: 'nicPrivateIpAddress', display: 'IP Privado', sort: true },
  { key: 'nicPublicIpAddress', display: 'IP Público', sort: true },
  { key: 'status', display: 'Status', sort: true },
  { key: 'cloud', display: 'Cloud', sort: true },
];

var tableData = {
  columns: headings,
  rows: items
}


function App() {
  return (
    <div className="App">
      <CustomTable data={tableData} selectItem={true} />
    </div>
  );
}

export default App;
