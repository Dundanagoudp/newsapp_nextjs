// postApi.ts

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }
  
  // Structure: each item will have `id` and the full post object
  export interface PostWithId {
    id: number;
    post: Post;
  }
  
  //posts with id
  export const fetchPostsWithId = async (): Promise<PostWithId[]> => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
  
      const posts: Post[] = await response.json();
  
      const result: PostWithId[] = posts.map((post) => ({
        id: post.id,
        post: post,
      }));
  
      return result;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  };

//   post with ids
  
  export const fetchPost = async (id: number): Promise<Post> => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch post');
      }

      const post: Post = await response.json();
  
      return post;
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  }  