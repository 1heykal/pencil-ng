export default interface PostDetailsVM {
  id: string;
  title?: string | null;
  subtitle?: string | null;
  content: string;
  publishedOn: string;
  archived: boolean;
  softDeleted: boolean;
  type: string | null;
  url: string;
  blogId?: string | null;
  authorId: string;

}
