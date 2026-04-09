export interface IProfile {
  id: number;
  name: string;
  title: string;
  email: string;
  bio: string;
  imageUrl?: string | null;
  linkedInUrl?: string | null;
  gitHubUrl?: string | null;
}
