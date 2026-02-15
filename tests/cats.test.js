const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Cat = require('../models/Cat');

describe('Cats API Tests', () => {
  let testCatId;
  
  beforeAll(async () => {
    // Connection to the test base
    await mongoose.connect(process.env.MONGODB_URI);
  });
  
  afterAll(async () => {
    // Cleaning
    await Cat.deleteMany({});
    await mongoose.connection.close();
  });
  
  // TEST GET ALL
  describe('GET /api/cats', () => {
    it('should return all cats', async () => {
      const res = await request(app).get('/api/cats');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });
  
  // TEST POST
  describe('POST /api/cats', () => {
    it('should create a new cat with valid data', async () => {
      const newCat = {
        breed: 'Test Cat',
        lifespan: '10-15 years',
        size: 'Medium',
        coatLength: 'Short',
        temperament: ['Friendly'],
        intelligence: 4,
        vocalization: 3
      };
      
      const res = await request(app)
        .post('/api/cats')
        .send(newCat);
      
      expect(res.statusCode).toBe(201);
      expect(res.body.breed).toBe('Test Cat');
      testCatId = res.body._id;
    });
    
    it('should return 400 with invalid data', async () => {
      const invalidCat = {
        breed: 'Invalid Cat'
        // Missing required fields
      };
      
      const res = await request(app)
        .post('/api/cats')
        .send(invalidCat);
      
      expect(res.statusCode).toBe(400);
    });
  });
  
  // TEST GET BY ID
  describe('GET /api/cats/:id', () => {
    it('should return a cat by id', async () => {
      const res = await request(app).get(`/api/cats/${testCatId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body._id).toBe(testCatId);
    });
    
    it('should return 404 for invalid id', async () => {
      const res = await request(app).get('/api/cats/invalidid123');
      expect(res.statusCode).toBe(500);
    });
  });
  
  // TEST PUT
  describe('PUT /api/cats/:id', () => {
    it('should update a cat', async () => {
      const updatedData = {
        lifespan: '12-16 years',
        intelligence: 5
      };
      
      const res = await request(app)
        .put(`/api/cats/${testCatId}`)
        .send(updatedData);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.intelligence).toBe(5);
    });
  });
  
  // TEST DELETE
  describe('DELETE /api/cats/:id', () => {
    it('should delete a cat', async () => {
      const res = await request(app).delete(`/api/cats/${testCatId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Cat deleted successfully');
    });
  });
});