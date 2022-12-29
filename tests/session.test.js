const express = require('express')

test("Check For Username In Session", (req, res) => {
    expect(req.session.auth).toBeDefined()
    expect(req.session.auth).toBeUndefined()
})