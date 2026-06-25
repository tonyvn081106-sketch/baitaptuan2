import { test, expect } from '@playwright/test';

test.describe('Bookings Flow', () => {
  test('should navigate to dashboard and view bookings', async ({ page }) => {
    const email = `crud${Date.now()}@test.com`;
    
    await page.goto('/register');
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', 'password123');
    await page.fill('input[name="dob"]', '01/01/2000');
    await page.keyboard.press('Escape'); // close datepicker just in case
    await page.fill('input[name="phone"]', '0123456789');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=Đăng ký thành công')).toBeVisible();
    await expect(page).toHaveURL(/.*\/login/);
    
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/$/);
    
    await page.goto('/dashboard');
    
    // Check if we are on the dashboard
    await expect(page.locator('h1', { hasText: 'Quản lý chuyến đi của bạn' })).toBeVisible();
    
    // We expect the user to either have bookings or the empty state
    const emptyState = page.locator('text=Bạn chưa có chuyến đi nào');
    
    // Either of these should be visible. In this test flow (new user), it will be the empty state.
    await expect(emptyState).toBeVisible();
  });
});
