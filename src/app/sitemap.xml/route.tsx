import axios from 'axios';
const URL = process.env.NEXT_PUBLIC_URL;
import { ArticleData } from '../context/Article';
import { TeamData } from '../context/Team';
function generateSiteMap(articles: ArticleData, players: TeamData) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>${URL}</loc>
     </url>
     <url>
       <loc>${URL}/cgu</loc>
     </url>
     <url>
       <loc>${URL}/calendrier</loc>
     </url>
     <url>
       <loc>${URL}/recrutement</loc>
     </url>
     <url>
       <loc>${URL}/team</loc>
     </url>
     ${players.map((player)=>{
      return `
        <url>
          <loc>${URL}/team/${player.user_name}</loc>
          <lastmod>${new Date(player.updated_at || player.created_at).toISOString().split('T')[0]}</lastmod>
        </url>
      `;
     }).join("")}
     <url>
       <loc>${URL}/articles</loc>
     </url>
     ${articles.map((article)=>{
      return `
        <url>
          <loc>${URL}/articles/${article.slug}</loc>
          <lastmod>${new Date(article.updated_at || article.publication_date).toISOString().split('T')[0]}</lastmod>
        </url>
      `;
     }).join("")}
   </urlset>
 `;
}

export async function GET() {

// const articles =[{ slug : 'test'}]; // Get all articles from the context
const article = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/articles`);
const articles = article.data.data
const team = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/team`);
const players = team.data.data
const body = generateSiteMap(articles, players);
  return new Response(body, {
    status: 200,
    headers: {
      "Cache-control": "public, s-maxage=86400, stale-while-revalidate",
      "content-type": "application/xml",
    },
  });
}
