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
  PetOwner,
  Request,
} from '../models';
import {PetOwnerRepository} from '../repositories';

export class PetOwnerRequestController {
  constructor(
    @repository(PetOwnerRepository) protected petOwnerRepository: PetOwnerRepository,
  ) { }

  @get('/pet-owners/{id}/requests', {
    responses: {
      '200': {
        description: 'Array of PetOwner has many Request',
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
    return this.petOwnerRepository.requests(id).find(filter);
  }

  @post('/pet-owners/{id}/requests', {
    responses: {
      '200': {
        description: 'PetOwner model instance',
        content: {'application/json': {schema: getModelSchemaRef(Request)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof PetOwner.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Request, {
            title: 'NewRequestInPetOwner',
            exclude: ['id'],
            optional: ['petOwnerId']
          }),
        },
      },
    }) request: Omit<Request, 'id'>,
  ): Promise<Request> {
    return this.petOwnerRepository.requests(id).create(request);
  }

  @patch('/pet-owners/{id}/requests', {
    responses: {
      '200': {
        description: 'PetOwner.Request PATCH success count',
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
    return this.petOwnerRepository.requests(id).patch(request, where);
  }

  @del('/pet-owners/{id}/requests', {
    responses: {
      '200': {
        description: 'PetOwner.Request DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Request)) where?: Where<Request>,
  ): Promise<Count> {
    return this.petOwnerRepository.requests(id).delete(where);
  }
}
