import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";

export default function robots(): MetadataRoute.Robots {
  return {
    // 강의안 원본 HTML은 상세 페이지 안에서 보는 자료라 검색 결과에 따로 뜨지 않게 한다
    rules: { userAgent: "*", allow: "/", disallow: "/lectures/" },
    sitemap: `${profile.siteUrl}/sitemap.xml`,
  };
}
