export interface LoggedUserProfile {
  firstName: string;
  lastName: string;
  username: string;
  bio?: string;
  photoPath?: string;
  birthDate: Date;
  gender: string;
  followingCount: number;
  followersCount: number;
  postsCount: number;
  id: string;
}
