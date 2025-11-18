import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'business' })
export class Business {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 36 })
  uuid_usuario: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  registro_negocio: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  nombre_negocio: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ubicacion?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  descripcion?: string;

  @Column({ type: 'boolean', default: true })
  estado: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  fecha_actualizacion: Date;
}