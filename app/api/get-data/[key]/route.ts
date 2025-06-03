import { url_model } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

type ContextType = {
    params: Promise<{
        key: string;
    }>;
};

export async function GET(request: NextRequest,   context: ContextType) {
    const { key } = await context.params;
    const uri_data = await url_model.findOne({
        key
    })

    console.log('uri_data', uri_data);
    return NextResponse.json({
        name: uri_data?.name || '',
        symbol: uri_data?.symbol || '',
        description: uri_data?.description || '',
        image: uri_data?.image || '',
    });
}
