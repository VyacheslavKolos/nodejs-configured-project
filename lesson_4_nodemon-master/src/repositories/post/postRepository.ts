import {
    EntityRepository, getManager, Repository,
} from 'typeorm';

import { IPost, Post } from '../../entity/post';
import { IPostRepository } from './postRepository.interface';

@EntityRepository(Post)
class PostRepository extends Repository<Post> implements IPostRepository {
    public async createPost(post:IPost):Promise<IPost> {
        return getManager().getRepository(Post).save(post);
    }

    public async getPosts(): Promise<IPost[]> {
        return getManager().getRepository(Post).find({ relations: ['comments'] });
    }
}

export const postRepository = new PostRepository();
