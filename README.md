# Caleb Oil/Gas LTD Website

A static marketing website for Caleb Oil/Gas LTD, a downstream oil and gas retail/distribution company supplying petrol, diesel, cooking gas (LPG), and lubricants to homes and businesses in Ado-Ekiti, Ekiti State, Nigeria.

**Live site:** https://caleb-oil-gas-ltd.netlify.app

## Pages

| Page | File | Description |
| --- | --- | --- |
| Home | `index.html` | Hero, product overview, stats, trust section, testimonials |
| About Us | `about.html` | Company story, mission & vision, values, milestones, photo gallery |
| Products & Services | `products.html` | Detailed breakdown of petrol/diesel, LPG, and lubricants |
| Contact | `contact.html` | Location, phone, email, business hours, contact form, FAQ |
| Thank You | `thank-you.html` | Confirmation page after a contact form submission |
| 404 | `404.html` | Custom not-found page |

## Structure

```
├── index.html / about.html / products.html / contact.html / 404.html / thank-you.html
├── css/style.css        # All site styles
├── js/main.js           # Mobile nav, scroll-reveal animations, FAQ accordion
└── assets/images/       # Logo, favicons, and photos
```

## Features

- Fully responsive, no build step or dependencies — plain HTML/CSS/JS
- Contact form powered by [Netlify Forms](https://docs.netlify.com/manage/forms/setup/) with spam honeypot, redirect to a thank-you page, and email notifications on submission
- Click-to-chat WhatsApp button
- Scroll-reveal animations and an animated FAQ accordion
- SEO metadata (Open Graph, Twitter Card, JSON-LD `GasStation` schema)

## Deployment

The site is deployed to [Netlify](https://www.netlify.com/) as a static site — no build command needed, the repository root is published as-is. Deploys are currently pushed manually via the Netlify CLI:

```
npx netlify-cli deploy --prod --dir .
```

## Local development

No build tooling is required. Open any `.html` file directly in a browser, or serve the folder with any static file server, e.g.:

```
npx serve .
```
