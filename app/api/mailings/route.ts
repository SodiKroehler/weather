import { NextResponse, NextRequest} from 'next/server'
import getWeather from './../weatherCall'
import { list } from '@vercel/blob';

const getNames = async () => {
    const { blobs } = await list({prefix: "/data"});
    return blobs[0].url
}

export async function GET(req: NextRequest) {

    const myKey =req.nextUrl.searchParams.get("key")
    const time =req.nextUrl.searchParams.get("time")
  
    if (myKey !== process.env.SUPERSECRETKEY){
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 404 })
    } 
    let dictUrl = await getNames()

    let dict = await fetch(dictUrl).then(r => r.json())
    let ammassed = []

    for (let sendTime in dict){
        if (sendTime === time){
            for (let u in dict[sendTime]){
                let msg = "Good mnorin " + dict[sendTime][u].firstName + ". Current forecast is " + await getWeather(dict[sendTime][u].office, dict[sendTime][u].points)
                ammassed.push({firstName: dict[sendTime][u].firstName, number: dict[sendTime][u].phone, message: msg})
                // ammassed = ammassed + "|" + msg + "{}" + dict[sendTime][u].phone
            }
            
            // console.log(JSON.stringify(dict[sendTime]))
        }
    }
    return NextResponse.json({"messages":ammassed})
}