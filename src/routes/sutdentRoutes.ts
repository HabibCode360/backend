import type { Express, Request, Response } from "express";
import express from "express";
import Student from "../model/Studets.js";

let app: Express = express();

app.post("/addStudent", (req: Request, res: Response) => {
  let { name, age, email } = req.body;
  console.log("Received student data:", { name, age, email });
  if (!name || !age || !email) {
    return res
      .status(400)
      .json({ message: "Name, age, and email are required" });
  }

  const newStudent = new Student({
    name,
    age,
    email,
    enrolledDate: new Date(),
  });

  newStudent
    .save()
    .then((student) => {
      res.status(201).json(student);
    })
    .catch((error) => {
        if (error.code === 11000) {
            console.error("Duplicate email error:");
            return res.status(400).json({ message: "Email already exists" });
        }
      res.status(500).json({ message: "Error saving student", error });
    });
});

app.get("/getStudents", async(req: Request, res: Response) => {
  let { email } : { email?: string } = req.query;
  if (email) {
   await Student.findOne({  email })
      .then((student) => {
        if (!student) {
          return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json(student);
      })
      .catch((error) => {
        res.status(500).json({ message: "Error retrieving student", error });
      });
  } else {
    await Student.find()
      .then((students) => {
        res.status(200).json(students);
      })
      .catch((error) => {
        res.status(500).json({ message: "Error retrieving students", error });
      });
  }
});

export default app;
