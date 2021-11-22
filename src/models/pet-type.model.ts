import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Pet} from './pet.model';
import {Request} from './request.model';
import {Doctor} from './doctor.model';

@model()
export class PetType extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @hasMany(() => Pet)
  pets: Pet[];

  @hasMany(() => Request)
  requests: Request[];

  @belongsTo(() => Doctor)
  doctorId: string;

  constructor(data?: Partial<PetType>) {
    super(data);
  }
}

export interface PetTypeRelations {
  // describe navigational properties here
}

export type PetTypeWithRelations = PetType & PetTypeRelations;
