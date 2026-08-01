
import type { Express } from "express";
import express from 'express'
import app_ from "./sutdentRoutes.js";
let app:Express = express()


app.use('/' , app_)



export default app

