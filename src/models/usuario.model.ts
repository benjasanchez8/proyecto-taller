import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {Perfil} from './perfil.model';
import {Vehiculo} from './vehiculo.model';

@model()
export class Usuario extends Entity {
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
  nombre: string;

  @property({
    type: 'number',
    default: 0,
  })
  telefono?: number;

  @property({
    type: 'date',
  })
  fechaNacimiento?: string;

  @property({
    type: 'string',
    required: true,
  })
  contrasenia: string;

  @property({
    type: 'string',
  })
  correo?: string;

  // @property({
  //   type: 'number',
  //   required: true,
  // })
  // perfil: number;

  @hasMany(() => Vehiculo)
  esta_asociado: Vehiculo[];

  @belongsTo(() => Perfil)
  perfilId: string;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
