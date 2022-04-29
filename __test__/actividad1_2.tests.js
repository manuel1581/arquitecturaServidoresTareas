
const app = require("../app");
const request = require("supertest");



test(`null filter values`, async () => {
  const res = await request(app)
   .get(
    '/api/employees/Sue'
   )
   .expect(200);
  //console.log(res.body);
  
  expect(res.body[0]["name"]).toEqual("Sue")
  //expect(res.body && res.body.data).toStrictEqual([{ 'Foo.bar': 42 }]);
 });


 test(`null filter values`, async () => {
  const res = await request(app)
   .get(
    '/api/employees/Sue'
   )
   .expect(200);
  //console.log(res.body[0]["name"]);
  
  //expect(res.body[0]["name"]).toEqual("Sue")
  //expect(res.body && res.body.data).toStrictEqual([{ 'Foo.bar': 42 }]);
 });


/*
describe('gae_flex_node_static_files', () => {
  it('should be listening', async () => {
   const res = await request(app).get('/')
   
   expect(res.statusCode).toEqual(200);


  });
 });
 
*/

