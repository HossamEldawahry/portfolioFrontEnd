export interface IProject {
  id: number;
  title: string;
  description: string;
  imageUrl?: string | null;
  gitHubUrl?: string | null;
  demoUrl?: string | null;
  isFeatured: boolean;
}
