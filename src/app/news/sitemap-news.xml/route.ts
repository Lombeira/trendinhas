// app/news/sitemap.xml/route.ts

import { NextResponse } from "next/server";
import { config } from "@/config";
import { wisp } from "@/lib/wisp";
import urlJoin from "url-join";

export async function GET() {
  // Obter os posts usando sua função atual
  const result = await wisp.getPosts();

  // Filtrar artigos dos últimos dois dias
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  const recentPosts = result.posts.filter((post) => {
    const postDate = new Date(post.publishedAt || post.updatedAt);
    return postDate >= twoDaysAgo;
  });

  // Gerar o XML do sitemap incluindo as tags obrigatórias
  const sitemapXml = generateSitemapXml(recentPosts);

  return new NextResponse(sitemapXml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

function generateSitemapXml(posts: any[]) {
  const baseUrl = config.baseUrl;

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n';

  posts.forEach((post) => {
    const url = urlJoin(baseUrl, "blog", post.slug);
    const publicationDate = formatDateW3C(post.publishedAt || post.updatedAt);

    xml += '  <url>\n';
    xml += `    <loc>${escapeXml(url)}</loc>\n`;
    xml += '    <news:news>\n';
    xml += '      <news:publication>\n';
    xml += `        <news:name>${escapeXml(post.title)}</news:name>\n`;
    xml += `        <news:language>${escapeXml(post.language || "pt")}</news:language>\n`;
    xml += '      </news:publication>\n';
    xml += `      <news:publication_date>${publicationDate}</news:publication_date>\n`;
    xml += `      <news:title>${escapeXml(post.title)}</news:title>\n`;
    xml += '    </news:news>\n';
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  return xml;
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return "";
    }
  });
}

function formatDateW3C(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString(); // Retorna no formato YYYY-MM-DDThh:mm:ss.sssZ
}
