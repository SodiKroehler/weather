import { NextResponse, NextRequest} from 'next/server'

export async function GET(req: NextRequest) {

    let returnVal = "test {} (412) 448-2736 | hi brianna this is v {} (260) 312-5235"

    return NextResponse.json({messages: returnVal})
}