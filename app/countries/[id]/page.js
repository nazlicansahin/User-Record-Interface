async function getCountry(countryId) {
  const res = await fetch(`http://localhost:3000/api/countrys/${countryId}`);
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

export default async function Hello(props) {
  // get id from url
  const countryId = props.params.id;
  //const countryId = props.pathname.split("/").pop();

  const countryData = await getCountry(countryId);
  console.log(countryData);
  const [country] = await Promise.all([countryData]);

  return (
    <>
      <h1>Hello</h1>
      <p>{country.firstName}</p>
      <p>{country.lastName}</p>
      <p>{country.email}</p>
    </>
  );
}
