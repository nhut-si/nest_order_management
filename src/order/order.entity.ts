import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Product } from '../product/product.entity';

@ObjectType()
@Entity()
export class Order {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: false })
  customerName: string;

  @Field(() => Float)
  @Column({ type: 'float', nullable: false })
  totalPrice: number;

  @Field(() => [Product])
  @ManyToMany(() => Product, product => product.orders)
  @JoinTable()
  products: Product[];
}