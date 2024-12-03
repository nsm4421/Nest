import { Injectable } from '@nestjs/common';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feed } from './entities/feed.entity';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(Feed)
    private readonly feedRepository: Repository<Feed>,
  ) {}

  create(createFeedDto: CreateFeedDto) {
    return this.feedRepository.save(createFeedDto);
  }

  findAll() {
    return this.feedRepository.find();
  }

  findOne(id: number) {
    return this.feedRepository.findOneBy({ id });
  }

  update(id: number, updateFeedDto: UpdateFeedDto) {
    return this.feedRepository.update(id, updateFeedDto).then(() => id);
  }

  remove(id: number) {
    return this.feedRepository.delete({ id }).then(() => id);
  }
}
