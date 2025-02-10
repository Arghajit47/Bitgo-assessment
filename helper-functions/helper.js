import { request, expect } from "@playwright/test";

class Helper {
  constructor(page) {
    this.page = page;
  }

  async visitUrl(url) {
    await this.page.goto(url);
  }
  async clickElement(selector) {
    await this.page.locator(selector).click();
  }
  async verifyElementVisible(selector, index = 0) {
    await expect(this.page.locator(selector).nth(index)).toBeVisible();
  }

  async verifyText(locator, expectedText) {
    await expect(this.page.locator(locator)).toBeVisible();
    await expect(this.page.locator(locator)).toHaveText(expectedText);
  }
  async getElementCount(locator) {
    return await this.page.locator(locator).count();
  }
  async getTextContent(locator) {
    return await this.page.locator(locator).textContent();
  }
}

export default Helper;
