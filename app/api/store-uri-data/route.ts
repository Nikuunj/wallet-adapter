import { url_model } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const data = await request.json();

    if (!data || typeof data !== 'object') {
        return NextResponse.json({
            error: "Invalid request data",
        }, { status: 400 });
    }

    const { key, name, symbol, image, description } = data;

    try {
        const res = await url_model.create({
            key: key || "No Key",
            name: name || "No Name Provided",
            symbol: symbol || "No Symbol Provided",
            image : image|| "No Image URL Provided",
            description: description || "No Description Provided"
        })

        return NextResponse.json({
            message: "Data stored successfully",
            id : res._id,
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            request: 'not work',
            error
        }, { status: 500 });
    }
    
}