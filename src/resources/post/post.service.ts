import PostModel from '@/resources/post/post.model';
import PostDoc from '@/resources/post/post.interface';

class PostService {
    private post = PostModel;

    /**
     * 
     * @param title 
     * @param body 
     * @returns A new post 
     */
    public async create(title: string, body: string): Promise<PostDoc> {
        try {
            const post = await this.post.create({ title, body})

            return post;
        } catch (error) {
            throw new Error('Unable to create post');
        }
    }
}

export default PostService;