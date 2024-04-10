import { UUID } from 'crypto';
import { Account } from 'src/account/entities/account.entity';
import { Hero } from 'src/hero/entities/hero.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { CreateDateColumn } from 'typeorm';

@Entity({ name: "Activity" })
export class Activity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    event: string;

    @Column()
    value: number;

    @CreateDateColumn()
    time: Date;

    @Column()
    account_id: UUID;

    @Column()
    opposite_user_id: UUID;

    @Column()
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
