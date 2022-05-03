import React, { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

const onClickAction = (params: GridRenderCellParams<Date>) => {
  const onClick = (event: React.MouseEvent<Element, MouseEvent>): void => {
    event.stopPropagation();
  };

  return (
    <strong>
      {params.value?.getFullYear() ?? ""}
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{ marginLeft: 16 }}
        onClick={onClick}
      >
        Open
      </Button>
    </strong>
  );
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 170 },
  { field: "name", headerName: "Name", width: 170 },
  { field: "username", headerName: "Username", width: 130 },
  {
    field: "date",
    headerName: "Year",
    width: 150,
    renderCell: onClickAction,
  },
];

type User = {
  id: number;
  name: string;
  username: string;
};

const UsersTable: FunctionComponent = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/users";
    axios.get(url).then((response) => setUsers(response.data));
  }, []);

  const rows = users.map((user: User) => ({
    id: user.id,
    name: user.name,
    username: user.username,
  }));

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        editMode="row"
      />
    </div>
  );
};

export default UsersTable;

/*
Add an action column
figure out how to get the id from the current column data 
create a button component with an onclick function that fetches the user post api using the user id
render the post data
*/
