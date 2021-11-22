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
  Pet,
} from '../models';
import {PetTypeRepository} from '../repositories';

export class PetTypePetController {
  constructor(
    @repository(PetTypeRepository) protected petTypeRepository: PetTypeRepository,
  ) { }

  @get('/pet-types/{id}/pets', {
    responses: {
      '200': {
        description: 'Array of PetType has many Pet',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pet)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Pet>,
  ): Promise<Pet[]> {
    return this.petTypeRepository.pets(id).find(filter);
  }

  @post('/pet-types/{id}/pets', {
    responses: {
      '200': {
        description: 'PetType model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pet)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof PetType.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pet, {
            title: 'NewPetInPetType',
            exclude: ['id'],
            optional: ['petTypeId']
          }),
        },
      },
    }) pet: Omit<Pet, 'id'>,
  ): Promise<Pet> {
    return this.petTypeRepository.pets(id).create(pet);
  }

  @patch('/pet-types/{id}/pets', {
    responses: {
      '200': {
        description: 'PetType.Pet PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pet, {partial: true}),
        },
      },
    })
    pet: Partial<Pet>,
    @param.query.object('where', getWhereSchemaFor(Pet)) where?: Where<Pet>,
  ): Promise<Count> {
    return this.petTypeRepository.pets(id).patch(pet, where);
  }

  @del('/pet-types/{id}/pets', {
    responses: {
      '200': {
        description: 'PetType.Pet DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Pet)) where?: Where<Pet>,
  ): Promise<Count> {
    return this.petTypeRepository.pets(id).delete(where);
  }
}
