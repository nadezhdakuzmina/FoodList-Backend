import User from 'src/user';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class FrigeItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  expires: string;

  @Column()
  foodType: string;

  @ManyToOne(() => User, (user) => user.cards)
  @JoinColumn()
  user: User;
}
