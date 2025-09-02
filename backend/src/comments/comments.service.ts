import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { Post } from '../posts/entities/post.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}
  async create(postId: number, createCommentDto: CreateCommentDto) {
    const post = await this.postsRepository.findOne({ where: { id: postId } });
    if (!post) throw new NotFoundException('Post not found');

    const comment = this.commentsRepository.create({
      ...createCommentDto,
      post,
    });
    return this.commentsRepository.save(comment);
  }

  async findByPost(postId: number) {
    const post = await this.postsRepository.findOne({ where: { id: postId } });
    if (!post) throw new NotFoundException(`Post with id ${postId} not found`);
    return this.commentsRepository.find({
      where: { post: { id: postId } },
      relations: ['post'],
    });
  }
}
