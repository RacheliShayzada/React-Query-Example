
import { updateDocument,deleteDocument, connectDatabase } from '@/services/mongo';
import { NextResponse } from 'next/server';

export async function PATCH(request, { params }) {
    const body = await request.json();
    const updatedCar = await updateDocument( "cars", params.id, body);
    return NextResponse.json(updatedCar, { status: 200 }); 
}

export async function DELETE(request, { params }) {
    const result = await deleteDocument( "cars", params.id);
    return NextResponse.json({ message: `Car with id ${params.id} deleted.` }, { status: 200 }); 
}