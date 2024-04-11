import { UUID } from "crypto";
import { Account } from "src/account/entities/account.entity";
import { Activity } from "src/activity/entities/activity.entity";
import { HistoryTran } from "src/history-trans/entities/history-tran.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
export enum Rank {
    WARRIOR="WARRIOR",
    WARMONGER = "WARMONGER",
    OVERSEER = "OVERSEER",
    CHIEFTAIN ="CHIEFTAIN",
}
export enum Race {
    ANTUK ="ANTUK ",
    KRAKEE  = "KRAKEE ",
    MANTAH  = "MANTAH ",
    MONTAK  ="MONTAK ",
    MUU="MUU",
}
export enum Class{
    AIR  ="AIR",
    MAGE   = "MAGE",
    MELEE   = "MELEE",
    RANGE   ="RANGE",
    TANKER="TANKER",
}
@Entity({name:"Hero"})
export class Hero {
    @PrimaryGeneratedColumn()
    id:number;
    @Column({unique:true})
    name:string;
    @Column({nullable:true})
    avatar:string;
    @Column()
    rank:Rank;
    @Column()
    race:Race;
    @Column()
    class:Class;
    @Column()
    power:number;
    @Column()
    hp:number;
    @Column()
    speed:number;
    @Column()
    dps:number;
    @Column()
    status:number;
    @Column()
    price:number;
    @Column()
    account_id:UUID;

    @ManyToOne(()=>Account,(account)=>account.heroes)
    @JoinColumn({ name: 'account_id', referencedColumnName: 'id' })
    account:Account;
    @OneToMany(() => HistoryTran, (historyTran) => historyTran.hero) 
    historyTran: HistoryTran[];
 
    @OneToMany(() => Activity, (activity) => activity.hero)
    activities: Activity[];

}
