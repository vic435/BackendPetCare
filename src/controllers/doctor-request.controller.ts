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
  Doctor,
  Request,
} from '../models';
import {DoctorRepository} from '../repositories';

export class DoctorRequestController {
  constructor(
    @repository(DoctorRepository) protected doctorRepository: DoctorRepository,
  ) { }

  @get('/doctors/{id}/requests', {
    responses: {
      '200': {
        description: 'Array of Doctor has many Request',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Request)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Request>,
  ): Promise<Request[]> {
    return this.doctorRepository.requests(id).find(filter);
  }

  @post('/doctors/{id}/requests', {
    responses: {
      '200': {
        description: 'Doctor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Request)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Doctor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Request, {
            title: 'NewRequestInDoctor',
            exclude: ['id'],
            optional: ['doctorId']
          }),
        },
      },
    }) request: Omit<Request, 'id'>,
  ): Promise<Request> {
    return this.doctorRepository.requests(id).create(request);
  }

  @patch('/doctors/{id}/requests', {
    responses: {
      '200': {
        description: 'Doctor.Request PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Request, {partial: true}),
        },
      },
    })
    request: Partial<Request>,
    @param.query.object('where', getWhereSchemaFor(Request)) where?: Where<Request>,
  ): Promise<Count> {
    return this.doctorRepository.requests(id).patch(request, where);
  }

  @del('/doctors/{id}/requests', {
    responses: {
      '200': {
        description: 'Doctor.Request DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Request)) where?: Where<Request>,
  ): Promise<Count> {
    return this.doctorRepository.requests(id).delete(where);
  }
}
