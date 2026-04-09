export interface IProfile {
  id: number;
  name: string;
  title: string;
  email: string;
  bio: string;
  imageUrl?: string | null;
  /** مسار أو رابط ملف السيرة الذاتية (PDF) من الـ API */
  resumeUrl?: string | null;
  linkedInUrl?: string | null;
  gitHubUrl?: string | null;
}
