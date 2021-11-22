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
  PetOwner,
} from '../models';
import {PetRepository} from '../repositories';

export class PetPetOwnerController {
  constructor(
    @repository(PetRepository)
    public petRepository: PetRepository,
  ) { }

  @get('/pets/{id}/pet-owner', {
    responses: {
      '200': {
        description: 'PetOwner belonging to Pet',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PetOwner)},
          },
        },
      },
    },
  })
  async getPetOwner(
    @param.path.string('id') id: typeof Pet.prototype.id,
  ): Promise<PetOwner> {
    return this.petRepository.petOwner(id);
  }
}
