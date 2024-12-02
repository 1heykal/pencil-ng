export default interface CommentsVM {
  id: string;
  content: string;
  publishedOn: Date;
  authorName: string;
  authorPhotoPath: string | null;
  likesCount: number;
  username: string;
}
