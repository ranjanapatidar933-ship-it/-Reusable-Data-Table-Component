import { useState } from 'react';
import DataTable, { type Column } from './components/DataTable';
import type { User } from './components/Demo/mockData';
import styles from "./App.module.css";
import DemoPage from './components/Demo/DemoPage';

const columns: Column<User>[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
];

const data: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', department: 'Engineering', joinDate: '2020-01-15', salary: 85000 },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', department: 'Engineering', joinDate: '2021-03-22', salary: 75000 },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Guest', department: 'Design', joinDate: '2019-11-30', salary: 70000 },
];

function App() {
  const [selectedRow, setSelectedRow] = useState<User>();

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Data Table</h1>

      <DataTable
        data={data}
        columns={columns}
        onRowSelect={setSelectedRow}
        searchable={true}
        defaultSort={{ key: 'name', direction: 'asc' }}
      />

      {selectedRow && (
        <div className={styles.selectedBox}>
          <h3>Selected User:</h3>
          <pre className={styles.preBox}>
            {JSON.stringify(selectedRow, null, 2)}
          </pre>
        </div>
      )}
      <DemoPage/>
    </div>
  );
}

export default App;
