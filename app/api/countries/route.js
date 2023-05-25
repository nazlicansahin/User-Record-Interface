import { headers } from "next/headers";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";


const uri = process.env.URL
export async function POST(request) {
  const headersList = headers();
  const referer = headersList.get("referer");
  const requestBody = await request.json();
  let client;
  try {
    client = await MongoClient.connect(uri);
  } catch (error) {
    
    return new Response("Could not connect to database.", {
      status: 500,
      headers: { referer: referer },
    });
  }
  const db = client.db();
  if (Array.isArray(requestBody)) {
    requestBody.forEach((element) => {
      delete element.id;
    });
    try {
      await db.collection("countries").insertMany(requestBody);
    } catch (error) {
      console.log(error);
      client.close();
      return new Response("Multiple country creation is failed", {
        status: 500,
        headers: { referer: referer },
      });
    }
  } else {
    delete requestBody.id;
  try {
    console.log("single country");
    const result = await db.collection("countries").insertOne(requestBody);
  } catch (error) {
    console.log(error);
    client.close();
    return new Response("single country creation failed!", {
      status: 500,
      headers: { referer: referer },
    });
  }
}
  client.close();
  return new Response(
    JSON.stringify({ message: "Successfully stored message!", data: requestBody }),
    {
      status: 201,
      headers: { referer: referer },
    }
  );
}

export async function GET() {
  const headersList = headers();
  const referer = headersList.get("referer");
  let client;
  try {
    client = await MongoClient.connect(uri);
  } catch (error) {
    console.log(error);
    return new Response("Could not connect to database.", {
      status: 500,
      headers: { referer: referer },
    });
  }
  const db = client.db();
  try {
    const documents = await db.collection("countries").find().toArray();
    client.close();
    documents.forEach((element) => {
      element.id = element._id.toString();
    });
    return NextResponse.json( documents, {
      status: 200,
      headers: { referer: referer,
        "Content-Type": "application/json" },
    });
  } catch (error) {
    client.close();
    return new Response("Could not retrieve messages.", {
      status: 500,
      headers: { referer: referer },
    });
  }
}