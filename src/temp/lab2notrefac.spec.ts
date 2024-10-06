import { test, expect } from '@playwright/test';

test('Checkout Items', async ({ page }) => {
    // 1. Go to page
    // 2. Login
    // 3. Add to Cart
    // 4. Checkout
    // 5. Verify Checkout Page
    // 6. Success
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').click();
    await page.locator('[data-test="firstName"]').fill('Apaichon');
    await page.locator('[data-test="lastName"]').click();
    await page.locator('[data-test="lastName"]').fill('Punopas');
    await page.locator('[data-test="postalCode"]').click();
    await page.locator('[data-test="postalCode"]').fill('10540');
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="finish"]').click();
    await page.locator('[data-test="pony-express"]').click();
  });
