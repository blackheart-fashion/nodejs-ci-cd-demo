const request = require('supertest');
const app = require('../src/server');

describe('GET /health', () => {
  it('should return 200 OK', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'OK');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('service', 'nodejs-express-app');
  });
});

describe('GET /', () => {
  it('should return API information', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Node.js Express API');
    expect(response.body.endpoints).toHaveProperty('health', '/health');
  });
});

describe('404 handling', () => {
  it('should return 404 for unknown routes', async () => {
    const response = await request(app).get('/unknown');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Route not found');
  });
});
