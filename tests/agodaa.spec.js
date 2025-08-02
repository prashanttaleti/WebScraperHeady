const { test, expect }=require("@playwright/test");
const { Console } = require("console");

//test.use({viewport:{width:1366,height:633}})

test('Find lowest price highest-rated 5-star hotel in Agoda', async ({ page }) => {
  // Navigate to Agoda
  await page.goto('https://www.agoda.com/', { waitUntil: 'domcontentloaded' });



// console.log(await page.viewportSize().width)
// console.log(await page.viewportSize().height)


//=====================================
  // Enter City (Example: Mumbai)
  await page.locator('input[data-selenium="textInput"]').click();
  await page.locator('input[data-selenium="textInput"]').fill('Mumbai');
  await page.waitForTimeout(2000);
   await page.getByRole('option', { name: 'Top destination Mumbai, India' }).click();

 
  await page.locator("//span[@data-selenium-date='2025-08-15']").click();
  await page.locator("//span[@data-selenium-date='2025-08-20']").click();
 console.log('5 Night Stay')

  // Adults already default 2, add Infant
  await page.locator('div').filter({ hasText: /^ChildrenAges 0-170$/ }).getByLabel('Add').click();

  // const adult= await page.locator("//h2[text()='Adults']").innerText();
  // console.log('Total Adult Count'adult)
  await page.getByRole('button', { name: 'Age of Child' }).click();
  const adultCount= await page.locator("//p[text()='2']").innerText();
  console.log('Adult Count is:'+adultCount)
  await page.getByTestId('child-ages-dropdown-0-1').getByTestId('title').click();

  const childCount = await page.locator("(//p[text()='1'])[2]").innerText();
  console.log('Total number infant :'+childCount)



  // Submit search
  await page.locator('button[data-selenium="searchButton"]').click();
  await page.waitForLoadState('networkidle');

  // Apply 5-star filter
  //await page.locator('//label[contains(.,"5-star")]').scrollIntoViewIfNeeded();
await page.locator("(//input[@type='checkbox'])[39]").click();

  await page.waitForTimeout(4000);


    await page.waitForLoadState('domcontentloaded');


  // Sort by Highest rating
  await page.locator("//span[text()='Lowest price first']").click();
  console.log('Lowest price first')


    await page.waitForLoadState('domcontentloaded');

    const fiveStarRating= await page.locator("(//div[@class='ad4a2-box ad4a2-fill-inherit ad4a2-text-inherit ad4a2-flex      '])[11]");
console.log('5 stars out of 5')


const jpGarden = page.locator("//span[@label='JP Garden & Lawn']");
await jpGarden.waitFor({ state: 'visible', timeout: 60000 });

const text = await jpGarden.textContent();
console.log(text);


//   const jpGarden = page.locator("//span[contains(@label, 'JP Garden & Lawn')]");
// const text = await jpGarden.textContent();
// console.log(text);

  // Extract hotel names and prices
  const hotels = await page.$$eval('[data-selenium="hotel-item"]', nodes =>
    nodes.map(node => ({
      name: node.querySelector('[data-selenium="hotel-name"]')?.innerText.trim(),
      price: parseInt(node.querySelector('[data-selenium="display-price"]')?.innerText.replace(/[₹,]/g, '')) || 0
    }))
  );

  // Filter valid hotels
  const validHotels = hotels.filter(h => h.price > 0);

  if (validHotels.length === 0) {
    throw new Error('No hotels found with 5-star rating');
  }

  // Find the lowest priced hotel
  const lowest = validHotels.reduce((prev, curr) => (curr.price < prev.price ? curr : prev));

  console.log(`Lowest Price Hotel: ${lowest.name} => ₹${lowest.price}`);

  // Break intentionally if hotel price is above 20000
  if (lowest.price > 5000) {
    throw new Error('Test Break: Price above threshold');
  }
 

});
