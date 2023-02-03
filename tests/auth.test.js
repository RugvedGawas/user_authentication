const auth = require("../middleware/auth");

describe("auth", function(){
    it("Should exist", function(){
        expect(auth).toBeDefined();
    });
    it("Should be a function", function(){
        expect(typeof auth).toBe("function");
    });
});