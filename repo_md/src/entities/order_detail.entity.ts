import {
  Entity,
  PrimaryGeneratedColumn,
  //   JoinColumn,
  Column,
  ManyToOne,
  JoinColumn,
  // OneToMany,
  //   ManyToOne,
} from 'typeorm';
import { Order } from './order.entity';
// import { User } from './users.entity';
// import { OrderStatus } from 'src/enum/orderStatus.enum';
// import { OrderProduct } from './order_product.entity';

@Entity({ name: 'orderDetails' })
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  uuid_order_detail: string;

  @ManyToOne(() => Order, (order) => order.order_details)
  @JoinColumn({ name: 'uuid_order' })
  uuid_order: Order;

  // @ManyToOne(() => Product, (product) => product.orderProducts)
  // @JoinColumn({ name: 'uuid_product' })
  // product: Product;

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
  date_updated: Date;
}
