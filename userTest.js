const request = require('supertest');
const app = require('./app');

describe('User API', () => {
  it('should get all users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should create a new user', async () => {
    const newUser = { name: 'Aman Chopra', email: 'amanchopra.atg@gmail.com' };
    const response = await request(app)
      .post('/api/users')
      .send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newUser.name);
  });

  it('should get a user by ID', async () => {
    const userId = '123';
    const response = await request(app).get(`/api/users/${userId}`);
    if (response.status === 200) {
      expect(response.body).toHaveProperty('id', userId);
    } else {
      expect(response.status).toBe(404);
    }
  });

  it('should update a user', async () => {
    const userId = '123';
    const updatedUser = { name: 'Aman Chopra', email: 'amanchopra.atg@gmail.com' };
    const response = await request(app)
      .put(`/api/users/${userId}`)
      .send(updatedUser);
    if (response.status === 200) {
      expect(response.body.name).toBe(updatedUser.name);
    } else {
      expect(response.status).toBe(404);
    }
  });

  it('should delete a user', async () => {
    const userId = '123';
    const response = await request(app).delete(`/api/users/${userId}`);
    expect([204, 404]).toContain(response.status);
  });
});
