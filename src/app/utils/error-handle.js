// takes in the error name to check if its empty or not and assigns to dom
const displayErrorsOnClient = (error, dom) => {
    error ? dom = error : dom = ""
}
// takes in regex result as value and returns errorName in dom parameter
const handleRegexBasedErrors = (value, dom, errorName) => {
    value ? dom = "OK" : dom = `${errorName} Invalid`;
}

const handleEmptyInputs = (input, dom, errorName) => {
    input.length===0 ? dom = `${errorName} Cant Be Empty`: dom = ""
}

module.exports = { 
    handleEmptyInputs,
    displayErrorsOnClient,
    handleRegexBasedErrors
}