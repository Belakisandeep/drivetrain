import { formData } from '@/lib/formData';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request, { params }) {
  const queries = params?.slug
  const sendBack = queries.length
  // const data = await request.json()
  try {
    switch (sendBack) {
      case 1:
        const makes = Object.keys(formData[queries[0]]) || []
        return NextResponse.json({ success: makes });
      case 2:
        const models = Object.keys(formData[queries[0]][queries[1]]) || []
        return NextResponse.json({ success: models });
      case 3:
        const year = Object.keys(formData[queries[0]][queries[1]][queries[2]]) || []
        return NextResponse.json({ success: year })
      case 4:
        const options = formData[queries[0]][queries[1]][queries[2]][queries[3]] || []
        return NextResponse.json({ success: options })
      default:
        break;
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: [] })
  }
}