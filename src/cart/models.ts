import User from 'src/user';
import Food from 'src/food';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinColumn } from 'typeorm';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isChecked: boolean;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.cards)
  @JoinColumn()
  user: User;
/* 
  @ManyToMany(() => Food, (food) => food.carts)
  @JoinColumn()
  foods: Food[]
 */
}
