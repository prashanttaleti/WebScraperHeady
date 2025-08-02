 const { expect } = require('@playwright/test');

class AgodaHomePage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator('input[data-selenium="textInput"]');
    this.searchOption = (city) =>
      page.getByRole('option', { name: `Top destination ${city}, India` });
    this.datePicker = (date) => page.locator(`//span[@data-selenium-date='${date}']`);
    this.addInfantButton = page
      .locator('div')
      .filter({ hasText: /^ChildrenAges 0-170$/ })
      .getByLabel('Add');
    this.childAgeDropdown = page.getByRole('button', { name: 'Age of Child' });
    this.childAgeSelect = page.getByTestId('child-ages-dropdown-0-1').getByTestId('title');
    this.searchButton = page.locator('button[data-selenium="searchButton"]');
  }

  async goto() {
    await this.page.goto('https://www.agoda.com/', { waitUntil: 'domcontentloaded' });
  }

  async enterCity(city) {
    await this.searchInput.click();
    await this.searchInput.fill(city);
    await this.page.waitForTimeout(2000);
    await this.searchOption(city).click();
  }

  async selectDates(checkIn, checkOut) {
    await this.datePicker(checkIn).click();
    await this.datePicker(checkOut).click();
  }

  async addInfant() {
    await this.addInfantButton.click();
    await this.childAgeDropdown.click();
    await this.childAgeSelect.click();
  }

  async search() {
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { AgodaHomePage };
