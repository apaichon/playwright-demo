import { test, expect } from '@playwright/test';

test('Checkout Items', async ({ page }) => {
  // 1. Go to page
  await page.goto('https://www.saucedemo.com/');

  // 2. Login
  await login(page, 'standard_user', 'secret_sauce');

  // 3. Add to Cart
  await addItemsToCart(page, ['sauce-labs-backpack', 'sauce-labs-fleece-jacket']);

  // 4. Checkout
  await startCheckout(page);

  // 5. Fill Checkout Information
  await fillCheckoutInfo(page, 'Apaichon', 'Punopas', '10540');

  // 6. Complete Checkout
  await completeCheckout(page);

  // 7. Verify Success
  await verifyCheckoutSuccess(page);
});

async function login(page, username, password) {
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(/inventory.html/);
}

async function addItemsToCart(page, items) {
  for (const item of items) {
    await page.locator(`[data-test="add-to-cart-${item}"]`).click();
  }
  const cartBadge = page.locator('.shopping_cart_badge');
  await expect(cartBadge).toHaveText(items.length.toString());
}

async function startCheckout(page) {
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(/cart.html/);
  await page.locator('[data-test="checkout"]').click();
  await expect(page).toHaveURL(/checkout-step-one.html/);
}

async function fillCheckoutInfo(page, firstName, lastName, postalCode) {
  await page.locator('[data-test="firstName"]').fill(firstName);
  await page.locator('[data-test="lastName"]').fill(lastName);
  await page.locator('[data-test="postalCode"]').fill(postalCode);
  await page.locator('[data-test="continue"]').click();
  await expect(page).toHaveURL(/checkout-step-two.html/);
}

async function completeCheckout(page) {
  await page.locator('[data-test="finish"]').click();
  await expect(page).toHaveURL(/checkout-complete.html/);
}

async function verifyCheckoutSuccess(page) {
  const successMessage = page.locator('.complete-header');
  await expect(successMessage).toHaveText('Thank you for your order!');
  await expect(page.locator('[data-test="pony-express"]')).toBeVisible();
}