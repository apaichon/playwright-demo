// petstore-parallel-tests.spec.js
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://petstore.swagger.io/v2';

test.describe.parallel('Petstore Swagger API Parallel Tests', () => {
  test('GET /pet/findByStatus - available pets', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/pet/findByStatus?status=available`);
    expect(response.ok()).toBeTruthy();
    const pets = await response.json();
    expect(Array.isArray(pets)).toBeTruthy();
    expect(pets.length).toBeGreaterThan(0);
  });

  test('GET /store/inventory', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/store/inventory`);
    expect(response.ok()).toBeTruthy();
    const inventory = await response.json();
    expect(typeof inventory).toBe('object');
    expect(Object.keys(inventory).length).toBeGreaterThan(0);
  });

  test('GET /user/login', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/user/login?username=testuser&password=testpass`);
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(typeof body.message).toBe('string');
    expect(body.message).toContain('logged in user session:');
  });

  test('GET /pet/{petId} - Pet not found', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/pet/99999999`);
    expect(response.status()).toBe(404);
    const body = await response.json();
    expect(body.message).toBe('Pet not found');
  });
});