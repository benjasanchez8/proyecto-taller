import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Vehiculo, Perfil} from '../models';
import {PerfilRepository} from './perfil.repository';
import {VehiculoRepository} from './vehiculo.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype._id,
  UsuarioRelations
> {
  public readonly esta_asociado: HasManyRepositoryFactory<
    Vehiculo,
    typeof Usuario.prototype._id
  >;

  public readonly perfil: BelongsToAccessor<Perfil, typeof Usuario.prototype._id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
    @repository.getter('VehiculoRepository')
    protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
    @repository.getter('PerfilRepository')
    protected perfilRepositoryGetter: Getter<PerfilRepository>,
  ) {
    super(Usuario, dataSource);
    this.perfil = this.createBelongsToAccessorFor('perfil', perfilRepositoryGetter,);
    this.registerInclusionResolver('perfil', this.perfil.inclusionResolver);
    this.esta_asociado = this.createHasManyRepositoryFactoryFor(
      'esta_asociado',
      vehiculoRepositoryGetter,
    );
    this.registerInclusionResolver(
      'esta_asociado',
      this.esta_asociado.inclusionResolver,
    );
  }
}
