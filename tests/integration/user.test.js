const request = require('supertest')
const db = require('../../services/db')
const server = require('../../index')

describe('/api/user', () => {
    beforeAll(async function () {
        await db()
    })
    describe('GET /', () => {
        it('It should return all registered users', async () => {
            const res = await request(server).get('/api/user/get-users')
            expect(res.status).toBe(200)
        })
    })
})
