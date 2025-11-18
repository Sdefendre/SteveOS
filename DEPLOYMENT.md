# Deployment Guide

## Pre-Deployment Checklist

### 1. Content Review

- [ ] Update company information in `SITE` constant (name, email, tagline, mission)
- [ ] Review and update service categories and pricing in `SERVICES`
- [ ] Add real project URLs, descriptions, and metrics to `PROJECTS`
- [ ] Replace placeholder images with actual assets
- [ ] Update testimonials with real client quotes
- [ ] Verify contact information and email links are correct
- [ ] Review blog posts and ensure content is current

### 2. SEO & Performance

- [ ] Update `metadataBase` URL in `app/layout.tsx`
- [ ] Set `NEXT_PUBLIC_SITE_URL` (for sitemap/robots absolute URLs)
- [ ] Add Google Search Console verification code
- [ ] Test all internal links work correctly
- [ ] Verify images are optimized and load properly
- [ ] Run Lighthouse audit (aim for >90 in all categories)

### 3. Technical Setup

- [ ] Test all pages load correctly (homepage, services, work, blog, about)
- [ ] Verify responsive design on mobile/tablet/desktop
- [ ] Test service category tabs work with keyboard navigation (arrow keys, Home/End)
- [ ] Test all external links open in new tabs
- [ ] Ensure smooth scrolling to anchor sections works on homepage
- [ ] Validate accessibility with keyboard navigation and screen readers
- [ ] Check ARIA attributes and semantic HTML structure
- [ ] Validate HTML and check for console errors

### 4. Analytics Setup

- [ ] Vercel Analytics automatically enabled when deployed to Vercel
- [ ] No additional configuration needed for basic analytics
- [ ] View analytics at https://vercel.com/analytics after deployment

## Deployment Steps

### Option 1: Vercel (Recommended)

1. **Push to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   \`\`\`

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Configure Domain**
   - Add custom domain in Vercel dashboard
   - Update `metadataBase` URL in code
   - Redeploy after URL change

### Option 2: Other Platforms

**Netlify:**

- Build command: `npm run build`
- Publish directory: `.next`
- Node version: 18+

**Railway/Render:**

- Build command: `npm run build`
- Start command: `npm start`
- Node version: 18+

## Post-Deployment

### 1. Verification

- [ ] Visit live site and test all pages (homepage, services, work, blog, about)
- [ ] Check mobile responsiveness across all pages
- [ ] Test service category tabs and keyboard navigation
- [ ] Verify email links and contact information work
- [ ] Test social media links and external project links
- [ ] Confirm favicon displays correctly
- [ ] Validate accessibility features and keyboard navigation

### 2. SEO Setup

- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Analytics (optional)
- [ ] Test Open Graph preview on social media
- [ ] Verify structured data (optional)

### 3. Performance Monitoring

- [ ] Run Lighthouse audit on live site
- [ ] Check Core Web Vitals
- [ ] Monitor loading speeds
- [ ] Set up uptime monitoring (optional)
- [ ] View Vercel Analytics dashboard for real-time metrics
- [ ] Monitor Web Vitals in Vercel Analytics

## Environment Variables

No environment variables required for basic deployment. Optional additions:

- `GOOGLE_ANALYTICS_ID`: For analytics tracking
- `NEXT_PUBLIC_CONTACT_FORM_URL`: If adding contact form backend

## Troubleshooting

**Build Errors:**

- Check Node.js version (18+ required)
- Clear `.next` folder and rebuild
- Verify all imports are correct

**Image Issues:**

- Ensure images are in `public/` directory
- Check file names match exactly
- Verify image formats are supported

**Performance Issues:**

- Optimize images (use WebP/AVIF)
- Check bundle size with `npm run build`
- Review Lighthouse recommendations

## Maintenance

### Regular Updates

- Keep dependencies updated monthly
- Monitor Core Web Vitals
- Update content and portfolio projects
- Refresh testimonials periodically

### Security

- Update Next.js and dependencies regularly
- Monitor for security vulnerabilities
- Use HTTPS (automatic with Vercel)
- Keep contact information current
