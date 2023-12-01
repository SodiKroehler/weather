import { NextResponse, NextRequest} from 'next/server'

export async function GET(req: NextRequest) {

    let returnVal = "test, (412) 448-2736"

    return NextResponse.json({messages: returnVal})
}