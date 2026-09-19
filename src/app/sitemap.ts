import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { activityDetails } from "@/content/teaching";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number) => ({
    url: `${profile.siteUrl}${path}`,
    changeFrequency: "monthly" as const,
    priority,
  });

  return [
    page("/", 1),
    ...projects.map((project) => page(`/projects/${project.id}`, 0.8)),
    ...activityDetails.map((activity) => page(`/activities/${activity.id}`, 0.8)),
  ];
}
