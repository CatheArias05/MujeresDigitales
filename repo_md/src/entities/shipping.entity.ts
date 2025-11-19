import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum EstadoEnvio {
  PENDIENTE = 'pendiente',
  EN_CAMINO = 'en_camino',
  ENTREGADO = 'entregado',
}

@Entity({ name: 'shipping' })
export class Shipping {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 36 })
  uuid_orden_de_compra: string;

  @Column({ type: 'timestamp', nullable: true })
  fecha_emision: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_entrega: Date;

  @Column({ type: 'enum', enum: EstadoEnvio, default: EstadoEnvio.PENDIENTE })
  estado_envio: EstadoEnvio;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  fecha_actualizacion: Date;
}