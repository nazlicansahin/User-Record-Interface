"use client"
import DataTable from "/components/DataTable";
import { states } from "/components/makeData";
import { usePathname } from "next/navigation";

const url = "http://localhost:3000";
async function getUsers() {
  // with revalidate: 10
  const res = await fetch(
    `${url}/api/users`,

    {
      cache: "no-cache",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

export default async function Users() {
  const pathName = usePathname();
  //const [url, setUrl] = useState(new URL(window.location.href).origin);
  // get url origin with useRoturer

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      enableColumnOrdering: false,
      enableEditing: false, //disable editing on this column
      enableSorting: false,
      size: 80,
      type: "id",
    },
    {
      accessorKey: "firstName",
      header: "First Name",
      size: 140,
      type: "text",
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
      size: 140,
      type: "text",
    },
    {
      accessorKey: "email",
      header: "Email",
      type: "email",
    },
    {
      accessorKey: "age",
      header: "Age",
      size: 80,
      type: "number",
    },
    {
      accessorKey: "state",
      header: "State",
      type: "select",
      values: states,
    },
  ];

  const userData = await getUsers();

  const [users] = await Promise.all([userData]);

  return (
    <>
      <div>
        <DataTable data={users} columns={columns} url={url}  pathName = {pathName} />
      </div>
    </>
  );
}
