import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PetType,
  Doctor,
} from '../models';
import {PetTypeRepository} from '../repositories';

export class PetTypeDoctorController {
  constructor(
    @repository(PetTypeRepository)
    public petTypeRepository: PetTypeRepository,
  ) { }

  @get('/pet-types/{id}/doctor', {
    responses: {
      '200': {
        description: 'Doctor belonging to PetType',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Doctor)},
          },
        },
      },
    },
  })
  async getDoctor(
    @param.path.string('id') id: typeof PetType.prototype.id,
  ): Promise<Doctor> {
    return this.petTypeRepository.doctor(id);
  }
}
