// test/birds.test.js
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Bird = require('../models/Bird');

describe('Birds API Tests', () => {
  let testBirdId;
  
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });
  
  afterAll(async () => {
    await Bird.deleteMany({});
    await mongoose.connection.close();
  });
  
  describe('GET /api/birds', () => {
    it('should return all birds', async () => {
      const res = await request(app).get('/api/birds');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });
  
  describe('POST /api/birds', () => {
    it('should create a new bird with valid data', async () => {
      const newBird = {
        species: 'Test Bird',
        lifespan: '5-10 years',
        size: 'Small',
        color: 'Blue',
        talkingAbility: 3,
        flightAbility: 'Excellent',
        temperament: ['Friendly', 'Active']
      };
      
      const res = await request(app)
        .post('/api/birds')
        .send(newBird);
      
      expect(res.statusCode).toBe(201);
      expect(res.body.species).toBe('Test Bird');
      testBirdId = res.body._id;
    });
    
    it('should return 400 with invalid data', async () => {
      const invalidBird = {
        species: 'Invalid Bird'
      };
      
      const res = await request(app)
        .post('/api/birds')
        .send(invalidBird);
      
      expect(res.statusCode).toBe(400);
    });
  });
  
  describe('GET /api/birds/:id', () => {
    it('should return a bird by id', async () => {
      const res = await request(app).get(`/api/birds/${testBirdId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body._id).toBe(testBirdId);
    });
  });
  
  describe('PUT /api/birds/:id', () => {
    it('should update a bird', async () => {
      const updatedData = {
        color: 'Red',
        talkingAbility: 4
      };
      
      const res = await request(app)
        .put(`/api/birds/${testBirdId}`)
        .send(updatedData);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.talkingAbility).toBe(4);
    });
  });
  
  describe('DELETE /api/birds/:id', () => {
    it('should delete a bird', async () => {
      const res = await request(app).delete(`/api/birds/${testBirdId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Bird deleted successfully');
    });
  });
});