import { transporter, mailOptions } from "@/lib/nodemailer";
import { NextResponse, NextRequest } from 'next/server'

export async function POST(request) {
    const data = await request.json()
    try {
        await transporter.sendMail({
            ...mailOptions,
            subject: `Enquiry from ${data.Phone}`,
            text: `${data.Name} is looking for ${data?.Make} ${data?.Model} ${data?.Size} ${data?.Part}`,
            html: `<table style="border: 1px solid black;">
            <tbody>
              <tr style="background-color: #e3e3e3;">
                <td style="padding: 5px; border: 1px solid black;">Name:</td>
                <td style="padding: 5px; border: 1px solid black;">${data?.Name}</td>
              </tr>
              <tr>
                <td style="padding: 5px; border: 1px solid black;">Phone Number:</td>
                <td style="padding: 5px; border: 1px solid black;">${data.Phone}</td>
              </tr>
              <tr style="background-color: #e3e3e3;">
                <td style="padding: 5px; border: 1px solid black;">Make:</td>
                <td style="padding: 5px; border: 1px solid black;">${data.Make}</td>
              </tr>
              <tr>
                <td style="padding: 5px; border: 1px solid black;">Model:</td>
                <td style="padding: 5px; border: 1px solid black;">${data?.Model}</td>
              </tr>
              <tr style="background-color: #e3e3e3;">
                <td style="padding: 5px; border: 1px solid black;">Year:</td>
                <td style="padding: 5px; border: 1px solid black;">${data?.Year}</td>
              </tr>
              <tr>
                <td style="padding: 5px; border: 1px solid black;">Size:</td>
                <td style="padding: 5px; border: 1px solid black;">${data?.Size}</td>
              </tr>
              <tr style="background-color: #e3e3e3;">
                <td style="padding: 5px; border: 1px solid black;">Part:</td>
                <td style="padding: 5px; border: 1px solid black;">${data?.Part}</td>
              </tr>
            </tbody>
          </table>`
        })

        return NextResponse.json({ success: true })
        // return res.status(200).json({ success: true })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error })
        // return res.status(400).json({ message: error })
    }
}