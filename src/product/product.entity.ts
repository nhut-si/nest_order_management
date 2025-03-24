import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Order } from '../order/order.entity';

@ObjectType()
@Entity()
export class Product {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100, nullable: false })
  name: string;

  @Field(() => Float)
  @Column({ type: 'float', nullable: false })
  price: number;

  @Field(() => Int)
  @Column({ nullable: false })
  stock: number;

  @Field(() => [Order])
  @ManyToMany(() => Order, order => order.products)
  orders: Order[];
}