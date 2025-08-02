# WebScraperHeady - Playwright Automation Project

This project uses **[Playwright](https://playwright.dev/)** for automating hotel price scraping from Agoda.  
It follows the **Page Object Model (POM)** for better maintainability.

---

## **Project Structure**
project-root/
├── pages/ # Page Object classes
│ ├── AgodaHomePage.js
│ ├── AgodaResultsPage.js
├── tests/ # Test scripts
│ └── agoda.test.js
├── .gitignore
├── package.json
└── README.md



---

## **Setup Instructions**

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd WebScraperHeady

2.Install dependencies
npm install

3.Install Playwright browsers
npx playwright install


Run Tests
npx playwright test



Run a specific test:
npx playwright test tests/agoda.test.js


Run with UI (headed mode):
npx playwright test --headed

Run in debug mode:
npx playwright test --debug









