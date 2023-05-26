"use client"
import DataTable from "/components/DataTable";
import { musicCategory } from "/components/makeData";
import { usePathname } from "next/navigation";

const url = "http://localhost:3000";
async function getMusics() {
  // with revalidate: 10
  const res = await fetch(
    `${url}/api/musics`,

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

export default async function Musics() {
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
      accessorKey: "musicName",
      header: "Music Name",
      size: 140,
      type: "text",
    },
    {
      accessorKey: "artistName",
      header: "Artist Name",
      size: 140,
      type: "text",
    },
    {
      accessorKey: "albumName",
      header: "Album Name",
      type: "text",
    },
    {
      accessorKey: "releaseYear",
      header: "Release Year",
      size: 80,
      type: "number",
    },
    {
      accessorKey: "category",
      header: "Category",
      type: "select",
      values: musicCategory,
    },
  ];

  const musicData = await getMusics();

  const [musics] = await Promise.all([musicData]);

  return (
    <>
      <div>
        <DataTable data={musics} columns={columns} url={url}  pathName = {pathName} />
      </div>
    </>
  );
}
