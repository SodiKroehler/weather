import { NextResponse, NextRequest} from 'next/server'
import getWeather from './../weatherCall'

export async function GET(req: NextRequest) {

    let names = ["sodi", "brianna"]
    let numbers = ["(412) 448-2736", "(260) 312-5235"]
    let ammassed = ""

    for (let i=0; i<2; i++){
        let msg = "Hi " + names[i] + ". Current forecast is " + await getWeather()
        ammassed = ammassed + "|" + msg + "{}" + numbers[i]
    }

    let returnVal = "test {}  | hi brianna this is v {} (260) 312-5235"

    return NextResponse.json({messages: ammassed.substring(1)})
}