import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { constants, enums } from 'gym-shared';

import { UserEntity } from '@/entities';

@Entity()
export default class UserSettings {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'enum',
    enum: enums.PALETTE_MODES,
    default: constants.DEFAULT_PALETTE_MODE,
  })
  palette!: enums.PALETTE_MODES;

  @Column({
    type: 'enum',
    enum: enums.CURRENCIES,
    default: constants.DEFAULT_CURRENCY,
  })
  currency!: enums.CURRENCIES;

  @Column({
    type: 'enum',
    enum: enums.MEASUREMENTS_TYPES,
    default: [Object.values(enums.MEASUREMENTS_TYPES)],
    array: true,
  })
  activeMeasurementsKeys!: enums.MEASUREMENTS_TYPES[];

  @OneToOne(() => UserEntity)
  user!: UserEntity;
}
