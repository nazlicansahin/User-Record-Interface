
async function getUser(userId) {
    const res = await fetch(`http://localhost:3000/api/users/${userId}`);
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return( res.json() );
  }


export default async function Hello(props) {
    // get id from url
    const userId = props.params.id;
    //const userId = props.pathname.split("/").pop();

    const userData = await getUser(userId);
    console.log(userData);
    const [user] = await Promise.all([userData]);

    return (
        <>
            <h1>Hello</h1>
        <p>{user.firstName}</p>
        <p>{user.lastName}</p>
        <p>{user.email}</p>


        </>
    )
}

