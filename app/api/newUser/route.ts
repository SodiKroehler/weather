import { put, list, del} from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
import {getDetailsByLatLong} from '../weatherCall'
export const runtime = 'edge';
import { z } from "zod";
 
// export async function PUT(request: Request) {
//   const form = await request.formData();
//   const file = form.get('name') as File;
//   const blob = await put(file.name, file, { access: 'public' });

// //   import { put } from "@vercel/blob";

// //     const { url } = await put('articles/blob.txt', 'Hello World!', { access: 'public' });

 
//   return Response.json(blob);
// /  / }
// interface userDeetsType {
//     firstName: string;
//     lastName: string;
//     lat: string,
//     long: string,
//     office: string,
//     points: string
//     time: string
//  }

 const user = z.object(
    {
        firstName: z.string(),
        lastName: z.string(),
        phone: z.string(),
        lat: z.string(),
        long: z.string(),
        office: z.string(),
        points: z.string(),
        time: z.string(),
        extras: z.array(z.string())
    }
);

type User = z.infer<typeof user>;
const partialUser = user.partial();
type PartialUser = z.infer<typeof partialUser>;

export async function POST(request: Request){

    const formJizz = await request.json();

    const userDeets = user.parse({
        firstName: formJizz.firstName,
        lastName: "",
        phone: formJizz.phoneNumber,
        lat: formJizz.latitude,
        long: formJizz.longitude,
        time: formJizz.selectedTime.toString(),
        office: "",
        points: "",
        extras: [formJizz.extras],
      })
    const {office, points} = await getDetailsByLatLong(userDeets.lat, userDeets.long)
    userDeets.office = office;
    userDeets.points = points

    const { blobs } = await list({prefix: "/data"});

    if (blobs.length > 0){
        let dict = await fetch(blobs[0].url).then(r => r.json())
        if (userDeets.time in dict){
            dict[userDeets.time].push(userDeets)
        } else {
            dict[userDeets.time] = [userDeets]
        }
        const blob = await put("/data", JSON.stringify(dict), {access: 'public', contentType: "string"}).then(r => {del(blobs[0].url)})
    } else {
        var newDict: { [id: string] : [User]; } = {};
        newDict[userDeets.time] = [userDeets]
        const blob = await put("/data", JSON.stringify(newDict), {access: 'public', contentType: "string"})
    }

    return NextResponse.json({status: "200"});
  }