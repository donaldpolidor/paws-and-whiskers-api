// test/oauth.test.js
const request = require('supertest');
const app = require('../app');

describe('OAuth Authentication Tests', () => {
  
  describe('GET /api/auth/google', () => {
    it('should redirect to Google login page', async () => {
      const res = await request(app).get('/api/auth/google');
      expect(res.statusCode).toBe(302); // Redirect
      expect(res.headers.location).toContain('accounts.google.com');
    });
  });

  describe('GET /api/auth/login/failed', () => {
    it('should return login failed message', async () => {
      const res = await request(app).get('/api/auth/login/failed');
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('error', 'Login failed');
    });
  });
});