import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PetType, PetTypeRelations, Pet, Request, Doctor} from '../models';
import {PetRepository} from './pet.repository';
import {RequestRepository} from './request.repository';
import {DoctorRepository} from './doctor.repository';

export class PetTypeRepository extends DefaultCrudRepository<
  PetType,
  typeof PetType.prototype.id,
  PetTypeRelations
> {

  public readonly pets: HasManyRepositoryFactory<Pet, typeof PetType.prototype.id>;

  public readonly requests: HasManyRepositoryFactory<Request, typeof PetType.prototype.id>;

  public readonly doctor: BelongsToAccessor<Doctor, typeof PetType.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PetRepository') protected petRepositoryGetter: Getter<PetRepository>, @repository.getter('RequestRepository') protected requestRepositoryGetter: Getter<RequestRepository>, @repository.getter('DoctorRepository') protected doctorRepositoryGetter: Getter<DoctorRepository>,
  ) {
    super(PetType, dataSource);
    this.doctor = this.createBelongsToAccessorFor('doctor', doctorRepositoryGetter,);
    this.registerInclusionResolver('doctor', this.doctor.inclusionResolver);
    this.requests = this.createHasManyRepositoryFactoryFor('requests', requestRepositoryGetter,);
    this.registerInclusionResolver('requests', this.requests.inclusionResolver);
    this.pets = this.createHasManyRepositoryFactoryFor('pets', petRepositoryGetter,);
    this.registerInclusionResolver('pets', this.pets.inclusionResolver);
  }
}
