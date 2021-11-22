import {Entity, model, property, hasMany} from '@loopback/repository';
import {Request} from './request.model';
import {Pet} from './pet.model';

@model()
export class PetOwner extends Entity {
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
  bankAccount: string;

  @hasMany(() => Request)
  requests: Request[];

  @hasMany(() => Pet)
  pets: Pet[];

  constructor(data?: Partial<PetOwner>) {
    super(data);
  }
}

export interface PetOwnerRelations {
  // describe navigational properties here
}

export type PetOwnerWithRelations = PetOwner & PetOwnerRelations;
