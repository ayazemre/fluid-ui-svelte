import { componentRegistry } from '../../documentation/registry.js';

const lastmod = new Date().toISOString().split('T')[0];

export async function GET() {
	const site = 'https://fluidui.io';
	
	const pages = [
		'',
		'documentation/getting-started',
		'documentation/how-to',
		'llm-protocol'
	];

	const componentUrls = [];
	for (const [category, items] of Object.entries(componentRegistry)) {
		for (const slug of Object.keys(items)) {
			componentUrls.push(`documentation/${category}/${slug}`);
		}
	}

	const allUrls = [...pages, ...componentUrls];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
	.map(
		(url) => `  <url>
    <loc>${site}${url ? '/' + url : ''}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap.trim(), {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}