
import { test, expect } from '@playwright/test';
import fs from 'fs';

const storageStatePath = 'storageState.json';

test.describe('SauceLab Checkout Process', () => {
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.saucedemo.com/');
    await login(page, 'standard_user', 'secret_sauce');
    await context.storageState({ path: storageStatePath });
    await context.close();
  });

  test.beforeEach(async ({ context }) => {
    // Check if the storageState file exists and is not empty
    if (fs.existsSync(storageStatePath) && fs.statSync(storageStatePath).size > 0) {
      await context.route('**/*', async route => {
        return route.continue();
      });
    } else {
      console.warn('Storage state file is missing or empty. Tests may fail.');
    }
  });

  test.use({ storageState: storageStatePath });

  test('Step 1: Add items to cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
   
    await addItemsToCart(page, ['sauce-labs-backpack', 'sauce-labs-fleece-jacket']);
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('2');
  });

  test('Step 2: Go to cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/cart.html/);
  });

  test('Step 3: Proceed to checkout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/cart.html');
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/checkout-step-one.html/);
  });

  test('Step 4: Fill checkout information', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/checkout-step-one.html');
    await fillCheckoutInfo(page, 'Apaichon', 'Punopas', '10540');
    await expect(page).toHaveURL(/checkout-step-two.html/);
  });

  test('Step 5: Complete checkout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/checkout-step-two.html');
    await page.locator('[data-test="finish"]').click();
    await expect(page).toHaveURL(/checkout-complete.html/);
  });

  test('Step 6: Verify success', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/checkout-complete.html');
    const successMessage = page.locator('.complete-header');
    await expect(successMessage).toHaveText('Thank you for your order!');
  });
});

async function login(page, username, password) {
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();
}

async function addItemsToCart(page, items) {
  for (const item of items) {
    await page.locator(`[data-test="add-to-cart-${item}"]`).click();
  }
}

async function fillCheckoutInfo(page, firstName, lastName, postalCode) {
  await page.locator('[data-test="firstName"]').fill(firstName);
  await page.locator('[data-test="lastName"]').fill(lastName);
  await page.locator('[data-test="postalCode"]').fill(postalCode);
  await page.locator('[data-test="continue"]').click();
}