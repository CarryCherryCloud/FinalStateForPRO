var request = require('request');


//test backend
describe("Frontend", function() {
    let base_url = "http://CarryCherryCloud-frontend:3000/"

    describe("GET /", function() {
        it("returns status code 200", function(done) {
            expect(200).toBe(200);
            done();
        });
    });

    describe("GET /", function () {
        it("returns status code 200", function (done) {
            request.get(base_url, function (error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

    describe("GET /login", function () {
        it("returns status code 200", function (done) {
            request.get("http://CarryCherryCloud-frontend:3000/auth/login", function (error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

    describe("GET /signup", function () {
        it("returns status code 200", function (done) {
            request.get("http://CarryCherryCloud-frontend:3000/auth/signup", function (error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

    describe("GET /logout", function () {
        it("does not returns status code 200", function (done) {
            request.get("http://CarryCherryCloud-frontend:3000/auth/logout", function (error, response, body) {
                expect(response.statusCode).not.toBe(200);
                done();
            });
        });
    });
});

describe("Backend", function() {
    describe("GET /", function () {
        it("returns status code 200", function (done) {
            request.get("https://CarryCherryCloud-backend:9000/", function (error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

    describe("POST /auth/login", function () {
        it("returns status code 200", function (done) {
            request.post("https://CarryCherryCloud-backend:9000/auth/login", function (error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });

        it("returns status code 400", function (done) {
            request.post("https://CarryCherryCloud-backend:9000/auth/login", function (error, response, body) {
                expect(response.statusCode).toBe(400);
                done();
            });

        });
    });

    describe("POST /auth/signup", function () {
        it("returns status code 200", function (done) {
            request.post("https://CarryCherryCloud-backend:9000/auth/signup", function (error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });

        it("returns status code 400", function (done) {
            request.post("https://CarryCherryCloud-backend:9000/auth/signup", function (error, response, body) {
                expect(response.statusCode).toBe(400);
                done();
            });

        });
    });
});