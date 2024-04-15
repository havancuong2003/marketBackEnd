import { UUID } from 'crypto';
import { Account } from 'src/account/entities/account.entity';
import { Event } from 'src/constains';
import { Hero } from 'src/hero/entities/hero.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { CreateDateColumn } from 'typeorm';
  

export enum Event{
    LIST="LIST",
    UNLUST="UNLUST",
    SALE="SALE",
    PURCHASE="PURCHASE",
}

@Entity({ name: "Activity" })
export class Activity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    event: Event;

    @Column({nullable:true})
    value: number;

    @CreateDateColumn()
    time: Date;

    @Column({nullable:true})
    account_id: UUID;

    @Column({nullable:true})
    opposite_user_id: UUID; 

    @Column({nullable:true})
    hero_id: number;


    @ManyToOne(() => Account, (user) => user.activities)
    @JoinColumn({ name: 'account_id', referencedColumnName: 'id' })
    account: Account;

    @ManyToOne(() => Account)
    @JoinColumn({ name: 'opposite_user_id', referencedColumnName: 'id' })
    opposite_user: Account;

    @ManyToOne(() => Hero, (hero) => hero.activities)
    @JoinColumn({ name: 'hero_id', referencedColumnName: 'id' })
    hero: Hero;
}
