# Jiffy Booth - Premium Event Entertainment 📸

Jiffy Booth is a high-end photo booth service platform designed for seamless event enquiries. This project uses **Next.js 16** with Sanity CMS for owner-managed content and a mobile-first experience.

---

## Contributors
* **Chin Lok Bin** — *Lead Developer / System Architect*
* **Wong Xiang Rou** — *Project Contributor / UX Design*

---

## Key Features

### Dynamic Management
* **Sanity CMS Integration**: Real-time updates for services, templates, testimonials, and legal documents without touching the code.
* **Automated Quotation**: Smart form that formats request data into professional WhatsApp messages.

### Mobile-First UX
* **Fluid Navigation**: Compact hamburger menu featuring smooth, staggered slide-in animations.
* **High-Density Design**: Compressed vertical spacing and optimized grid systems to reduce scrolling fatigue.
* **Interactive UI**: Smooth Glide.js carousel for template browsing and infinite marquee for brand partnerships.

---

## Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **CMS** | Sanity CMS |
| **Animations** | Tailwind CSS Animate |
| **Icons** | Lucide React |

---

## Local Development

Follow these steps to set up the project on your new machine:

### 1. Clone & Install
```bash
git clone [your-repository-url]
cd JIFFYBOOTH-OFFICIAL
npm install
```

### 2.Configure Environment Variables
```bash
Create a file named .env.local in the root directory and paste the following:

NEXT_PUBLIC_SANITY_PROJECT_ID="g8867hcl"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"
SANITY_REVALIDATE_SECRET="use-a-long-random-secret"
```
### 3. Run & Build
```bash
To start the development server, run:
npm run dev
```

### Sanity publishing webhook

To make published content appear immediately instead of waiting for the hourly ISR fallback:

1. Add `SANITY_REVALIDATE_SECRET` to the hosting provider's production environment variables.
2. In Sanity Manage, create a document webhook pointing to `https://YOUR_DOMAIN/api/revalidate`.
3. Use `POST`, disable drafts, and add the HTTP header `Authorization: Bearer YOUR_SECRET`.
4. Use the projection `{ "_type": _type, "slug": slug.current }`.
5. Trigger the webhook for create, update, and delete operations.

Use exact localhost and production Studio origins in Sanity CORS settings. Do not enable credentialed wildcard origins.

For content permissions, keep the developer as Administrator and use Editor for the owner when the Sanity plan supports it.

### Deploy to Netlify Free

Netlify automatically detects this Next.js App Router project and supplies its maintained OpenNext adapter. Do not set a custom publish directory or install the adapter manually.

1. Sign in to Netlify and select **Add new project → Import an existing project**.
2. Connect GitHub and select `IamLebin/Jiffy-Booth-official`.
3. Use the `main` branch. The build command is read from `netlify.toml`; leave the publish directory blank.
4. Before deploying, add these environment variables under **Project configuration → Environment variables**:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID=g8867hcl`
   - `NEXT_PUBLIC_SANITY_DATASET=production`
   - `NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01`
   - `SANITY_REVALIDATE_SECRET=<a long random secret>`
5. Deploy the project and note the generated `*.netlify.app` URL.
6. Add that exact origin to the Sanity project's CORS origins with credentials enabled so `/studio` can sign in.
7. Create or update the Sanity document webhook:
   - URL: `https://YOUR_NETLIFY_DOMAIN/api/revalidate`
   - Method: `POST`
   - Header: `Authorization: Bearer YOUR_SECRET`
   - Projection: `{ "_type": _type, "slug": slug.current }`
   - Drafts: disabled
8. After connecting the final custom domain, add that exact domain to Sanity CORS and update the webhook URL to the final domain.

Keep the old deployment online until the Netlify production URL, `/studio`, and Sanity publishing webhook have all been verified. Switching the domain DNS should be the final step.

Troubleshooting (ENOSPC Error)
```bash
If you encounter a no space left on device error during compilation:
Clear the Next.js cache by running: rm -rf .next
Restart the server: npm run dev
```

Project Structure:
```bash
app/: Core application logic, routing, and UI components.
sanity/: Content schemas and client configurations.
public/: Static assets (logos, fallback images).
```
© 2026 Jiffy Ventures. All rights reserved.
