import { pinata } from "@/config/config";
import { NextRequest, NextResponse } from "next/server";

const mainDomain = process.env.NEXT_PUBLIC_GATEWAY_UR;


export async function POST(request: NextRequest) {
    const data = await request.json();

    if (!data || typeof data !== 'object') {
        return NextResponse.json({
            error: "Invalid request data",
        }, { status: 400 });
    }

    const { name, symbol, image, description } = data;

    try {
        if (!name || !symbol || !image || !description) {
            return NextResponse.json({
                error: "All fields are required",
            }, { status: 400 });
        }

        const metadata = {
            name,
            symbol,
            description,
            image,
        };

        const { cid } = await pinata.upload.public.json(metadata, {
            metadata: {
                name: "metadata.json"
            }
        });
        // const url = await pinata.gateways.public.get(cid);
        const url = `https://${mainDomain}/ipfs/${cid}/metadata.json`;
        
        return NextResponse.json({ url } , { status: 200 });
    } catch (error) {
        return NextResponse.json({
            request: 'not work',
            error
        }, { status: 500 });
    }
    
}