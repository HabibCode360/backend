import mongoose, { Schema, Document } from 'mongoose';

// Define the Student interface extending Document
export interface IStudent extends Document {
  name: string;
  age: number;
  email: string;
  enrolledDate: Date;
}

// Create a schema for the Student model
const StudentSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  enrolledDate: { type: Date, default: Date.now },
});

// Create and export the Student model
const Student = mongoose.model<IStudent>('Student', StudentSchema);
export default Student;