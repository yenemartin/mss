# Mengesha Software Solutions

Mobile-first landing page for Mengesha Software Solutions.

## Stack

- Static HTML
- Static CSS
- Vanilla JavaScript
- Image assets stored in `assets/`

## Local structure

- `index.html` - landing page
- `styles.css` - visual styling
- `script.js` - carousel and lightbox behavior
- `assets/` - logo, business card, and live site screenshots

## Cloudflare Pages deployment

This project is ready to deploy as a static site on Cloudflare Pages.

### Recommended Cloudflare Pages settings

- Framework preset: `None`
- Build command: leave empty
- Build output directory: `/`
- Root directory: `/`

### GitHub repository

Target repository:

- `yenemartin/mss`

### Suggested deployment flow

1. Push this project to `github.com/yenemartin/mss`
2. In Cloudflare, create a new Pages project
3. Connect the GitHub repo `yenemartin/mss`
4. Use the static-site settings above
5. After the first deploy succeeds, add your custom domain
6. Point `mengeshasoftwaresolutions.com` to the Pages project inside Cloudflare

## Custom domain

Since you plan to buy the domain through Cloudflare, the cleanest setup is:

1. Buy `mengeshasoftwaresolutions.com` in Cloudflare
2. Add the domain to the same Cloudflare account as the Pages project
3. Attach the domain in Pages as the production custom domain

## Notes

- The hero image carousel rotates automatically
- Clicking a hero image opens a full-screen viewer
- The CTA button scrolls to the option cards section

