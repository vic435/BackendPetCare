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
  Request,
  VisitLog,
} from '../models';
import {RequestRepository} from '../repositories';

export class RequestVisitLogController {
  constructor(
    @repository(RequestRepository) protected requestRepository: RequestRepository,
  ) { }

  @get('/requests/{id}/visit-log', {
    responses: {
      '200': {
        description: 'Request has one VisitLog',
        content: {
          'application/json': {
            schema: getModelSchemaRef(VisitLog),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<VisitLog>,
  ): Promise<VisitLog> {
    return this.requestRepository.visitLog(id).get(filter);
  }

  @post('/requests/{id}/visit-log', {
    responses: {
      '200': {
        description: 'Request model instance',
        content: {'application/json': {schema: getModelSchemaRef(VisitLog)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Request.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitLog, {
            title: 'NewVisitLogInRequest',
            exclude: ['id'],
            optional: ['requestId']
          }),
        },
      },
    }) visitLog: Omit<VisitLog, 'id'>,
  ): Promise<VisitLog> {
    return this.requestRepository.visitLog(id).create(visitLog);
  }

  @patch('/requests/{id}/visit-log', {
    responses: {
      '200': {
        description: 'Request.VisitLog PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitLog, {partial: true}),
        },
      },
    })
    visitLog: Partial<VisitLog>,
    @param.query.object('where', getWhereSchemaFor(VisitLog)) where?: Where<VisitLog>,
  ): Promise<Count> {
    return this.requestRepository.visitLog(id).patch(visitLog, where);
  }

  @del('/requests/{id}/visit-log', {
    responses: {
      '200': {
        description: 'Request.VisitLog DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(VisitLog)) where?: Where<VisitLog>,
  ): Promise<Count> {
    return this.requestRepository.visitLog(id).delete(where);
  }
}
