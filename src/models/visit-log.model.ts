import {Entity, model, property, hasOne} from '@loopback/repository';
import {Request} from './request.model';

@model()
export class VisitLog extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  temperature: number;

  @property({
    type: 'number',
    required: true,
  })
  weight: number;

  @property({
    type: 'number',
    required: true,
  })
  heartRate: number;

  @property({
    type: 'string',
    required: true,
  })
  mood: string;

  @property({
    type: 'date',
    required: true,
  })
  visitDate: string;

  @property({
    type: 'string',
    required: true,
  })
  medicalFormulations: string;

  @property({
    type: 'string',
  })
  requestId?: string;

  @hasOne(() => Request)
  request: Request;

  constructor(data?: Partial<VisitLog>) {
    super(data);
  }
}

export interface VisitLogRelations {
  // describe navigational properties here
}

export type VisitLogWithRelations = VisitLog & VisitLogRelations;
