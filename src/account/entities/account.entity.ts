import { Exclude } from "class-transformer";
import { UUID } from "crypto";
import { Activity } from "src/activity/entities/activity.entity";
import { Hero } from "src/hero/entities/hero.entity";
import { HistoryTran } from "src/history-trans/entities/history-tran.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({name:"Account"})
export class Account {
    @PrimaryColumn()
    id:UUID;
    @Column({nullable:true})
    avatar:string;

    @Column({unique:true})
    username:string;
    
    @Exclude()
    @Column()
    password:string;

    @Column({unique:true})
    email:string;

    @Column({default:0})
    balance:number;
    
    @OneToMany(()=>HistoryTran,(ht)=>ht.account_buyer) 
    historyTranSeller:HistoryTran[]

    @OneToMany(()=>HistoryTran,(ht)=>ht.account_seller)
    historyTranBuyer:HistoryTran[]

    @OneToMany(()=>Hero,(h)=>h.account)
    heroes:Hero[];
    
    @OneToMany(()=>Activity,(a)=>a.account)
    activities:Activity[]
}
