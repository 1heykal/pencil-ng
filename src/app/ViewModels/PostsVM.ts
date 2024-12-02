export interface IPosts {
  id: string;
  title?: string;
  type: string | null;
  url: string;
  subtitle?: string;
  content: string;
  publishedOn: Date;
  blogPhotoPath?: string;
  blogName?: string;
  authorName: string;

  authorUsername: string;
  blogUsername: string;
  authorPhotoPath: string;
  likesCount: number;
  liked: boolean;
  saved: boolean;
  commentsCount: number;
  tags: string[];
}
