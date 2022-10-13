import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import CartItem from 'src/cart';

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  foodname: string;

  @Column()
  category: string;

  @Column()
  time: number;
/* 
  @ManyToMany(() => CartItem, (cart) => cart.food)
  @JoinTable()
  carts: CartItem[]
 */
/*   @ManyToMany(() => CartItem, (frige) => frige.foods)
  @JoinTable()
  friges: CartItem[] */
}
