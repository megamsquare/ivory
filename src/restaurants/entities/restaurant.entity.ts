import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'restaurants' })
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column('numeric')
  latitude: number;

  @Column('numeric')
  longitude: number;
}
