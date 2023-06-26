import mongoose from 'mongoose';
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function connectDB() {
  try {
      await mongoose.connect(process.env.CONNECTION_STRING as string)
      console.log(`Successfully connected to database. DATABASE: ${mongoose.connection.name} HOST: ${mongoose.connection.host}`)
  } catch (error: any) {
      throw new Error(error)
  }
}