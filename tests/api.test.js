const request = require('supertest');
const app = require('../index');

describe('API 1: /api/usage/total-by-year', () => {
    // Valid case: Return total electricity usage for each year
    it('should return total electricity usage for each year (valid)', async () => {
        const response = await request(app).get('/api/usage/total-by-year');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('2566');
        expect(typeof response.body['2566']).toBe('number');
    });

    // Invalid case: POST method not allowed
    it('should return 404 for POST method (invalid)', async () => {
        const response = await request(app).post('/api/usage/total-by-year');
        expect(response.status).toBe(404);
    });
});

describe('API 2: /api/users/total-by-year', () => {
    // Valid case: Return total electricity users for each year
    it('should return total electricity users for each year (valid)', async () => {
        const response = await request(app).get('/api/users/total-by-year');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('2566');
        expect(typeof response.body['2566']).toBe('number');
    });

    // Invalid case: POST method not allowed
    it('should return 404 for POST method (invalid)', async () => {
        const response = await request(app).post('/api/users/total-by-year');
        expect(response.status).toBe(404);
    });
});

describe('API 3: /api/usage/:province/:year', () => {
    // Valid case: Return usage data for a specific province and year
    it('should return usage data for a specific province and year (valid)', async () => {
        const response = await request(app).get('/api/usage/krabi/2566');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('province_name', 'Krabi');
        expect(response.body).toHaveProperty('year', 2566);
        expect(response.body).toHaveProperty('residential_kwh');
    });

    // Invalid case: Invalid province returns not found message
    it('should return not found message for invalid province (invalid)', async () => {
        const response = await request(app).get('/api/usage/invalidprovince/2566');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Data not found');
    });
});

describe('API 4: /api/users/:province/:year', () => {
    // Valid case: Return user count data for a specific province and year
    it('should return users data for a specific province and year (valid)', async () => {
        const response = await request(app).get('/api/users/krabi/2566');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('province_name', 'Krabi');
        expect(response.body).toHaveProperty('year', 2566);
        expect(response.body).toHaveProperty('residential_count');
    });

    // Invalid case: Invalid province returns not found message
    it('should return not found message for invalid province (invalid)', async () => {
        const response = await request(app).get('/api/users/invalidprovince/2566');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Data not found');
    });
});

describe('API 5: /api/usage-history/:province', () => {
    // Valid case: Return usage history for a specific province
    it('should return usage history for a specific province (valid)', async () => {
        const response = await request(app).get('/api/usage-history/krabi');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('province_name', 'Krabi');
        expect(response.body[0]).toHaveProperty('year');
    });

    // Invalid case: Invalid province returns empty array
    it('should return empty array for invalid province (invalid)', async () => {
        const response = await request(app).get('/api/usage-history/invalidprovince');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(0);
    });
});

describe('API 6: /api/users-history/:province', () => {
    // Valid case: Return user history for a specific province
    it('should return users history for a specific province (valid)', async () => {
        const response = await request(app).get('/api/users-history/krabi');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('province_name', 'Krabi');
        expect(response.body[0]).toHaveProperty('year');
    });

    // Invalid case: Invalid province returns empty array
    it('should return empty array for invalid province (invalid)', async () => {
        const response = await request(app).get('/api/users-history/invalidprovince');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(0);
    });
});