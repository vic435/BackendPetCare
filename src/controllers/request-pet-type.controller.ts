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
  PetType,
} from '../models';
import {RequestRepository} from '../repositories';

export class RequestPetTypeController {
  constructor(
    @repository(RequestRepository)
    public requestRepository: RequestRepository,
  ) { }

  @get('/requests/{id}/pet-type', {
    responses: {
      '200': {
        description: 'PetType belonging to Request',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PetType)},
          },
        },
      },
    },
  })
  async getPetType(
    @param.path.string('id') id: typeof Request.prototype.id,
  ): Promise<PetType> {
    return this.requestRepository.petType(id);
  }
}
