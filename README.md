# Juniper & Co. — Café Website (Day 01)

A responsive café landing page built with HTML, CSS, and vanilla JavaScript. This is a front-end-only starter project; it does not require PHP or MySQL.

## Features

- Responsive desktop, tablet, and mobile layouts
- Mobile navigation menu with accessible expanded-state labels
- Menu category filter (All, Coffee, Brunch, Bakery)
- Smooth in-page navigation
- Café story, sample menu, opening hours, and location sections
- Current year generated automatically in the footer

## Project structure

```text
 daily_website_day01/
 ├── index.html
 ├── style.css
 ├── script.js
 └── README.md
```

## Run the project

1. Extract the ZIP file.
2. Open the `daily_website_day01` folder in VS Code (or another editor).
3. Open `index.html` in a browser. For the easiest development workflow, use the VS Code **Live Server** extension and click **Go Live**.

No build tools, package installation, or database setup are needed.

## Customise it

- Replace the café name, address, hours, menu names, and prices in `index.html`.
- Change colours in the `:root` variables at the top of `style.css`.
- Add or remove menu cards in the `.menu-grid`; set each card's `data-category` to `coffee`, `brunch`, or `bakery` so filtering works.
- Replace the demo image URLs with your own licensed images.

## Learning challenge

1. Add a fourth menu category called `dessert` and add two dessert cards.
2. Add a new filter button for Desserts.
3. Make the active filter remain selected after refreshing the page using `localStorage`.

## Notes

- The displayed menu and prices are fictional demo content.
- Images and Google Fonts load from external services, so an internet connection is needed for those assets. The page structure and interactions work locally without a backend.
- The directions link is a sample Google Maps search for Butwal, Nepal; replace it with the real business location when adapting this template.
