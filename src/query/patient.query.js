// create all of queries we use in the controllers

const QUERY ={

    // decided to limit the amount of fetch from every entry in a table
    // we get the first 100 patients from the table
    SELECT_PATIENTS: 'SELECT * FROM patients ORDER BY created_at DESC LIMIT 100',
    
    // we selecting one(1) patient
    // related to params.{id} in mongodb database
    SELECT_PATIENT: 'SELECT * FROM patients WHERE id=?',

    // WE creating a patient and pass all the patient properties and pass the values
    CREATE_PATIENT: 'INSERT INTO patients(first_name, last_name,email,address, diagnosis ,phone, image_url) VALUES (?, ?, ?, ?, ?, ?,?)',

    // we updating patient details by passing patient properties
    UPDATE_PATIENT: 'UPDATE patients SET first_name=?, last_name=?,email=?,address=?, diagnosis=?, image_url=? ',

    // delecting patient when id matches the request params id
    DELETE_PATIENT: 'DELETE FROM patients WHERE id =?'
}

export default QUERY;
