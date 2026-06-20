import { test, expect } from '@playwright/test';

test.describe('Auth Flow', () => {
  const email = `test${Date.now()}@test.com`;
  
  test('should register and login successfully', async ({ page }) => {
    await page.goto('/register');
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=Registered successfully')).toBeVisible();
    await expect(page).toHaveURL(/.*\/login/);
    
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL(/.*\/dashboard/);
    await expect(page.locator('text=Dashboard - Bookings')).toBeVisible();
  });
});
