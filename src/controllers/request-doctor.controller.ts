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
  Doctor,
} from '../models';
import {RequestRepository} from '../repositories';

export class RequestDoctorController {
  constructor(
    @repository(RequestRepository)
    public requestRepository: RequestRepository,
  ) { }

  @get('/requests/{id}/doctor', {
    responses: {
      '200': {
        description: 'Doctor belonging to Request',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Doctor)},
          },
        },
      },
    },
  })
  async getDoctor(
    @param.path.string('id') id: typeof Request.prototype.id,
  ): Promise<Doctor> {
    return this.requestRepository.doctor(id);
  }
}
