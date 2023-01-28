const express = require('express')

test("Session Works", (req, res) => {
    expect(req.session.auth).toBeDefined()
})
test("User Session Is Created During Registration", () => {

})
test("User Session Is Created After Successful SignIn", () => {

})

test('User Session Is Deleted After LogOut', async () => {})
test('', async () => {})