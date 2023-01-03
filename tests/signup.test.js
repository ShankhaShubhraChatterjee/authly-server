const { validateUserInputs } = require('./../src/app/utils/validate');


let regex = new RegExp(/^[a-zA-Z]{1,100}[0-9]{1,100}/img)
let userInput1 = "foss123"
let userInput2 = "foss123"

test('Check Input Validator Function', () => {
    expect(validateUserInputs(regex.test(userInput1))).toBeTruthy();
})