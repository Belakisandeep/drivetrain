import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    // service: 'hostinger',
    secure: false,
    secureConnection: false,
    tls: {
        ciphers: "SSLv3",
    },
    requireTLS: true,
    port: 587,
    debug: true,
    connectionTimeout: 10000,
    auth: {
        user: 'apptexit@apptexit.com',
        pass: 'asap@123USA'
    }
})

export const mailOptions = {
    from: 'apptexit@apptexit.com',
    to: 'admin@apptexit.com',
    // cc: 'nidhish@iqlect.com'
}