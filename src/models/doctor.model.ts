import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Request} from './request.model';
import {VetClinic} from './vet-clinic.model';
import {PetType} from './pet-type.model';

@model()
export class Doctor extends Entity {
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
  professionalCard: string;

  @property({
    type: 'string',
    required: true,
  })
  Specialty: string;

  @hasMany(() => Request)
  requests: Request[];

  @belongsTo(() => VetClinic)
  vetClinicId: string;

  @hasMany(() => PetType)
  petTypes: PetType[];

  constructor(data?: Partial<Doctor>) {
    super(data);
  }
}

export interface DoctorRelations {
  // describe navigational properties here
}

export type DoctorWithRelations = Doctor & DoctorRelations;
