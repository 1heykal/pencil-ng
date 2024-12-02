export default interface CreatePostVM {
  title?: string | null;
  subtitle?: string | null;
  content: string | null;
  tags: string[];
  blogId?: string | null;
  type: string | null;
}
