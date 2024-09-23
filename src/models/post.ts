export interface Post {
  Id: string;
  Title?: string;
  Subtitle?: string;
  Content: string;
  PublishedOn: Date;
  BlogPhotoPath?: string;
  BlogName?: string;
  AuthorName?: string;
  AuthorPhotoPath?: string;
  LikesCount: number;
  CommentsCount: number;
}
