import type { Metadata } from "next";
import { ProjectGallery } from "@/components/project-gallery";

export const metadata: Metadata = { title: "Projetos" };
export default function Projects() {
  return <ProjectGallery />;
}
