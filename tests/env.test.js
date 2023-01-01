require('dotenv').config()
test("Test ENV File", () => {
    expect(process.env.SESSION_SECRET).toBeDefined()
    expect(process.env.DB_PORT).toBeDefined()
    expect(process.env.UUID_NAMESPACE).toBeDefined()
    expect(process.env.SECURE_COOKIE).toBeDefined()
    expect(process.env.DB_HOST).toBeDefined()
})