import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Repuesto} from './repuesto.model';
import {Vehiculo} from './vehiculo.model';

@model()
export class Revision extends Entity {
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
  tipoRevision: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaRevision: string;

  @property({
    type: 'number',
    required: true,
  })
  costoRevision: number;

  @hasMany(() => Repuesto)
  esta_asociado: Repuesto[];

  @belongsTo(() => Vehiculo, {name: 'es_para'})
  vehiculoId: string;

  constructor(data?: Partial<Revision>) {
    super(data);
  }
}

export interface RevisionRelations {
  // describe navigational properties here
}

export type RevisionWithRelations = Revision & RevisionRelations;
