import express from "express";
import dotenv from "dotenv";
import ip from "ip";
import cors from "cors";
import Response from "./domain/response.js";
import logger from './util/logger.js';
import HttpStatus from "./controller/patient.controller.js";
import patientRoutes from "./route/patient.route.js";
dotenv.config();

const PORT = process.env.SERVER_PORT || 3000;

const app = express();

app.use(cors({origin: '*' }));

app.use(express.json());

// middleware routes
app.use('/patients', patientRoutes);

// initialising the class
app.get("/", (req,res)=> res.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Patient API, v1.0.0 - All Systems Go')));
app.all("*", (req,res)=> res.status(HttpStatus.NOT_FOUND.code)
    .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Route does not exist on the server')));



app.listen(PORT,()=>
    logger.info(`Server running on IPAdrress: ${ip.address()}:  and Port : ${PORT}`)
);


