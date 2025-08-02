 class AgodaResultsPage {
  constructor(page) {
    this.page = page;
    this.fiveStarFilter = page.locator("(//input[@type='checkbox'])[39]");
    this.sortByLowestPrice = page.locator("//span[text()='Lowest price first']");
    this.hotelItems = page.locator('[data-selenium="hotel-item"]');
  }

  async applyFiveStarFilter() {
    await this.fiveStarFilter.click();
    await this.page.waitForTimeout(4000);
  }

  async sortLowestPrice() {
    await this.sortByLowestPrice.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getLowestPricedHotel() {
    const hotels = await this.hotelItems.evaluateAll((nodes) =>
      nodes.map((node) => ({
        name: node.querySelector('[data-selenium="hotel-name"]')?.innerText.trim(),
        price:
          parseInt(
            node.querySelector('[data-selenium="display-price"]')?.innerText.replace(/[₹,]/g, '')
          ) || 0,
      }))
    );

    const validHotels = hotels.filter((h) => h.price > 0);
    if (validHotels.length === 0) throw new Error('No hotels found with 5-star rating');

    return validHotels.reduce((prev, curr) => (curr.price < prev.price ? curr : prev));
  }
}

module.exports = { AgodaResultsPage };
