 const { test } = require('@playwright/test');
const { AgodaHomePage } = require('./pages/AgodaHomePage');
const { AgodaResultsPage } = require('./pages/AgodaResultsPage');

test('Find lowest price highest-rated 5-star hotel in Agoda', async ({ page }) => {
  const homePage = new AgodaHomePage(page);
  const resultsPage = new AgodaResultsPage(page);

  await homePage.goto();
  await homePage.enterCity('Mumbai');
  await homePage.selectDates('2025-08-15', '2025-08-20');
  await homePage.addInfant();
  await homePage.search();

  await resultsPage.applyFiveStarFilter();
  await resultsPage.sortLowestPrice();

  const lowestHotel = await resultsPage.getLowestPricedHotel();
  console.log(`Lowest Price Hotel: ${lowestHotel.name} => ₹${lowestHotel.price}`);

  if (lowestHotel.price > 5000) {
    throw new Error('Test Break: Price above threshold');
  }
});
 