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
  VisitLog,
  Request,
} from '../models';
import {VisitLogRepository} from '../repositories';

export class VisitLogRequestController {
  constructor(
    @repository(VisitLogRepository) protected visitLogRepository: VisitLogRepository,
  ) { }

  @get('/visit-logs/{id}/request', {
    responses: {
      '200': {
        description: 'VisitLog has one Request',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Request),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Request>,
  ): Promise<Request> {
    return this.visitLogRepository.request(id).get(filter);
  }

  @post('/visit-logs/{id}/request', {
    responses: {
      '200': {
        description: 'VisitLog model instance',
        content: {'application/json': {schema: getModelSchemaRef(Request)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof VisitLog.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Request, {
            title: 'NewRequestInVisitLog',
            exclude: ['id'],
            optional: ['visitLogId']
          }),
        },
      },
    }) request: Omit<Request, 'id'>,
  ): Promise<Request> {
    return this.visitLogRepository.request(id).create(request);
  }

  @patch('/visit-logs/{id}/request', {
    responses: {
      '200': {
        description: 'VisitLog.Request PATCH success count',
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
    return this.visitLogRepository.request(id).patch(request, where);
  }

  @del('/visit-logs/{id}/request', {
    responses: {
      '200': {
        description: 'VisitLog.Request DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Request)) where?: Where<Request>,
  ): Promise<Count> {
    return this.visitLogRepository.request(id).delete(where);
  }
}
