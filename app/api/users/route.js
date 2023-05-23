import { headers } from "next/headers";
import { ObjectId } from "mongodb";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";


const uri =
  "mongodb+srv://ahmet:soWjip-9vehve-nemwox@ahmet.zjjevax.mongodb.net/usermanagementsystem?retryWrites=true&w=majority";

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
      await db.collection("users").insertMany(requestBody);
    } catch (error) {
      console.log(error);
      client.close();
      return new Response("Multiple user creation is failed", {
        status: 500,
        headers: { referer: referer },
      });
    }
  } else {
    delete requestBody.id;
  try {
    console.log("single user");
    const result = await db.collection("users").insertOne(requestBody);
  } catch (error) {
    console.log(error);
    client.close();
    return new Response("single user creation failed!", {
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
    return new Response("Could not connect to database.", {
      status: 500,
      headers: { referer: referer },
    });
  }
  const db = client.db();
  try {
    const documents = await db.collection("users").find().toArray();
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