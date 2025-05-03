import { useEffect, useState, useRef } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from './Firebase';
import { useNavigate } from 'react-router-dom';
import "datatables.net-dt/css/dataTables.dataTables.css";
import DataTable from 'datatables.net-react';
import 'datatables.net-dt';
import $ from 'jquery';

const UserData = () => {
  const [data, setData] = useState([]);
  const tableRef = useRef(null);
  const tableInstance = useRef(null);
  const db = getFirestore(app);
  const navigate = useNavigate();

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
    if (typeof window === 'undefined' || !data.length || !tableRef.current) return;

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
                <div style="width:35px;height:35px;border-radius:50%;background-color:${
                  row.initials === "JS" ? "green" :
                  row.initials === "DB" ? "blue" :
                  row.initials === "MA" ? "red" : "yellow"
                };display:flex;align-items:center;justify-content:center;font-weight:bold;color:white">
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
            render: function (data, type, row, meta) {
              if (meta.row === 1) {
                return `
                  <div style="position:relative; display:inline-block; font-size:10px; font-weight:bold;">
                    <div style="
                      position:absolute;
                      top:-12px;
                      right:-10px;
                      background-color:#7b5dfa;
                      color:white;
                      font-size:8px;
                      font-weight:bold;
                      width:16px;
                      height:16px;
                      display:flex;
                      align-items:center;
                      justify-content:center;
                      border-radius:3px;
                      z-index:1;
                      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
                    ">+1</div>
                    ${data}
                  </div>
                `;
              }
              return `<div style="font-size:10px;font-weight:bold;">${data}</div>`;
            },
          },
          {
            data: "using",
            title: "Currently Using",
            orderable: false,
            render: function (data, type, row, meta) {
              let bgColor = "";

              if (data === "undefined") {
                bgColor = "green";
              } else if (data === "Clock-out") {
                bgColor = "red";
              } else if (data === "undefine") {
                bgColor = "blue";
              } else {
                bgColor = "#fcd703";
              }

              let iconSvg = '';
              let iconName = '';

              if (meta.row === 0) {
                iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`;
                iconName = 'Mail';
              } else if (meta.row === 1) {
                iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`;
                iconName = 'Clock';
              } else if (meta.row === 2) {
                iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="14" viewBox="0 0 320 512" fill="currentColor"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg>`;
                iconName = 'Facebook';
              } else {
                iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 2l5 5v14.008a.993.993 0 0 1-.993.992H3.993A1 1 0 0 1 3 21.008V2.992C3 2.444 3.445 2 3.993 2H16zm-2 6v4.999H8v-1l1.5.001v-3H8v-1h6z"></path></svg>`;
                iconName = 'Word File';
              }

              return `<span style="display:inline-flex;align-items:center;padding:5px 8px;border-radius:15px;font-weight:bold;background-color:${bgColor};font-size:10px;gap:10px;flex-grow:0;flex-shrink:0;max-width:max-content;color:white;border:1px solid black;">
                ${iconSvg}
                <span style="display:inline-flex;align-items:center;gap:10px; width: 100px;">
                  <span>${iconName}</span>
                  <span>${data}</span>
                </span>
              </span>`;
            },
          },
          {
            data: "task",
            title: "Task",
            orderable: false,
            render: function (data, type, row) {
              return `<div style="font-size:10px;font-weight:bold">${data}</div>
                <div style="font-size:12px;color:#666">${row.char}</div>`;
            }
          },
          {
            data: "Action",
            title: "Action",
            orderable: false,
            render: function (data) {
              return `<button style="padding:5px 10px;border-radius:5px;color:blue;border:1px solid blue;cursor:pointer;white-space:nowrap;font-size:10px;font-weight:bold">${data}</button>`;
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
            'padding': '9px',
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
        rowCallback: function (row, rowData) {
          $(row).css('cursor', 'pointer');
          $(row).off('click').on('click', function () {
            navigate(`/user/${rowData.id}`);
          });
        },
        initComplete: function (settings) {
          $(settings.nTable).css({
            'border': 'none',
            'border-collapse': 'separate',
            'border-spacing': '0 7px'
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
  }, [data, navigate]);

  return (
    <div className="table-container" style={{ fontSize: "14px", padding: "16px" }}>
      {data.length === 0 ? (
        <div>Loading data...</div>
      ) : (
        <table ref={tableRef} className="display no-border" style={{ width: '100%' }}></table>
      )}
    </div>
  );
};

export default UserData;
