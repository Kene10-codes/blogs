const request = require('supertest')
const db = require('../../services/db')
let server

describe('/api/user', () => {
    beforeAll(() => {
        server = require('../../index')
        db()
    })
    afterAll(() => server.close())
    // beforeAll(() => db())
    describe('GET /', () => {
        it('It should return all registered users', async () => {
            const res = await request(server).get('/api/user/get-users')
            expect(res.status).toBe(200)
        })
    })
})
