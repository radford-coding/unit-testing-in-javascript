const { expect } = require('chai');

const app = require('../server.js');

const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const User = require("../models/user");
const request = require('supertest');

const mockUserData = [
    {
        name: "Jane Doe",
        email: "janeDoe@mail.com",
        password: "password123",
        phoneNumber: "1234567890",
    },
];

before((done) => {
    mongoose.connect(process.env.MONGODB_URI);

    mongoose.connection.once("open", async () => {
        try {
            // Pass in the mock user data
            await User.create(mockUserData);
            done();
        } catch (error) {
            done(error);
        }
    });
});

describe("GET /users", () => {
    it("responds with JSON containing the list of users", (done) => {
        request(app)
            .get("/users")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err); // Notify Mocha about the error
                } else {
                    // Test the response body
                    expect(res.body.users).to.be.an("array"); // Expect users to be in an array
                    res.body.users.forEach((user) => {
                        expect(user).to.have.property("name").that.is.a("string");
                        expect(user).to.have.property("email").that.is.a("string");
                    });
                    done(); // Notify Mocha that the test is complete
                }
            });
    });
});

describe('POST /users', () => {
    it('adds a new user to the list', (done) => {
        const newUser = {
            name: 'John Smith',
            email: 'john@example.com',
            password: 'john123',
            phoneNumber: '9876543210'
        };

        request(app)
            .post('/users')
            .send(newUser)
            .expect('Content-Type', /json/)
            .expect(200)
            // Test the response from the server
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.user).to.be.an('object');
                expect(res.body.user).to.have.property('name', newUser.name);
                expect(res.body.user).to.have.property('email', newUser.email);
                done();
            });
    });
});

after((done) => {
    // On application close
    app.close(() => {
        // Drop the database
        mongoose.connection.db.dropDatabase(() => {
            // Close the database connection
            mongoose.connection.close();
        });
        // Tell Mocha we are done
        done();
    });
});
