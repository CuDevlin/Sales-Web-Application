import {Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity} from "typeorm";
import {Order} from "./Order";

@Entity({ name: "customer" })
export class Customer extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({
        unique: true
    })
    email: string;

    @OneToMany(() => Order, order => order.customer)
    orders: Order[];
}
