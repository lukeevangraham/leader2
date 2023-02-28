import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const ContactTable = ({ contacts }) => {
  const defaultMaterialTheme = createTheme();

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  return (
    <div>
      <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable
          columns={[
            { title: "First", field: "firstName" },
            { title: "Last", field: "lastName", defaultSort: "asc" },
            { title: "Email", field: "email" },
            { title: "Cell Phone", field: "cellPhone" },
            { title: "Home Phone", field: "homePhone" },
            { title: "Role", field: "position" },
          ]}
          data={contacts}
          title="Leader Info"
          icons={tableIcons}
          options={{
            paging: false,
            headerStyle: { fontWeight: "900" },
          }}
          detailPanel={(rowData) => (
            <div
              style={{ padding: "1rem 5rem", display: "flex", gap: "1.5rem" }}
            >
              <div>
                <div>
                  <strong>Address</strong>
                </div>
                <div>{rowData.address}</div>
                <div>
                  {rowData.city}, CA {rowData.zipCode}
                </div>
              </div>
              {rowData.responsibility ? (
                <div>
                  <div>
                    <strong>Responsibility</strong>
                  </div>
                  <div>{rowData.responsibility}</div>
                </div>
              ) : null}
            </div>
          )}
          onRowClick={(event, rowData, togglePanel) => togglePanel()}
        />
      </ThemeProvider>
    </div>
  );
};

export default ContactTable;
