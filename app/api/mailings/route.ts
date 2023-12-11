import { NextResponse, NextRequest} from 'next/server'
import getWeather from './../weatherCall'
import { list } from '@vercel/blob';

const getNames = async () => {
    const { blobs } = await list({prefix: "/data"});
    return blobs[0].url
}

export async function GET(req: NextRequest) {

    let dictUrl = await getNames()

    let dict = await fetch(dictUrl).then(r => r.json())
    let ammassed = ""

    for (let sendTime in dict){
        for (let u in dict[sendTime]){
            let msg = "Hi " + dict[sendTime][u].firstName + ". Current forecast is " + await getWeather(dict[sendTime][u].office, dict[sendTime][u].points)

            ammassed = ammassed + "|" + msg + "{}" + dict[sendTime][u].phone
        }
    }
    return NextResponse.json({ammassed})
}