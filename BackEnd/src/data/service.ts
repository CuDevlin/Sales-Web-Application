import { DataSource } from 'typeorm';
import {Order} from "../entity/Order";
import {OrderItem} from "../entity/OrderItem";
import {Customer} from "../entity/Customer";

export class DatabaseService {
    private static instance: DataSource;

    private constructor() {}

    public static getInstance(): DataSource {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DataSource({
                schema: "web_app_schema",
                type: "postgres",
                host: "localhost",
                port: 5432,
                username: "postgres", 
                password: "bobs", //Future add secrect key to avoid exposing this data.
                database: "postgres",
                entities: [Order, OrderItem, Customer],
                synchronize: true
            });
        }

        return DatabaseService.instance;
    }
}
