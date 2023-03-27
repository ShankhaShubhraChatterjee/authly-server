require('dotenv').config()
test("Test ENV File", () => {

    expect(process.env.DOMAIN).toBeDefined()
    expect(process.env.APP_URL).toBeDefined()
    expect(process.env.APP_PORT).toBeDefined()

    expect(process.env.DB_HOST).toBeDefined()
    expect(process.env.DB_PORT).toBeDefined()
    expect(process.env.DB_USER).toBeDefined()
    expect(process.env.DB_PASS).toBeDefined()
    expect(process.env.DB_NAME).toBeDefined()
    expect(process.env.DB_CONN).toBeDefined()
    
    expect(process.env.SESSION_SECRET).toBeDefined()
    expect(process.env.UUID_NAMESPACE).toBeDefined()

    expect(process.env.NODMAILER_HOST).toBeDefined()
    expect(process.env.NODMAILER_PORT).toBeDefined()
    expect(process.env.NODMAILER_EMAIL).toBeDefined()

    expect(process.env.IMAGEKIT_PUBLIC_KEY).toBeDefined()
    expect(process.env.IMAGEKIT_PRIVATE_KEY).toBeDefined()
    expect(process.env.IMAGEKIT_URL_ENDPOINT).toBeDefined()
    
    expect(process.env.OAUTH_CLIENT_ID).toBeDefined()
    expect(process.env.OAUTH_ACCESS_TOKEN).toBeDefined()
    expect(process.env.OAUTH_REDIRECT_URI).toBeDefined()
    expect(process.env.OAUTH_CLIENT_SECRET).toBeDefined()
    expect(process.env.OAUTH_REFRESH_TOKEN).toBeDefined()
    
})