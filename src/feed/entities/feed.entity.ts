import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class Feed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column('text', { array: true })
  images: string[];

  @Column('text', { array: true })
  captions: string[];

  @Column('text', { array: true })
  hashtags: string[];

  @Column('CREATD_AT')
  @CreateDateColumn()
  createdAt: Date;

  @Column('UPDATED_AT')
  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn()
  version: number;
}
