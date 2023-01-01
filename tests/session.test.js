const express = require('express')

test("Check For Session", (req, res) => {
    expect(req.session.auth).toBeDefined()
    expect(req.session.auth).toBeUndefined()
})