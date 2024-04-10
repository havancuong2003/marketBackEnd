import { Hero } from 'src/hero/entities/hero.entity';
import { Account } from './../../account/entities/account.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UUID } from 'crypto';

@Entity({name:"HistoryTrans"})
export class HistoryTran {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    @CreateDateColumn()
    time:Date;
    @Column()
    value:number;
    @Column()
    seller:UUID;
    @Column()
    buyer:UUID;
    @Column()
    hero_id:number;

    @ManyToOne(()=>Account,(account)=>account.historyTranBuyer)
    @JoinColumn({ name: 'buyer', referencedColumnName: 'id' })
    account_buyer : Account;

    @ManyToOne(()=>Account,(account)=>account.historyTranSeller)
    @JoinColumn({ name:'seller', referencedColumnName: 'id' })
    account_seller : Account;

    @ManyToOne(()=>Hero,(hero)=>hero.historyTran)
    @JoinColumn({ name: 'hero_id', referencedColumnName: 'id' })
    hero : Hero;
}
