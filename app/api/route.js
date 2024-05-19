
// const QRcode = require('qrcode');

// import { headers } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req) {
//     const url = 'https://www.freecodecamp.org/news/build-a-qr-code-generator-using-nodejs-nextjs-azure-blob-storage/#how-to-set-up-azure-blob-storage';
//     return new Promise((resolve, reject) => {
//         QRcode.toDataURL(url, (err, qrCodeUrl) => {
//             if (err) {
//                 resolve(NextResponse.json({ error: err }));
//             } else {
//                 resolve(NextResponse.json(qrCodeUrl));
//             }
//         });
//     });
// }

// async function generateQRCode(url) {
//     return new Promise((resolve, reject) => {
//         QRcode.toDataURL(url, (err, qrCodeUrl) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(qrCodeUrl);
//             }
//         });
//     });
// }

// export async function POST(req) {
//     const url = await req.json();
//     if (!url) {
//         const message  = 'fuck u';
//         return new Response(JSON.stringify(message), {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             status: 201,
//         });
//     }else{
//         const qrUri = await generateQRCode(url);
//         return new Response(JSON.stringify(qrUri), {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             status: 201,
//         });
//     }
//     // return new Response(JSON.stringify(message),{
//     //         headers: {
//     //             "Content-Type": "application/json",
//     //         },
//     //         status: 201,
//     //     })
// }


const QRcode = require('qrcode');
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req) {
    const url = 'https://www.freecodecamp.org/news/build-a-qr-code-generator-using-nodejs-nextjs-azure-blob-storage/#how-to-set-up-azure-blob-storage';
    try {
        const qrCodeUrl = await QRcode.toDataURL(url);
        return NextResponse.json({ qrCodeUrl });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

async function generateQRCode(url) {
    return new Promise((resolve, reject) => {
        QRcode.toDataURL(url, (err, qrCodeUrl) => {
            if (err) {
                reject(err);
            } else {
                resolve(qrCodeUrl);
            }
        });
    });
}

export async function POST(req) {
    try {
        const { url } = await req.json();
        if (!url) {
            return new Response(JSON.stringify({ error: 'URL is required' }), {
                headers: { 'Content-Type': 'application/json' },
                status: 400,
            });
        }

        const qrUri = await generateQRCode(url);
        return new Response(JSON.stringify({ qrCodeUrl: qrUri }), {
            headers: { 'Content-Type': 'application/json' },
            status: 201,
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
}
