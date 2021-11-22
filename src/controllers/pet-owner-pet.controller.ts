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
  Pet,
} from '../models';
import {PetOwnerRepository} from '../repositories';

export class PetOwnerPetController {
  constructor(
    @repository(PetOwnerRepository) protected petOwnerRepository: PetOwnerRepository,
  ) { }

  @get('/pet-owners/{id}/pets', {
    responses: {
      '200': {
        description: 'Array of PetOwner has many Pet',
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
    return this.petOwnerRepository.pets(id).find(filter);
  }

  @post('/pet-owners/{id}/pets', {
    responses: {
      '200': {
        description: 'PetOwner model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pet)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof PetOwner.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pet, {
            title: 'NewPetInPetOwner',
            exclude: ['id'],
            optional: ['petOwnerId']
          }),
        },
      },
    }) pet: Omit<Pet, 'id'>,
  ): Promise<Pet> {
    return this.petOwnerRepository.pets(id).create(pet);
  }

  @patch('/pet-owners/{id}/pets', {
    responses: {
      '200': {
        description: 'PetOwner.Pet PATCH success count',
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
    return this.petOwnerRepository.pets(id).patch(pet, where);
  }

  @del('/pet-owners/{id}/pets', {
    responses: {
      '200': {
        description: 'PetOwner.Pet DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Pet)) where?: Where<Pet>,
  ): Promise<Count> {
    return this.petOwnerRepository.pets(id).delete(where);
  }
}
