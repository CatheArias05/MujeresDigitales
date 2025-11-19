import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from './products.entity';

@Entity({ name: 'orderDetails' })
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  uuid_order_detail: string;

  @ManyToOne(() => Order, (order) => order.order_details)
  @JoinColumn({ name: 'uuid_order' })
  uuid_order: Order;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'uuid_product' })
  product: Product;

  @Column({
    type: 'int',
    nullable: false,
  })
  cant: number;

  @Column({
    type: 'decimal',
    nullable: true,
    default: 0,
  })
  iva_applied: number;

  @Column({
    type: 'decimal',
    nullable: true,
    default: 0,
  })
  discount: number;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  subtotal: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date_created: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  date_updated: Date | null;
}
