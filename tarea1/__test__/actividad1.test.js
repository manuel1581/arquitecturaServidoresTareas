
const app = require("../app");
const request = require("supertest");
let employeesJson = require("../employees.json");



test(`Test original json`, async () => {
  const res = await request(app)
   .get(
    '/api/employees'
   )
  
  //console.log(res.body[0]["name"]);

  expect(res.body).toStrictEqual(employeesJson)
  
  //expect(res.body[0]["name"]).toEqual("Sue")
  //expect(res.body && res.body.data).toStrictEqual([{ 'Foo.bar': 42 }]);
 });

 

test(`Query Pages`, async () => {
const res1 = await request(app)
  .get(
  '/api/employees?page=1'
  )

const res2 = await request(app)
.get(
'/api/employees?page=2'
)


const res1_body = Object.keys(res1.body)
const res2_body = Object.keys(res2.body)

//console.log(res.body);

expect(res1_body).toEqual(["0", "1"])
expect(res2_body).toEqual(["2", "3"])
//expect(res.body && res.body.data).toStrictEqual([{ 'Foo.bar': 42 }]);
});


test(`Check oldest, must be 43`, async () => {
  const res = await request(app)
   .get(
    '/api/employees/oldest'
   )
  
  expect(res.body["age"]).toStrictEqual(43)
  
 });

 test(`Privileges must be user`, async () => {
  const res = await request(app)
   .get(
    '/api/employees?user=true'
   )
  
  //console.log(res.body[0]["name"]);
  const res_body = res.body
  let isUser = true
  for (let i = 1; i<res_body.length; i++){

    if (res_body[i]["privileges"] !== "user"){
      isUser = false
    }

  }

  expect(isUser).toEqual(true)
  
  //expect(res.body[0]["name"]).toEqual("Sue")
  //expect(res.body && res.body.data).toStrictEqual([{ 'Foo.bar': 42 }]);
 });



 test(`Post a good object`, async () => {
  
  const toSend = {
    "name":"Manuel",
    "phone": "334234",
    "privileges": "admin",
    "favorites": ["cosa1", "cosa2"],
    "finished": true,
    "badges": ["blue", "black"],
    "points": []
  }
  const res = await request(app)
   .post(
    '/api/employees'
   ).send(toSend).expect(200)
  
   //console.log(res.body)
   //expect(res.body).toStrictEqual("correcto")
  
 });



 test(`Post bad object`, async () => {
  
  const toSend1 = {
    //"name":"Manuel",
    "phone": "334234",
    "privileges": "admin",
    "favorites": ["cosa1", "cosa2"],
    //"finished": true,
    "badges": ["blue", "black"],
    "points": []
  }

  const toSend2 = {
    "name":"Manuel",
    "phone": "334234",
    "privileges": "admin",
    "favorites": ["cosa1", "cosa2"],
    "finished": true,
    "badges": ["blue", "black"],
    "points": [],
    "unoMas": 123
  }
  const res1 = await request(app)
   .post(
    '/api/employees'
   ).send(toSend1).expect(400)

   const res2 = await request(app)
   .post(
    '/api/employees'
   ).send(toSend2).expect(400)
  
   //console.log(res.body)
   //expect(res.body).toStrictEqual("correcto")
  
 });
/*
{
    "name":"Manuel",
    "phone": "334234",
    "privileges": "admin",
    "favorites": ["cosa1", "cosa2"],
    "finished": true,
    "badges": ["blue", "black"],
    "points": []
}
*/





test(`Searching NAME = Sue`, async () => {
  const res = await request(app)
   .get(
    '/api/employees/Sue'
   )
   .expect(200);
  //console.log(res.body);
  
  expect(res.body[0]["name"]).toEqual("Sue")
  //expect(res.body && res.body.data).toStrictEqual([{ 'Foo.bar': 42 }]);
 });


 test(`Searching NAME = Bob`, async () => {
  const res = await request(app)
   .get(
    '/api/employees/Bob'
   )
   .expect(200);
  //console.log(res.body[0]["name"]);

  expect(res.body[0]["name"]).toEqual("Bob")
  
  //expect(res.body[0]["name"]).toEqual("Sue")
  //expect(res.body && res.body.data).toStrictEqual([{ 'Foo.bar': 42 }]);
 });



