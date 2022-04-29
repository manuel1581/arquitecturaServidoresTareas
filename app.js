
const express = require("express");
let employeesJson = require("./employees.json");
//const employeesJson = require("employees.json");


const app = express();

app.get("/", (req, res, next) =>{
    res.status(200).send("hola mundo!")

});

app.get("/api/employees", (req, res, next) =>{


    //console.log(req.query)
    //res.status(200).json({"message": "hello world!"})
    const isQueryEmpty = Object.keys(req.query).length === 0
    //console.log(isQueryEmpty)
    if(isQueryEmpty){
        //console.log("if")
        res.json(employeesJson);
    }
    else{


        //console.log(Object.keys(req.query))
        
        const queryKeys = Object.keys(req.query)

        if (queryKeys.length===1 && "page"===queryKeys[0]){
            const employeesArray = Object.entries(employeesJson)
            const N = req.query["page"]
            const slices = [2 * (N - 1), 2 * (N - 1)+1]

            const employeesArraySliced = employeesArray.slice(slices[0],slices[1]+1)
            objectEmployeesArraySliced = Object.fromEntries(employeesArraySliced)
            res.json(objectEmployeesArraySliced)
        } 

        else if ( queryKeys.length===1 && "user"===queryKeys[0]) {

            let oldest = 0
            let toReturn = []
            let isQueryUser = (req.query["user"]==="true")
            
            if (isQueryUser){

                for (let i = 0; i<employeesJson.length; i++){
                    //console.log(i)
                    let isUser = employeesJson[i]["privileges"] === "user"
                    //console.log(employeesJson[i]["privileges"], isUser, isQueryUser)
                    if (isUser === isQueryUser){
                        //console.log(employeesJson[i]["privileges"], isQueryUser)
                        toReturn.push(employeesJson[i])
                    }
            
                }
    
                res.json(toReturn)
    

            }

            else {

                res.send("Wrong user search")

            }

        }


        else if ( queryKeys.length===1 && "badges"===queryKeys[0]) {


            let isQueryBlack = (req.query["badges"]==="black")
            let toReturn = []

            if (isQueryBlack){

                for (let i = 0; i<employeesJson.length; i++){

                    let isBadgesBlack = employeesJson[i]["badges"].includes("black")
                    if (isBadgesBlack){

                        toReturn.push(employeesJson[i])
                    }

                }
                res.json(toReturn)

            }
            else {
                res.send("Wrong badges search")

            }


            }





        else{
            res.send("no existe")
        }

    
        //console.log(employeesArray)
        //let array = [5,10,15,20,25,30,35]
        
        
        



    }
    


});





app.get("/api/employees/oldest", (req, res, next) =>{

    let oldest = 0
    let finalIndex = undefined
    for (let i = 0; i<employeesJson.length; i++){
        let tempAge = employeesJson[i]["age"]
        if (oldest<tempAge){
            oldest = tempAge
            finalIndex = i
        }

    }
    //console.log(oldest)
    //console.log(employeesJson[finalIndex])
    res.json(employeesJson[finalIndex])




});



//Reference: https://dev.to/reiallenramos/create-an-express-api-static-and-dynamic-routes-33lb
app.get("/api/employees/:name", (req, res, next) =>{


    let name = req.params.name
    let toReturn = []
    
    for (let i = 0; i<employeesJson.length; i++){
        let tempName = employeesJson[i]["name"]
        if (name === tempName){
            toReturn.push(employeesJson[i])
        }

    }
    
    res.json(toReturn)




});



//Reference: https://masteringjs.io/tutorials/express/post
// Parse JSON bodies for this app. Make sure you put
// `app.use(express.json())` **before** your route handlers!
app.use(express.json());

app.post("/api/employees",  (req, res, next) => {

    
    const req_body = req.body
    const req_body_keys = Object.keys(req_body)
    //const example_body_keys = 
    const must_keys = ["name", "phone", "privileges", "favorites", "finished", "badges", "points"]

    let isPostCorrect = true
    //console.log("algo.....")

    for (let i = 0; i<req_body_keys.length; i++){

        let temp_test = must_keys.includes(req_body_keys[i])
        //let temp_test = req_body_keys.includes(must_keys[i])
        //console.log(temp_test, must_keys[i])
        if (temp_test === false){
            isPostCorrect = false
        }

    }

    for (let i = 0; i<must_keys.length; i++){

        let temp_test = req_body_keys.includes(must_keys[i])
        //let temp_test = req_body_keys.includes(must_keys[i])
        //console.log(temp_test, must_keys[i])
        if (temp_test === false){
            isPostCorrect = false
        }

    }


    if (isPostCorrect){
        //console.log("ESTA SUPER BIEN!")
        res.status(200).send("correcto")
        employeesJson.push(req_body)

    }
    else {
        res.status(400).json({"code": "bad_request!"})
    }

    


});


module.exports = app


