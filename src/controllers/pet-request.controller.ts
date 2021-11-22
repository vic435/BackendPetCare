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
  Pet,
  Request,
} from '../models';
import {PetRepository} from '../repositories';

export class PetRequestController {
  constructor(
    @repository(PetRepository) protected petRepository: PetRepository,
  ) { }

  @get('/pets/{id}/requests', {
    responses: {
      '200': {
        description: 'Array of Pet has many Request',
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
    return this.petRepository.requests(id).find(filter);
  }

  @post('/pets/{id}/requests', {
    responses: {
      '200': {
        description: 'Pet model instance',
        content: {'application/json': {schema: getModelSchemaRef(Request)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Pet.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Request, {
            title: 'NewRequestInPet',
            exclude: ['id'],
            optional: ['petId']
          }),
        },
      },
    }) request: Omit<Request, 'id'>,
  ): Promise<Request> {
    return this.petRepository.requests(id).create(request);
  }

  @patch('/pets/{id}/requests', {
    responses: {
      '200': {
        description: 'Pet.Request PATCH success count',
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
    return this.petRepository.requests(id).patch(request, where);
  }

  @del('/pets/{id}/requests', {
    responses: {
      '200': {
        description: 'Pet.Request DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Request)) where?: Where<Request>,
  ): Promise<Count> {
    return this.petRepository.requests(id).delete(where);
  }
}
