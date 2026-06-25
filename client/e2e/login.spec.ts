import { test, expect } from '@playwright/test';

test.describe('Auth Flow', () => {
  const email = `test${Date.now()}@test.com`;
  
  test('should register and login successfully', async ({ page }) => {
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
    await expect(page.locator('text=Đăng xuất')).toBeVisible();
  });
});
