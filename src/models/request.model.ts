import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {PetOwner} from './pet-owner.model';
import {Pet} from './pet.model';
import {Doctor} from './doctor.model';
import {PetType} from './pet-type.model';
import {VisitLog} from './visit-log.model';

@model()
export class Request extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  dateAttention: string;

  @belongsTo(() => PetOwner)
  petOwnerId: string;

  @belongsTo(() => Pet)
  petId: string;

  @belongsTo(() => Doctor)
  doctorId: string;

  @belongsTo(() => PetType)
  petTypeId: string;

  @hasOne(() => VisitLog)
  visitLog: VisitLog;

  @property({
    type: 'string',
  })
  visitLogId?: string;

  constructor(data?: Partial<Request>) {
    super(data);
  }
}

export interface RequestRelations {
  // describe navigational properties here
}

export type RequestWithRelations = Request & RequestRelations;
