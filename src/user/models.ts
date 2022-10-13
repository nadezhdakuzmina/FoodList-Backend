import CartItem from 'src/cart';
import FrigeItem from 'src/frige';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, nullable: true })
  token: string;

  @Column({ nullable: true })
  tokenExpires: string;
  
  @OneToMany(() => CartItem, (card) => card.user)
  @JoinColumn()
  cards: CartItem[];

  @OneToMany(() => FrigeItem, (frige) => frige.user)
  @JoinColumn()
  frigeItems: FrigeItem[];
}
