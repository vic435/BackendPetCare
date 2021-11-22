import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Doctor,
  VetClinic,
} from '../models';
import {DoctorRepository} from '../repositories';

export class DoctorVetClinicController {
  constructor(
    @repository(DoctorRepository)
    public doctorRepository: DoctorRepository,
  ) { }

  @get('/doctors/{id}/vet-clinic', {
    responses: {
      '200': {
        description: 'VetClinic belonging to Doctor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(VetClinic)},
          },
        },
      },
    },
  })
  async getVetClinic(
    @param.path.string('id') id: typeof Doctor.prototype.id,
  ): Promise<VetClinic> {
    return this.doctorRepository.vetClinic(id);
  }
}
