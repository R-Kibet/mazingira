# Mazingira Sustainability Village (MSV) — Landing Page

A Django recreation of the MSV landing page design: hero, About MSV, Core
Values, the Ndakaini Half Marathon promo banner, and the Green Drive
"Our Impact" tree-planting timeline. Built with Django templates,
plain CSS (no framework) and vanilla JS, and is responsive from phone
through tablet to desktop.

## Project layout

```
mazingira_site/
├── manage.py
├── requirements.txt
├── mazingira_site/          # project settings/urls
└── core/                    # the app with the landing page
    ├── views.py             # passes copy (values, milestones, etc.) to the template
    ├── urls.py
    ├── templates/core/
    │   ├── base.html        # header, nav, footer shared across pages
    │   └── home.html        # all landing-page sections
    └── static/core/
        ├── css/style.css
        ├── js/script.js     # mobile nav toggle
        └── images/          # logo + placeholder photos (see below)
```

## Run it locally

```bash
python3 -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Visit http://127.0.0.1:8000/

## Replacing the placeholder photos

Three photos in the design are your organization's own photography
(the forest hero shot, the "Linda Kesho Leo" binoculars portrait, the
marathon crowd shot, the forest-block photo, and the four community
event photos in the gallery strip), so I couldn't recreate them
exactly. I generated color-matched placeholder JPGs labeled with the
exact filename and recommended size, so the layout already looks
right — just drop your real files into
`core/static/core/images/` using the **same filenames** and
everything updates automatically:

| Placeholder file | Used for | Recommended size |
|---|---|---|
| `hero-forest.jpg` | Hero background | 1920×1080 or larger |
| `about-portrait.jpg` | "About MSV" photo card | 700×900 (portrait) |
| `marathon-runners.jpg` | Half Marathon banner | 1000×750 |
| `impact-texture.jpg` | "Our Impact" background texture | 1920×900 (optional — a plain dark green also works, it's a subtle background) |
| `forest-block.jpg` | "Adopt a Forest Block" photo | 900×700 |
| `gallery-1.jpg` … `gallery-4.jpg` | "Come Let's Experience The Fun Together" photo strip | 600×600 or taller (they crop to a 3:4 tile) |

After swapping images, run `python manage.py collectstatic` before
deploying.

## Logo and "Save Green / Save Blue" badge

These now use your real files (`core/static/core/images/logo.png` and
`badge-save-green-blue.png`), sized via CSS — no editing needed unless
you want to replace them:

- **`logo.png`** is a full lockup (leaf-and-droplet mark + "Mazingira
  Sustainability Village" wordmark), and the wordmark is **white**. That
  means it's only visible on dark/colored backgrounds (footer, marathon
  banner) — on the white header it renders as icon-only, which is why
  the header still has a separate dark-green text label coded next to
  it. If you get a version with a dark/colored wordmark for light
  backgrounds, drop it in as `logo.png` and remove that header text
  span (`core/templates/core/base.html`, the `.logo-title`/
  `.logo-subtitle` spans) so it isn't duplicated.
- **`badge-save-green-blue.png`** replaces the "SAVE GREEN‖SAVE BLUE"
  pill in the **hero section only**. The marathon banner and footer
  still use the CSS-built version (green/blue pill with text) — let me
  know if you'd like those swapped to the image too for consistency.

## Icons

All icons (leaf logo, water drop, tree, gear, runner, target,
pine-tree clusters) are hand-built inline SVG, so there's nothing to
license or swap — recolor them by editing the `stroke`/`fill` in
`style.css`.

## Nav links

`Home` and the logo point at the real home URL. `Media` scrolls to
the photo gallery section (`#media`). `Programs` and `Volunteer`
still point at in-page placeholder anchors (`#programmes`,
`#volunteer`) — hook these up to real pages/views once that content
exists. Same for `Newsletter`, `Register Now`, and the three
"Learn More" links (marathon, impact, forest adoption). Social icons
in the footer are placeholder `#` links — swap in your real profile
URLs.

## Responsive breakpoints

- Desktop: full multi-column layout (default styles)
- Tablet (≤1024px): About/Marathon sections stack to one column,
  impact timeline stacks
- Mobile (≤720px): nav collapses to a hamburger menu, all grids go
  single-column, type scales down
