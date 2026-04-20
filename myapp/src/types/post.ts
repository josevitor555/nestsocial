export type PostType = "text" | "image" | "video" | "ai";

export interface PostAuthor {
  name: string;
  username: string;
  avatar: string;
}

export interface Post {
  id: string;
  author: PostAuthor;
  type: PostType;
  content: string;
  mediaUrl?: string;
  createdAt: string;
  isAI: boolean;
  stats?: {
    likes: number;
    comments: number;
    shares: number;
  };
}
