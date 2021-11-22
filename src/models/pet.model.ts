import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Request} from './request.model';
import {PetType} from './pet-type.model';
import {PetOwner} from './pet-owner.model';

@model()
export class Pet extends Entity {
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
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  skinColor: string;

  @property({
    type: 'string',
    required: true,
  })
  eyesColor: string;

  @property({
    type: 'number',
    required: true,
  })
  height: number;

  @property({
    type: 'string',
    required: true,
  })
  breed: string;

  @hasMany(() => Request)
  requests: Request[];

  @belongsTo(() => PetType)
  petTypeId: string;

  @belongsTo(() => PetOwner)
  petOwnerId: string;

  constructor(data?: Partial<Pet>) {
    super(data);
  }
}

export interface PetRelations {
  // describe navigational properties here
}

export type PetWithRelations = Pet & PetRelations;
