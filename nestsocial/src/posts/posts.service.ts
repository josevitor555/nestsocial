import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { CreatePostDto, UpdatePostDto } from './validations/post.validation';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
  ) {}

  async create(userId: string, createPostDto: CreatePostDto): Promise<PostDocument> {
    const createdPost = new this.postModel({
      ...createPostDto,
      author: userId,
    });
    return createdPost.save();
  }

  async findAll(): Promise<PostDocument[]> {
    return this.postModel
      .find()
      .populate('author', 'name email') // Retorna dados básicos do autor, sem senha
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<PostDocument> {
    const post = await this.postModel
      .findById(id)
      .populate('author', 'name email')
      .exec();
    
    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }
    return post;
  }

  async update(id: string, userId: string, updatePostDto: UpdatePostDto): Promise<PostDocument> {
    const post = await this.findOne(id);

    // Verifica se o usuário é o dono do post
    if ((post.author as any)._id.toString() !== userId) {
      throw new ForbiddenException('Você não tem permissão para editar este post');
    }


    Object.assign(post, updatePostDto);
    return post.save();
  }

  async delete(id: string, userId: string): Promise<void> {
    const post = await this.findOne(id);

    // Verifica se o usuário é o dono do post
    if ((post.author as any)._id.toString() !== userId) {
      throw new ForbiddenException('Você não tem permissão para deletar este post');
    }


    await this.postModel.deleteOne({ _id: id }).exec();
  }
}
