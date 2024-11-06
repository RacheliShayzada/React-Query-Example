import { getAllDocuments,insertDocument, connectDatabase } from '@/services/mongo';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const documents = await getAllDocuments("users");
  return NextResponse.json(documents);
}

export async function POST(request) {
  const body = await request.json();
  const newCar = await insertDocument( "users", body);
  return NextResponse.json(newCar, { status: 201 }); // החזרת הסטטוס 201 ליצירה מוצלחת
}
