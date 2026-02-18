// test/dogs.test.js
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Dog = require('../models/Dog');

describe('Dogs API Tests', () => {
  let testDogId;
  
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });
  
  afterAll(async () => {
    await Dog.deleteMany({});
    await mongoose.connection.close();
  });
  
  describe('GET /api/dogs', () => {
    it('should return all dogs', async () => {
      const res = await request(app).get('/api/dogs');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });
  
  describe('POST /api/dogs', () => {
    it('should create a new dog with valid data', async () => {
      const newDog = {
        breed: 'Test Dog',
        lifespan: '10-12 years',
        size: 'Medium',
        energyLevel: 4,
        temperament: ['Friendly'],
        goodWithKids: true,
        shedding: 'Medium'
      };
      
      const res = await request(app)
        .post('/api/dogs')
        .send(newDog);
      
      expect(res.statusCode).toBe(201);
      expect(res.body.breed).toBe('Test Dog');
      testDogId = res.body._id;
    });
    
    it('should return 400 with invalid data', async () => {
      const invalidDog = {
        breed: 'Invalid Dog'
      };
      
      const res = await request(app)
        .post('/api/dogs')
        .send(invalidDog);
      
      expect(res.statusCode).toBe(400);
    });
  });
  
  describe('GET /api/dogs/:id', () => {
    it('should return a dog by id', async () => {
      const res = await request(app).get(`/api/dogs/${testDogId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body._id).toBe(testDogId);
    });
  });
  
  describe('PUT /api/dogs/:id', () => {
    it('should update a dog', async () => {
      const updatedData = {
        energyLevel: 5,
        goodWithKids: true
      };
      
      const res = await request(app)
        .put(`/api/dogs/${testDogId}`)
        .send(updatedData);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.energyLevel).toBe(5);
    });
  });
  
  describe('DELETE /api/dogs/:id', () => {
    it('should delete a dog', async () => {
      const res = await request(app).delete(`/api/dogs/${testDogId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Dog deleted successfully');
    });
  });
});