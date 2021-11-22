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
  PetType,
} from '../models';
import {DoctorRepository} from '../repositories';

export class DoctorPetTypeController {
  constructor(
    @repository(DoctorRepository) protected doctorRepository: DoctorRepository,
  ) { }

  @get('/doctors/{id}/pet-types', {
    responses: {
      '200': {
        description: 'Array of Doctor has many PetType',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PetType)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PetType>,
  ): Promise<PetType[]> {
    return this.doctorRepository.petTypes(id).find(filter);
  }

  @post('/doctors/{id}/pet-types', {
    responses: {
      '200': {
        description: 'Doctor model instance',
        content: {'application/json': {schema: getModelSchemaRef(PetType)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Doctor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PetType, {
            title: 'NewPetTypeInDoctor',
            exclude: ['id'],
            optional: ['doctorId']
          }),
        },
      },
    }) petType: Omit<PetType, 'id'>,
  ): Promise<PetType> {
    return this.doctorRepository.petTypes(id).create(petType);
  }

  @patch('/doctors/{id}/pet-types', {
    responses: {
      '200': {
        description: 'Doctor.PetType PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PetType, {partial: true}),
        },
      },
    })
    petType: Partial<PetType>,
    @param.query.object('where', getWhereSchemaFor(PetType)) where?: Where<PetType>,
  ): Promise<Count> {
    return this.doctorRepository.petTypes(id).patch(petType, where);
  }

  @del('/doctors/{id}/pet-types', {
    responses: {
      '200': {
        description: 'Doctor.PetType DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PetType)) where?: Where<PetType>,
  ): Promise<Count> {
    return this.doctorRepository.petTypes(id).delete(where);
  }
}
