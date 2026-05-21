User-agent: *

Disallow: /admin/
Disallow: /dashboard/
Disallow: /login
Disallow: /register
Disallow: /api/
Disallow: /private/
Disallow: /config/
Disallow: /includes/
Disallow: /assets/temp/
Disallow: /tmp/
Disallow: /backup/
Disallow: /backups/
Disallow: /*?*

Allow: /assets/
Allow: /css/
Allow: /js/
Allow: /images/

Allow: /

# AI/LLM crawlers
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: https://aisocialtools.co/sitemap.xml