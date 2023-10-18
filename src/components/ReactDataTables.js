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
        searching: false,
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
            processing: "<i class='fas fa-spinner fa-spin'></i> Loading....",
            lengthMenu: "_MENU_"
        },
        buttons: [],
      });
    }
  }, [data, columns]);

  return <table ref={tableRef} className="table table-bordered table-striped"></table>;
}

export default ReactDataTables;