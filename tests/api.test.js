const request = require('supertest');
const app = require('../index');

describe('Electricity API Endpoints', () => {
    // Test Case 1: Total Usage by Year
    it('should return total electricity usage for each year', async () => {
        const response = await request(app).get('/api/usage/total-by-year');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        // Assuming data has year 2566
        expect(response.body).toHaveProperty('2566');
        expect(typeof response.body['2566']).toBe('number');
    });

    // Test Case 2: Total Users by Year
    it('should return total electricity users for each year', async () => {
        const response = await request(app).get('/api/users/total-by-year');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        // Assuming data has year 2566
        expect(response.body).toHaveProperty('2566');
        expect(typeof response.body['2566']).toBe('number');
    });

    // Test Case 3: Usage by Province and Year
    it('should return usage data for a specific province and year', async () => {
        const response = await request(app).get('/api/usage/krabi/2566');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('province_name', 'Krabi');
        expect(response.body).toHaveProperty('year', 2566);
        expect(response.body).toHaveProperty('residential_kwh');
    });

    // Test Case 4: Users by Province and Year
    it('should return users data for a specific province and year', async () => {
        const response = await request(app).get('/api/users/krabi/2566');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('province_name', 'Krabi');
        expect(response.body).toHaveProperty('year', 2566);
        expect(response.body).toHaveProperty('residential_count');
    });

    // Test Case 5: Usage History for a Province
    it('should return usage history for a specific province', async () => {
        const response = await request(app).get('/api/usage-history/krabi');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('province_name', 'Krabi');
        expect(response.body[0]).toHaveProperty('year');
    });

    // Test Case 6: Users History for a Province
    it('should return users history for a specific province', async () => {
        const response = await request(app).get('/api/users-history/krabi');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('province_name', 'Krabi');
        expect(response.body[0]).toHaveProperty('year');
    });
});