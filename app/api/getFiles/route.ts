// var request = require('request');
import { list, del} from '@vercel/blob';
import { NextResponse, NextRequest} from 'next/server'


export async function GET(req: NextRequest) {
  const myKey =req.nextUrl.searchParams.get("key")
  const action =req.nextUrl.searchParams.get("action")

  if (myKey !== process.env.SUPERSECRETKEY){
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 404 })
  } else {
    const { blobs } = await list({prefix: "/data"});
    switch (action){
      case "get" :{
        return Response.json(blobs);
      }
      case "delete":{
        for (let blob in blobs){
          del(blobs[blob].url)   
        }
        return Response.json("200");
      }
      case "read":{
        let amass = ""
        for (let blob in blobs){
          amass += "BLOB: " + JSON.stringify(blobs[blob])
          let dict = await fetch(blobs[blob].url).then(r => r.json())
          amass += JSON.stringify(dict)
        }
        return Response.json(amass);
      }
      case "test": {
        const { blobs } = await list({prefix: "/data"});
        for (let blob in blobs){
          let dict = await fetch(blobs[0].url).then(r => r.json())
          console.log(dict)
        }

        return Response.json(200);
      }  
    }
  }
}