"use client"
import DataTable from "/components/DataTable";
import { categories } from "/components/makeData";
import { usePathname } from "next/navigation";

const url = "http://localhost:3000";
async function getBooks() {
  const res = await fetch(
    `${url}/api/books`,

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

export default async function Books() {
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
      accessorKey: "bookName",
      header: "Book Name",
      size: 140,
      type: "text",
    },
    {
      accessorKey: "authorName",
      header: "Author Name",
      size: 140,
      type: "text",
    },
    {
      accessorKey: "authorEmail",
      header: "Author Email",
      type: "email",
    },
    {
      accessorKey: "pages",
      header: "Pages",
      size: 80,
      type: "number",
    },
    {
      accessorKey: "category",
      header: "Category",
      type: "select",
      values: categories,
    },
  ];

  const bookData = await getBooks();

  const [books] = await Promise.all([bookData]);

  return (
    <>
      <h1>Hello</h1>
      <div>
        <DataTable data={books} columns={columns} url={url} pathName = {pathName} />
      </div>
    </>
  );
}
