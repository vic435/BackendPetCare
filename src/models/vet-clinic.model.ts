import {Entity, model, property, hasMany} from '@loopback/repository';
import {Doctor} from './doctor.model';

@model()
export class VetClinic extends Entity {
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
  nit: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @hasMany(() => Doctor)
  doctors: Doctor[];

  constructor(data?: Partial<VetClinic>) {
    super(data);
  }
}

export interface VetClinicRelations {
  // describe navigational properties here
}

export type VetClinicWithRelations = VetClinic & VetClinicRelations;
