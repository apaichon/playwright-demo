import { test, expect } from '@playwright/test';

test.describe.parallel('Parallel Tests', () => {
  test('Login as standard user', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await login(page, 'standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('Login as problem user', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await login(page, 'problem_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('Add Sauce Labs Backpack to cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await login(page, 'standard_user', 'secret_sauce');
    await addItemToCart(page, 'sauce-labs-backpack');
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');
  });

  test('Add Sauce Labs Bike Light to cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await login(page, 'standard_user', 'secret_sauce');
    await addItemToCart(page, 'sauce-labs-bike-light');
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');
  });
});

async function login(page, username, password) {
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();
}

async function addItemToCart(page, itemName) {
  await page.locator(`[data-test="add-to-cart-${itemName}"]`).click();
}