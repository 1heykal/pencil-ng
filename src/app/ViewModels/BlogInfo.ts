export interface BlogInfo {
  id: string;
  name: string;
  username: string;
  createdAt: Date;
  photoPath: string;
  postsCount: number;
  subscriptionsCount: number;
  authorName: string;
  authorPhotoPath: string | null;
  twitterUrl: string | null;
  instagramUrl: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
  isCurrentUserSubscribed: boolean;
}
