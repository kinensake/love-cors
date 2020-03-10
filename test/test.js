const assert = require("assert");
const request = require("supertest");

describe("Some bypass Same-Origin Policy test", function(){
    this.timeout(10000);

    it ("fetch https://google.com", (done) => {
        request("http://localhost:3000")
            .get("/https://google.com")
            .expect(200, done);
    });

    it ("fetch json sample 1", (done) => {
        request("http://localhost:3000")
            .get("/https://jsonplaceholder.typicode.com/todos/1")
            .expect(200, {
                "userId": 1,
                "id": 1,
                "title": "delectus aut autem",
                "completed": false
            }, done);
    });

    it ("post sample", (done) => {
        request("http://localhost:3000")
            .post("/https://reqres.in/api/users")
            .set("content-type", "application/json")
            .send({
                "name": "morpheus",
                "job": "leader"
            })
            .expect(200)
            .then(res => {
                if (res.body.name === "morpheus") {
                    return done();
                }
                done({ 
                    error: "name is not match",
                    result: res.body.name,
                    expect: "morpheus"
                });
            })
            .catch(err => {
                done(err);
            })
    });
});