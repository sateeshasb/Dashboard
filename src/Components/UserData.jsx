import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';

import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from './Firebase';
import "datatables.net-dt/css/dataTables.dataTables.css"; 
import { RiFileWord2Line } from "react-icons/ri";

const UserData = () => {
  const [data, setData] = useState([]);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "EmployeeData"));
      setData(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchData();
  }, [db]);
  DataTable.use(DT);

  console.log(data);

  const columns = [
    {
      data: "name",
      title: "Employee Name",
      sortable: false,
      render: function (data, type, row) {
        return `
          <div style="display: flex; align-items: center; gap: 10px; font-family: intern system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; font-size: 10px;">
            <div style="
              width: 35px;
              height: 35px;
              border-radius: 50%;
              background-color: ${row.initials === "JS" ? "green" : row.initials === "DB" ? "blue" : "yellow"};
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              color: white;
            ">
              ${row.initials}
            </div>
            <div>
              <div style="font-weight: bold;">${row.name}</div>
              <div style="font-size: 12px; color: #666">${row.department}</div>
            </div>
          </div>
        `;
      },
    },
    {
      data: "clockIn",
      title: "Clock-In",
      sortable: false,
      render: function (data) {
        return `<div style="font-weight: bold; font-family: intern system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; font-size: 10px;">${data}</div>`;
      },
    },
    {
      data: "clockOut",
      title: "Clock-Out",
      sortable: false,
      render: function (data) {
        return `<div style="font-weight: bold; font-family: intern system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; font-size: 10px;">${data}</div>`;
      },
    },
    {
      data: "using",
      title: "Currently Using",
      sortable: false,
      render: function (data) {
        let bgColor =
          data === "Productive" ? "#d4f4e4" :
          data === "Unproductive" ? "#f8d7da" :
          "#e2e3e5";

        return `<span style="padding: 5px 10px; border-radius: 15px; background-color: ${bgColor}; font-family: intern system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; font-size: 10px;">${data}</span>`;
      },
    },
    {
      data: "status",
      title: "Status",
      sortable: false,
      render: function (data) {
        let bgColor =
          data === "Productive" ? "#d4f4e4" :
          data === "Unproductive" ? "#f8d7da" :
          "#e2e3e5";
        return `<span style="padding: 5px 10px; border-radius: 15px; background-color: ${bgColor}; font-family: intern system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; font-size: 10px;">${data}</span>`;
      },
    },
    {
      data: "task",
      title: "Task",
      sortable: false,
    },
    {
      data: "Action",
      title: "Action",
      sortable: false,
      render: function () {
        return `<button style="padding: 5px 10px; border-radius: 5px; color: blue; border: 1px solid blue; cursor: pointer; white-space: nowrap; font-family: intern system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; font-size: 10px;">Take Screenshot</button>`;
      },
    },
  ];

  const tableOptions = {
    stripeClasses: [],
    ordering: false,
    paging: true,  
    searching: true, // Ensure search bar is enabled
    pageLength: 5, // Set default number of rows per page
    lengthMenu: [[1, 2, 3, 4], [1, 2, 3, 4]], // Allow user to change page length
     
    createdRow: function (row) {
      row.style.marginBottom = "10px";
      row.style.padding = "8px";
      row.style.boxShadow = "1px 1px 3px rgba(0, 0, 0, 0.2)";
      row.style.borderRadius = "5px";
      row.style.fontFamily = "intern system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
      row.style.fontSize = "10px";
    },
    headerCallback: function (thead) {
      thead.style.fontSize = "10px";
      thead.style.fontWeight = "600";
      thead.style.color = "#838387";
      thead.style.fontFamily = "intern system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
    },
    initComplete: function(settings) {
      let table = settings.nTable;
      table.style.border = "none";
      table.style.borderCollapse = "separate";
      table.style.borderSpacing = "0 10px";
      
      let cells = table.querySelectorAll('td, th');
      cells.forEach(cell => cell.style.border = "none");
    }
  };
  
  
  return (
    <div className="table-container" style={{ fontSize: "12px", padding: "16px" }}>
      <DataTable 
        data={data} 
        columns={columns} 
        className="display no-border" 
        options={tableOptions} 
      />
       
    </div>
  );
}

export default UserData;