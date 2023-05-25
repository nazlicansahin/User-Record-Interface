"use client"
import DataTable from "/components/DataTable";
import { states , priority} from "/components/makeData";
import { usePathname } from "next/navigation";

const url = "http://localhost:3000";
async function getCountries() {
  // with revalidate: 10
  const res = await fetch(
    `${url}/api/countries`,

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

export default async function Countries() {
  const pathName = usePathname();
  //const [url, setUrl] = useState(new URL(window.location.href).origin);
  // get url origin with countryoturer

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
      accessorKey: "countyName",
      header: "Country Name",
      size: 140,
      type: "text",
    },
    {
      accessorKey: "capitalName",
      header: "Capital Name",
      size: 140,
      type: "text",
    },
    {
      accessorKey: "continent",
      header: "Continent",
      type: "text",
    },
    {
      accessorKey: "population",
      header: "Population",
      size: 80,
      type: "number",
    },
    {
      accessorKey: "priority",
      header: "Priority",
      type: "select",
      values: priority,
    },
  ];

  const countryData = await getCountries();

  const [countries] = await Promise.all([countryData]);

  return (
    <>
      <h1>Hello</h1>
      <div>
        <DataTable data={countries} columns={columns} url={url}  pathName = {pathName} />
      </div>
    </>
  );
}

