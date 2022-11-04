import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Revision,
  Repuesto,
} from '../models';
import {RevisionRepository} from '../repositories';

export class RevisionRepuestoController {
  constructor(
    @repository(RevisionRepository) protected revisionRepository: RevisionRepository,
  ) { }

  @get('/revisions/{id}/repuestos', {
    responses: {
      '200': {
        description: 'Array of Revision has many Repuesto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Repuesto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Repuesto>,
  ): Promise<Repuesto[]> {
    return this.revisionRepository.esta_asociado(id).find(filter);
  }

  @post('/revisions/{id}/repuestos', {
    responses: {
      '200': {
        description: 'Revision model instance',
        content: {'application/json': {schema: getModelSchemaRef(Repuesto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Revision.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Repuesto, {
            title: 'NewRepuestoInRevision',
            exclude: ['_id'],
            optional: ['revisionId']
          }),
        },
      },
    }) repuesto: Omit<Repuesto, '_id'>,
  ): Promise<Repuesto> {
    return this.revisionRepository.esta_asociado(id).create(repuesto);
  }

  @patch('/revisions/{id}/repuestos', {
    responses: {
      '200': {
        description: 'Revision.Repuesto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Repuesto, {partial: true}),
        },
      },
    })
    repuesto: Partial<Repuesto>,
    @param.query.object('where', getWhereSchemaFor(Repuesto)) where?: Where<Repuesto>,
  ): Promise<Count> {
    return this.revisionRepository.esta_asociado(id).patch(repuesto, where);
  }

  @del('/revisions/{id}/repuestos', {
    responses: {
      '200': {
        description: 'Revision.Repuesto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Repuesto)) where?: Where<Repuesto>,
  ): Promise<Count> {
    return this.revisionRepository.esta_asociado(id).delete(where);
  }
}
