async function getMusic(musicId) {
  const res = await fetch(`http://localhost:3000/api/musics/${musicId}`);
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

export default async function Hello(props) {
  // get id from url
  const musicId = props.params.id;
  //const musicId = props.pathname.split("/").pop();

  const musicData = await getMusic(musicId);
  console.log(musicData);
  const [music] = await Promise.all([musicData]);

  return (
    <>
      <h1>Hello</h1>
      <p>{music.firstName}</p>
      <p>{music.lastName}</p>
      <p>{music.email}</p>
    </>
  );
}
