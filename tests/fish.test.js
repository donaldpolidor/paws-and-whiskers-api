// test/fish.test.js
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Fish = require('../models/Fish');

describe('Fish API Tests', () => {
  let testFishId;
  
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });
  
  afterAll(async () => {
    await Fish.deleteMany({});
    await mongoose.connection.close();
  });
  
  describe('GET /api/fish', () => {
    it('should return all fish', async () => {
      const res = await request(app).get('/api/fish');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });
  
  describe('POST /api/fish', () => {
    it('should create a new fish with valid data', async () => {
      const newFish = {
        species: 'Test Fish',
        lifespan: '2-5 years',
        size: 'Small',
        waterType: 'Freshwater',
        temperament: 'Peaceful',
        careLevel: 'Easy'
      };
      
      const res = await request(app)
        .post('/api/fish')
        .send(newFish);
      
      expect(res.statusCode).toBe(201);
      expect(res.body.species).toBe('Test Fish');
      testFishId = res.body._id;
    });
    
    it('should return 400 with invalid data', async () => {
      const invalidFish = {
        species: 'Invalid Fish'
      };
      
      const res = await request(app)
        .post('/api/fish')
        .send(invalidFish);
      
      expect(res.statusCode).toBe(400);
    });
  });
  
  describe('GET /api/fish/:id', () => {
    it('should return a fish by id', async () => {
      const res = await request(app).get(`/api/fish/${testFishId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body._id).toBe(testFishId);
    });
  });
  
  describe('PUT /api/fish/:id', () => {
    it('should update a fish', async () => {
      const updatedData = {
        temperament: 'Semi-aggressive',
        careLevel: 'Moderate'
      };
      
      const res = await request(app)
        .put(`/api/fish/${testFishId}`)
        .send(updatedData);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.careLevel).toBe('Moderate');
    });
  });
  
  describe('DELETE /api/fish/:id', () => {
    it('should delete a fish', async () => {
      const res = await request(app).delete(`/api/fish/${testFishId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Fish deleted successfully');
    });
  });
});