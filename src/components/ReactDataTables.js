import React, { useEffect, useRef } from "react";
import $ from "jquery"; // Import jQuery
import "datatables.net"; // Import DataTables

// Use noConflict mode to avoid conflicts with other libraries
$.noConflict();

function ReactDataTables({ data, columns }) {
  const tableRef = useRef(null);

  useEffect(() => {
    if (data && data.length > 0) {
      $(tableRef.current).DataTable({
        data: data,
        columns: columns,
        dom: 'Bfrtip',
        colReorder: true,
        fixedHeader: true,
        responsive: true,
        destroy: true,
        stateSave: false,
        stateDuration: -1,
        serverSide: false,
        processing: true,
        keys: true,
        columnDefs: [{
            targets: -1,
            sorting: false,
            orderable: false
        }],
        autoWidth: false,
        infoFiltered: "",
        language: {
            paginate: {
                first: '&laquo;',
                previous: '&lsaquo;',
                next: '&rsaquo;',
                last: '&raquo;'
            },
            // search: "Cari",
            // info: "Menampilkan _START_ s/d _END_ dari _TOTAL_ data",
            // infoEmpty: "Menampilkan 0 s/d 0 dari 0 data",
            processing: "<i class='fas fa-spinner fa-spin'></i> Loading....",
            // zeroRecords: "Tidak ada data",
            // emptyTable: "Tidak ada data ditemukan",
            lengthMenu: "_MENU_"
        },
        buttons: [],
      });
    }
  }, [data, columns]);

  return <table ref={tableRef}></table>;
}

export default ReactDataTables;