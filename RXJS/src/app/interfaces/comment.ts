export interface Comment {
    id: number;
    body: string;
    likes: number;
    postId: number;
    userc: {
      id: number;
      username: string;
      fullName: string;
    };
  }
  