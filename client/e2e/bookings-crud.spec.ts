import { test, expect } from '@playwright/test';

test.describe('Bookings CRUD Flow', () => {
  test('should perform CRUD on bookings', async ({ page }) => {
    const email = `crud${Date.now()}@test.com`;
    
    await page.goto('/register');
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL(/.*\/login/);
    
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL(/.*\/dashboard/);
    
    await page.fill('input[type="text"]', '60b8d295f1d2a34567890123');
    await page.click('button:has-text("Create Booking")');
    
    await expect(page.locator('text=New Booking Created!')).toBeVisible();
    await expect(page.locator('text=Booking #').first()).toBeVisible();
    
    await page.click('button:has-text("Delete")');
    await expect(page.locator('text=Booking deleted')).toBeVisible();
  });
});
