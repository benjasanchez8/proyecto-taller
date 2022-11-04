import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Usuario, Revision} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {RevisionRepository} from './revision.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype._id,
  VehiculoRelations
> {

  public readonly tiene: BelongsToAccessor<Usuario, typeof Vehiculo.prototype._id>;

  public readonly puede_tener: HasManyRepositoryFactory<Revision, typeof Vehiculo.prototype._id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('RevisionRepository') protected revisionRepositoryGetter: Getter<RevisionRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.puede_tener = this.createHasManyRepositoryFactoryFor('puede_tener', revisionRepositoryGetter,);
    this.registerInclusionResolver('puede_tener', this.puede_tener.inclusionResolver);
    this.tiene = this.createBelongsToAccessorFor('tiene', usuarioRepositoryGetter,);
    this.registerInclusionResolver('tiene', this.tiene.inclusionResolver);
  }
}
