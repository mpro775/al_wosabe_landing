import type { MetadataRoute } from "next";

const baseUrl = "https://www.alwosabe.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${baseUrl}/ar`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar`,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar`,
          en: `${baseUrl}/en`,
        },
      },
    },
  ];
}
