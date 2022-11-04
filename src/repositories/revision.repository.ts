import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Revision, RevisionRelations, Repuesto, Vehiculo} from '../models';
import {RepuestoRepository} from './repuesto.repository';
import {VehiculoRepository} from './vehiculo.repository';

export class RevisionRepository extends DefaultCrudRepository<
  Revision,
  typeof Revision.prototype._id,
  RevisionRelations
> {

  public readonly esta_asociado: HasManyRepositoryFactory<Repuesto, typeof Revision.prototype._id>;

  public readonly es_para: BelongsToAccessor<Vehiculo, typeof Revision.prototype._id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('RepuestoRepository') protected repuestoRepositoryGetter: Getter<RepuestoRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Revision, dataSource);
    this.es_para = this.createBelongsToAccessorFor('es_para', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('es_para', this.es_para.inclusionResolver);
    this.esta_asociado = this.createHasManyRepositoryFactoryFor('esta_asociado', repuestoRepositoryGetter,);
    this.registerInclusionResolver('esta_asociado', this.esta_asociado.inclusionResolver);
  }
}
