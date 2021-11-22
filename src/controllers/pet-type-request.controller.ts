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
  PetType,
  Request,
} from '../models';
import {PetTypeRepository} from '../repositories';

export class PetTypeRequestController {
  constructor(
    @repository(PetTypeRepository) protected petTypeRepository: PetTypeRepository,
  ) { }

  @get('/pet-types/{id}/requests', {
    responses: {
      '200': {
        description: 'Array of PetType has many Request',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Request)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Request>,
  ): Promise<Request[]> {
    return this.petTypeRepository.requests(id).find(filter);
  }

  @post('/pet-types/{id}/requests', {
    responses: {
      '200': {
        description: 'PetType model instance',
        content: {'application/json': {schema: getModelSchemaRef(Request)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof PetType.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Request, {
            title: 'NewRequestInPetType',
            exclude: ['id'],
            optional: ['petTypeId']
          }),
        },
      },
    }) request: Omit<Request, 'id'>,
  ): Promise<Request> {
    return this.petTypeRepository.requests(id).create(request);
  }

  @patch('/pet-types/{id}/requests', {
    responses: {
      '200': {
        description: 'PetType.Request PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Request, {partial: true}),
        },
      },
    })
    request: Partial<Request>,
    @param.query.object('where', getWhereSchemaFor(Request)) where?: Where<Request>,
  ): Promise<Count> {
    return this.petTypeRepository.requests(id).patch(request, where);
  }

  @del('/pet-types/{id}/requests', {
    responses: {
      '200': {
        description: 'PetType.Request DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Request)) where?: Where<Request>,
  ): Promise<Count> {
    return this.petTypeRepository.requests(id).delete(where);
  }
}
