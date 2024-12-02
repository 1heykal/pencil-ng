export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  bio?: string;
  photoPath?: string | null;
  birthDate: Date;
  gender: string;
  followingCount: number;
  followersCount: number;
  postsCount: number;
  sameUser: boolean;
  followed: boolean;
}
