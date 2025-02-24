const { expect } = require('chai');

const { validateEmail, validatePassword, validatePhoneNumber } = require('../src/basic-functions.js');

describe("Tests For: validateEmail function", () => {
    it("should return true for a valid email", () => {
        const validEmail = "test@example.com";
        const result = validateEmail(validEmail);
        expect(result).to.be.true;
    });
});

describe("Tests For: validatePassword function", () => {
    it("should return true for a valid password", () => {
        const validPassword = "password123";
        const result = validatePassword(validPassword);
        expect(result).to.be.true;
    });
});


describe("Tests For: validatePhoneNumber function", () => {
    // test case 1
    it("should return true for a valid phone number", () => {
        const validPhoneNumber = "1234567890";
        const result = validatePhoneNumber(validPhoneNumber);
        expect(result).to.be.true;
    });
    // test case 2
    it("should return false for a phone number with a length other than 10 digits", () => {
        const invalidPhoneNumber = "123456789";
        const result = validatePhoneNumber(invalidPhoneNumber);
        expect(result).to.be.false;
    });
    // test case 3
    it("should return false for a phone number with non-digit characters", () => {
        const invalidPhoneNumber = "123abc4567";
        const result = validatePhoneNumber(invalidPhoneNumber);
        expect(result).to.be.false;
    });
});
