import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne,BaseEntity} from "typeorm";
import { OrderItem } from "./OrderItem";
import { Customer } from "./Customer";

@Entity({ name: "order" })
export class Order extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "purchaseDate", type: "date", default: () => "CURRENT_DATE" })
    purchaseDate: Date;

    @Column()
    country: string;

    @Column()
    device: string;

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    orderItems: OrderItem[];

    @ManyToOne(() => Customer, customer => customer.orders)
    customer: Customer;
}
