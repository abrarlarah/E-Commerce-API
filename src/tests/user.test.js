const request = require('supertest');
const app = require('../app');

describe('User API', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({ username: 'testuser', email: 'test@example.com', password: 'password123' });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('username', 'testuser');
  });
});
