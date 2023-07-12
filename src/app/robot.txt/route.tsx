const URL = process.env.NEXT_PUBLIC_URL;
export function GET() {
    const body = `
    User-agent: *
    Disallow: /dashboard/*
    Allow: /
    
    Sitemap: ${URL}/sitemap.xml`
    return new Response(body, {
      status: 200,
      headers: {
        "Cache-control": "public, s-maxage=86400, stale-while-revalidate",
        "content-type": "text/plain",
      },
    });
  }
  