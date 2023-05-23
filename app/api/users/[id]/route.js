import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { headers } from "next/headers";

import { NextURL } from "next/dist/server/web/next-url";


const uri =
  "mongodb+srv://ahmet:soWjip-9vehve-nemwox@ahmet.zjjevax.mongodb.net/usermanagementsystem?retryWrites=true&w=majority";

  // get one user by id
  export async function GET(request) {
    //get last part of url
    const url = new NextURL(request.url);
    const id = url.pathname.split("/").pop();
    

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
    let user;
    try {
      user = await db
        .collection("users")
        .findOne({ _id: new ObjectId(id) });
    } catch (error) {
      client.close();
      return new Response("Storing message failed!", {
        status: 500,
        headers: { referer: referer },
      });
    }
    client.close();
    return NextResponse.json(user,
      {
        status: 200,
        headers: { referer: referer },
      }
    );
  }

  // update one user by id
  export async function PUT(request) {
    const url = new NextURL(request.url);
    const id = url.pathname.split("/").pop();
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
    try {
      await db
        .collection("users")
        .updateOne({ _id: new ObjectId(id) }, { $set: requestBody });
    } catch (error) {
      client.close();
      return new Response("Storing message failed!", {
        status: 500,
        headers: { referer: referer },
      });
    }
    client.close();
    return NextResponse.json(
      { message: "Successfully updated user!" },
      {
        status: 200,
        headers: { referer: referer },
      }
    );
  }

  // delete one user by id
  export async function DELETE(request) {
    const url = new NextURL(request.url);
    const id = url.pathname.split("/").pop();
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
      await db
        .collection("users")
        .deleteOne({ _id: new ObjectId(id) });
    } catch (error) {
      client.close();
      return NextResponse.json({"message": "Storing message failed!" }, {
        status: 500,
        headers: { referer: referer },
      });
    }
    client.close();
    return NextResponse.json(
      { message: "Successfully deleted user!" },
      {
        status: 200,
        headers: { referer: referer },
      }
    );
  }

  // create one user
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
    try {
      await db.collection("users").insertOne(requestBody);
    } catch (error) {
      client.close();
      return new Response("Storing message failed!", {
        status: 500,
        headers: { referer: referer },
      });
    }
    client.close();
    return NextResponse.json(
      { message: "Successfully stored message!" },
      {
        status: 201,
        headers: { referer: referer },
      }
    );
  }
