import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: "No file uploaded" },
                { status: 400 }
            );
        }

        console.log(`Received file: ${file.name} (${file.type}) - ${file.size} bytes`);

        // Forward the file to the Python service
        const pythonFormData = new FormData();
        pythonFormData.append('file', file);

        const response = await fetch('http://0.0.0.0:8000/convert', {
            method: 'POST',
            body: pythonFormData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Python service error:", errorText);
            return NextResponse.json(
                { error: `Docling service failed: ${errorText}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        console.log(`Successfully converted ${file.name}. Preview: ${data.markdown?.substring(0, 100)}...`);

        return NextResponse.json({
            message: "File processed successfully",
            filename: data.filename,
            markdown: data.markdown
        });

    } catch (error) {
        console.error("Error handling upload:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
