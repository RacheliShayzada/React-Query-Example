"use server";
import { MongoClient, ObjectId } from "mongodb";

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

export async function connectDatabase() {
   if (!client) {
       const dbConnectionString = process.env.PUBLIC_DB_CONNECTION;
       if (!dbConnectionString) {
           throw new Error('Database connection string is not defined');
       }
       client = new MongoClient(dbConnectionString);
       clientPromise = client.connect();
   }
   return clientPromise;
}

export async function insertDocument(collection: string, document: object) {
    const client = await connectDatabase();
   const db = client.db('DB01');
   const result = await db.collection(collection).insertOne(document);
   return result;
}

export async function getAllDocuments( collection: string) {
    const client = await connectDatabase();
    const db = client.db('DB01');
    const documents = await db.collection(collection).find().toArray();
    return documents;
 }
 
 // פונקציה לעדכון מסמך לפי ID
export async function updateDocument( collection: string, id: string, updatedDocument: object) {
    const client = await connectDatabase();
    const db = client.db('DB01');
    const result = await db.collection(collection).updateOne(
        { _id: new ObjectId(id) }, // חיפוש לפי ה-ID
        { $set: updatedDocument }   // עדכון השדות המבוקשים
    );
    return result;
}

// פונקציה למחיקת מסמך לפי ID
export async function deleteDocument( collection: string, id: string) {
    const client = await connectDatabase();
    const db = client.db('DB01');
    const result = await db.collection(collection).deleteOne({ _id: new ObjectId(id) }); // מחיקת המסמך לפי ה-ID
    return result;
}
