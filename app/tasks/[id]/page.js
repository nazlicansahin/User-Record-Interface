async function getTask(taskId) {
  const res = await fetch(`http://localhost:3000/api/tasks/${taskId}`);
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

export default async function Hello(props) {
  // get id from url
  const taskId = props.params.id;
  //const taskId = props.pathname.split("/").pop();

  const taskData = await getTask(taskId);
  console.log(taskData);
  const [task] = await Promise.all([taskData]);

  return (
    <>
      <h1>Hello</h1>
      
    </>
  );
}
