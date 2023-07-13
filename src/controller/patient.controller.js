import database from '../config/mysql.config.js';
import Response from '../domain/response.js';
import logger from '../util/logger.js';
import QUERY from '../query/patient.query.js';

const HttpStatus = {
    OK:{ code: 200, status: 'OK'},
    CREATED:{ code: 201, status: 'CREATED'},
    NO_CONTENT:{ code: 204, status: 'NO_CONTENT'},
    BAD_REQUEST:{ code: 400, status: 'BAD_REQUEST'},
    NOT_FOUND:{ code: 404, status: 'NOT_FOUND'},
    INTERNAL_SERVER:{ code: 500, status: 'INTERNAL_SERVER_ERROR'},
};

// creating all of our controller functions
// Performing CRUD operation


// calling the patient or getting all the patients
export const getPatients = (req,res)=> {
    logger.info(`${req.method} ${req.originalUrl}, fetching patients`);

     database.query(QUERY.SELECT_PATIENTS, (error, patients) => {
        if(!patients) {

            /*
                @dev  use this format if you are to send your data to the frontend
             **/
           res.status(HttpStatus.OK.code).json("no patient found")

           /* 
           @dev  uncomment this line if you are just testing on postman or thunderclient
           **/
            // res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `NO patients found`));
        }else {
             /*
                @dev  use this format if you are to send your data to the frontend
             **/
            res.status(HttpStatus.OK.code).json(patients)
             /* 
           @dev  uncomment this line if you are just testing on postman or thunderclient
           **/
           //res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Patients retrieved`, {patients: patients}));
        }
    });
};

// creating the patient
export const createPatient = (req,res)=> {
    logger.info(`${req.method} ${req.originalUrl}, creating patient`);
    database.query(QUERY.CREATE_PATIENT, Object.values(req.body), (error, patients) => {
        if(!patients) {
            logger.error(error.message);
            /* 
           @dev  uncomment this line if you are just testing on postman or thunderclient
           **/
           res.status(HttpStatus.INTERNAL_SERVER.code).json(patients)
            /* 
           @dev  uncomment this line if you are just testing on postman or thunderclient
                and comment the res.status(HttpStatus.INTERNAL_SERVER.code).json(patients)
           **/
           // res.status(HttpStatus.INTERNAL_SERVER.code)
           //  .send(new Response(HttpStatus.INTERNAL_SERVER.code, HttpStatus.INTERNAL_SERVER.status, `Error occurred`));
        }else {
            
            const patient = {id: patients.insertId, ...req.body, created_at: new Date()};
             /* 
           @dev  uncomment this line if you are just testing on postman or thunderclient
           **/
           res.status(HttpStatus.CREATED.code).json(patient)
            /* 
           @dev  uncomment this line if you are just testing on postman or thunderclient
                and comment the res.status(HttpStatus.INTERNAL_SERVER.code).json(patients)
           **/
          //  res.status(HttpStatus.CREATED.code).send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `Patients created`,  { patients } ));
            
        }
    });
};

// get just one patient
export const getPatient = (req,res)=> {
    logger.info(`${req.method} ${req.originalUrl}, fetching patient`);
    database.query(QUERY.SELECT_PATIENT, [req.params.id], (error, patients) => {
        if(!patients[0]) {
            res.status(HttpStatus.NOT_FOUND.code)
             .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Patient by id ${req.params.id} was not found`));
        }else {
            res.status(HttpStatus.OK.code)
                .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Patients retrieved`,   patients[0]));
        }
    });
};

// updating a patient
export const updatePatient = (req,res)=> {
    // we need to see if the patient exist in the database before updating the patient
    logger.info(`${req.method} ${req.originalUrl}, fetching patient`);
    database.query(QUERY.UPDATE_PATIENT, [req.params.is], (error, patients) => {
        if(!patients[0]) {
            res.status(HttpStatus.NOT_FOUND.code)
             .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Patient by id ${req.params.id} was not found`));
        }else {
            logger.info(`${req.method} ${req.originalUrl}, updating patient`);
            database.query(QUERY.UPDATE_PATIENT, [...Object.values(req.body),req.params.is], (error, patients) => {
                if(!error) {
                    res.status(HttpStatus.OK.code)
                        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Patients updated`,   {id: req.params.id, ...req.body}));
                }else{
                    logger.error(error.message);
                    res.status(HttpStatus.INTERNAL_SERVER.code)
                         .send(new Response(HttpStatus.INTERNAL_SERVER.code, HttpStatus.INTERNAL_SERVER.status, `Error occurred`));
                }
            });
        }
    });
};


// Delete a patient
export const deletePatient = (req,res)=> {
    logger.info(`${req.method} ${req.originalUrl}, deleting patient`);
    database.query(QUERY.DELETE_PATIENT, [req.params.id], (error, patients) => {
        if(patients.affectedRows > 0) {
            res.status(HttpStatus.OK.code)
            .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Patients delected`,   patients[0]));
        }else {
            res.status(HttpStatus.NOT_FOUND.code)
             .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Patient by id ${req.params.id} was not found`));
        }
    });
};

export default HttpStatus;
