"use client"
import DataTable from "/components/DataTable";
import { taskStatus } from "/components/makeData";
import { usePathname } from "next/navigation";

const url = "http://localhost:3000";
async function getTasks() {
  // with revalidate: 10
  const res = await fetch(
    `${url}/api/tasks`,

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

export default async function Tasks() {
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
      accessorKey: "taskName",
      header: "Task Name",
      size: 140,
      type: "text",
    },
    {
      accessorKey: "description",
      header: "Description",
      size: 140,
      type: "text",
    },
    {
      accessorKey: "assignee",
      header: "Assignee",
      type: "text",
    },
    {
      accessorKey: "dueDate",
      header: "Due Date",
      size: 80,
      type: "datetime-local",
    },
    {
      accessorKey: "status",
      header: "Status",
      type: "select",
      values: taskStatus,
    },
  ];

  const taskData = await getTasks();

  const [tasks] = await Promise.all([taskData]);

  return (
    <>
      <div>
        <DataTable data={tasks} columns={columns} url={url}  pathName = {pathName} />
      </div>
    </>
  );
}



