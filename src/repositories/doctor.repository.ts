import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Doctor, DoctorRelations, Request, VetClinic, PetType} from '../models';
import {RequestRepository} from './request.repository';
import {VetClinicRepository} from './vet-clinic.repository';
import {PetTypeRepository} from './pet-type.repository';

export class DoctorRepository extends DefaultCrudRepository<
  Doctor,
  typeof Doctor.prototype.id,
  DoctorRelations
> {

  public readonly requests: HasManyRepositoryFactory<Request, typeof Doctor.prototype.id>;

  public readonly vetClinic: BelongsToAccessor<VetClinic, typeof Doctor.prototype.id>;

  public readonly petTypes: HasManyRepositoryFactory<PetType, typeof Doctor.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RequestRepository') protected requestRepositoryGetter: Getter<RequestRepository>, @repository.getter('VetClinicRepository') protected vetClinicRepositoryGetter: Getter<VetClinicRepository>, @repository.getter('PetTypeRepository') protected petTypeRepositoryGetter: Getter<PetTypeRepository>,
  ) {
    super(Doctor, dataSource);
    this.petTypes = this.createHasManyRepositoryFactoryFor('petTypes', petTypeRepositoryGetter,);
    this.registerInclusionResolver('petTypes', this.petTypes.inclusionResolver);
    this.vetClinic = this.createBelongsToAccessorFor('vetClinic', vetClinicRepositoryGetter,);
    this.registerInclusionResolver('vetClinic', this.vetClinic.inclusionResolver);
    this.requests = this.createHasManyRepositoryFactoryFor('requests', requestRepositoryGetter,);
    this.registerInclusionResolver('requests', this.requests.inclusionResolver);
  }
}
