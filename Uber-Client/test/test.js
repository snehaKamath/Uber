/**
 * New node file
 */

var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where our server is running.
var server = supertest.agent("http://localhost:3000");

//All Unit tests will begin now
describe("First Unit Test For Uber",function(){

  // #1 should return home page

  it("Should Return Home Page",function(done){

    // calling home page api
    server
    .get("/")
    .expect(200) // This is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      should(res.status).equal(200);
      // Error key should be false.
      //should(res.body.error).equal(false);
      done();
    });
  });

  var driver_data=[];
  driver_data.push("12345");
  driver_data.push("Harish");
  driver_data.push("Kumar");
  driver_data.push("123456");
  driver_data.push("scope@asdsa");
  
  var phone=Number("12345678956");
  driver_data.push(phone);
  driver_data.push("95685");
  driver_data.push("90234");
  driver_data.push("CA");
  driver_data.push("CA");
  driver_data.push("CA");
  driver_data.push("Maruthi");
  driver_data.push("007");
  driver_data.push("");
  
  it("Creating Driver",function(done){
	 this.timeout(15000);

    // calling home page api
    server
    .post("/driverSignUp")
    .send({"data":driver_data})
    .end(function(err,res){
      // HTTP status should be 200
      console.log(res.body.statusCode);
      console.log(res.body.message);
      should(res.body.statusCode).equal(200);
      //Error key should be false.
      should(res.body.message).equal("success");
      done();
    });
  }); 
  
  it("Should Return Home Page", function(done){

	    // calling home page api
	    server
	    .get("/")
	    .expect(200) // This is HTTP response
	    .end(function(err,res){
	      // HTTP status should be 200
	      console.log(res);
	      should(res.status).equal(200);
	      // Error key should be false.
	      //should(res.body.error).equal(false);
	      done();
	    });
	  });
});
