import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Revision} from './revision.model';

@model()
export class Vehiculo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  placa: string;

  @property({
    type: 'string',
  })
  caracteristica?: string;

  @property({
    type: 'string',
  })
  paisOrigen?: string;

  @property({
    type: 'number',
  })
  cilindraje?: number;

  @property({
    type: 'number',
  })
  capacidadPasajeros?: number;

  @property({
    type: 'number',
  })
  modelo?: number;

  @property({
    type: 'string',
  })
  marca?: string;

  @property({
    type: 'string',
  })
  tipoVehiculo?: string;

  @belongsTo(() => Usuario, {name: 'tiene'})
  usuarioId: string;

  @hasMany(() => Revision)
  puede_tener: Revision[];

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
