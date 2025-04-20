import { useEffect, useState, useRef } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from './Firebase';
import "datatables.net-dt/css/dataTables.dataTables.css";

 
import DataTable from 'datatables.net-react';
import 'datatables.net-dt';
import $ from 'jquery';

const UserData = () => {
  const [data, setData] = useState([]);
  const tableRef = useRef(null);
  const tableInstance = useRef(null);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "EmployeeData"));
        setData(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [db]);

  useEffect(() => {
  
    if (typeof window === 'undefined' || !data.length || !tableRef.current) {
      return;
    }
 
    if (tableInstance.current) {
      tableInstance.current.destroy();
      tableInstance.current = null;
    }

    try {
 
      tableInstance.current = $(tableRef.current).DataTable({
        data: data,
        columns: [
          {
            data: "name",
            title: "Employee Name",
            orderable: false,
            render: function (data, type, row) {
              return `<div style="display:flex;align-items:center;gap:10px;font-size:10px">
                <div style="width:35px;height:35px;border-radius:50%;background-color:${row.initials === "JS" ? "green" : row.initials === "DB" ? "blue" : row.initials === "MA" ? "red" : "yellow"};display:flex;align-items:center;justify-content:center;font-weight:bold;color:white">
                  ${row.initials}
                </div>
                <div>
                  <div style="font-weight:bold">${row.name}</div>
                  <div style="font-size:12px;color:#666">${row.department}</div>
                </div>
              </div>`;
            },
          },
          {
            data: "clockIn",
            title: "Clock-In",
            orderable: false,
            render: function (data) {
              return `<div style="font-weight:bold;font-size:10px">${data}</div>`;
            },
          },
          {
            data: "clockOut",
            title: "Clock-Out",
            orderable: false,
            render: function (data) {
              return `<div style="font-weight:bold;font-size:10px">${data}</div>`;
            },
          },
          {
            data: "using",
            title: "Currently Using",
            orderable: false,
            render: function (data) {
              let bgColor =
                data === "Productive" ? "#d4f4e4" :
                data === "Unproductive" ? "#f8d7da" :
                "#e2e3e5";

              return `<span style="padding:5px 10px;border-radius:15px;background-color:${bgColor};font-size:10px">${data}</span>`;
            },
          },
          {
            data: "status",
            title: "Status",
            orderable: false,
            render: function (data) {
              let bgColor =
                data === "Productive" ? "#d4f4e4" :
                data === "Unproductive" ? "#f8d7da" :
                "#e2e3e5";
              return `<span style="padding:5px 10px;border-radius:15px;background-color:${bgColor};font-size:10px">${data}</span>`;
            },
          },
          {
            data: "task",
            title: "Task",
            orderable: false,
          },
          {
            data: "Action",
            title: "Action",
            orderable: false,
            render: function () {
              return `<button style="padding:5px 10px;border-radius:5px;color:blue;border:1px solid blue;cursor:pointer;white-space:nowrap;font-size:10px">Take Screenshot</button>`;
            },
          },
        ],
        stripeClasses: [],
        ordering: false,
        paging: true,
        searching: true,
        pageLength: 5,
        lengthMenu: [[1, 2, 3, 4], [1, 2, 3, 4]],
        createdRow: function (row) {
          $(row).css({
            'margin-bottom': '10px',
            'padding': '5px',
            'box-shadow': '1px 1px 3px rgba(0, 0, 0, 0.2)',
            'border-radius': '5px',
            'font-size': '10px'
          });
        },
        headerCallback: function (thead) {
          $(thead).css({
            'font-size': '10px',
            'font-weight': '600',
            'color': '#838387'
          });
        },
        initComplete: function(settings) {
          $(settings.nTable).css({
            'border': 'none',
            'border-collapse': 'separate',
            'border-spacing': '0 5px'
          });
          
          $(settings.nTable).find('td, th').css('border', 'none');
        }
      });
    } catch (error) {
      console.error("Error initializing DataTable:", error);
    }
 
    return () => {
      if (tableInstance.current) {
        tableInstance.current.destroy();
        tableInstance.current = null;
      }
    };
  }, [data]);

  return (
    <div className="table-container" style={{ fontSize: "12px", padding: "16px" }}>
      {data.length === 0 ? (
        <div>Loading data...</div>
      ) : (
        <table ref={tableRef} className="display no-border" style={{ width: '100%' }}></table>
      )}
    </div>
  );
};

export default UserData;