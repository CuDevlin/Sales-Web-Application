import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity} from "typeorm";
import { Order } from "./Order";

@Entity({ name: "order_item" })
export class OrderItem extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 13
    })
    ean: string;

    @Column()
    quantity: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    price: number;

    @ManyToOne(() => Order, order => order.orderItems)
    order: Order;
}
