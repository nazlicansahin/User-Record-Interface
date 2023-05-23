import DataTable from '/components/DataTable'

import { data } from '/components/makeData'

async function getUsers() {
    const res = await fetch(`http://localhost:3000/api/users`,

    {
        cache: 'no-cache',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    );
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return( res.json() );
  }

export default async function Users() {

    const userData = await getUsers();

    const [users] = await Promise.all([userData]);

    return (
        <>
            <h1>Hello</h1>
        <div>
        <DataTable data={users} />
        </div>


        </>
    )
}
