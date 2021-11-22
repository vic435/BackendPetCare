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
  Pet,
} from '../models';
import {RequestRepository} from '../repositories';

export class RequestPetController {
  constructor(
    @repository(RequestRepository)
    public requestRepository: RequestRepository,
  ) { }

  @get('/requests/{id}/pet', {
    responses: {
      '200': {
        description: 'Pet belonging to Request',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pet)},
          },
        },
      },
    },
  })
  async getPet(
    @param.path.string('id') id: typeof Request.prototype.id,
  ): Promise<Pet> {
    return this.requestRepository.pet(id);
  }
}
