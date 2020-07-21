require("@babel/polyfill");
const supertest = require('supertest');
const server = require('../server/server');
const request = supertest(server);

it('Test if server returns 200', async done => {
	const res = await request.get('/');
	expect(res.status).toBe(200);
	done();
});