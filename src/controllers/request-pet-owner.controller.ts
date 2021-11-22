import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Request,
  PetOwner,
} from '../models';
import {RequestRepository} from '../repositories';

export class RequestPetOwnerController {
  constructor(
    @repository(RequestRepository)
    public requestRepository: RequestRepository,
  ) { }

  @get('/requests/{id}/pet-owner', {
    responses: {
      '200': {
        description: 'PetOwner belonging to Request',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PetOwner)},
          },
        },
      },
    },
  })
  async getPetOwner(
    @param.path.string('id') id: typeof Request.prototype.id,
  ): Promise<PetOwner> {
    return this.requestRepository.petOwner(id);
  }
}
