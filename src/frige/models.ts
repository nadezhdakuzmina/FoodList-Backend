import User from 'src/user';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class FrigeItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'bigint', nullable: true })
  expires: number;

  @Column({ default: false, nullable: true })
  hasBeenAddedToCart: boolean;

  @Column()
  foodType: string;

  @ManyToOne(() => User, (user) => user.cards)
  @JoinColumn()
  user: User;
}
