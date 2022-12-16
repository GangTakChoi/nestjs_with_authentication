import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { Order } from 'src/domains/order/entities/order.entity';
import { UserRole } from './user-role.entity';
import { Product } from 'src/domains/product/entities/product.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  accountId: string;

  @Column({ unique: true })
  nickname: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @OneToMany(() => UserRole, (userRole) => userRole.user, {
    eager: true,
    cascade: true,
  })
  roles: UserRole[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
