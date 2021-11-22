import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pet,
  PetType,
} from '../models';
import {PetRepository} from '../repositories';

export class PetPetTypeController {
  constructor(
    @repository(PetRepository)
    public petRepository: PetRepository,
  ) { }

  @get('/pets/{id}/pet-type', {
    responses: {
      '200': {
        description: 'PetType belonging to Pet',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PetType)},
          },
        },
      },
    },
  })
  async getPetType(
    @param.path.string('id') id: typeof Pet.prototype.id,
  ): Promise<PetType> {
    return this.petRepository.petType(id);
  }
}
