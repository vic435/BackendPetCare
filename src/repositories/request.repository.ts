import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Request, RequestRelations, PetOwner, Pet, Doctor, PetType, VisitLog} from '../models';
import {PetOwnerRepository} from './pet-owner.repository';
import {PetRepository} from './pet.repository';
import {DoctorRepository} from './doctor.repository';
import {PetTypeRepository} from './pet-type.repository';
import {VisitLogRepository} from './visit-log.repository';

export class RequestRepository extends DefaultCrudRepository<
  Request,
  typeof Request.prototype.id,
  RequestRelations
> {

  public readonly petOwner: BelongsToAccessor<PetOwner, typeof Request.prototype.id>;

  public readonly pet: BelongsToAccessor<Pet, typeof Request.prototype.id>;

  public readonly doctor: BelongsToAccessor<Doctor, typeof Request.prototype.id>;

  public readonly petType: BelongsToAccessor<PetType, typeof Request.prototype.id>;

  public readonly visitLog: HasOneRepositoryFactory<VisitLog, typeof Request.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PetOwnerRepository') protected petOwnerRepositoryGetter: Getter<PetOwnerRepository>, @repository.getter('PetRepository') protected petRepositoryGetter: Getter<PetRepository>, @repository.getter('DoctorRepository') protected doctorRepositoryGetter: Getter<DoctorRepository>, @repository.getter('PetTypeRepository') protected petTypeRepositoryGetter: Getter<PetTypeRepository>, @repository.getter('VisitLogRepository') protected visitLogRepositoryGetter: Getter<VisitLogRepository>,
  ) {
    super(Request, dataSource);
    this.visitLog = this.createHasOneRepositoryFactoryFor('visitLog', visitLogRepositoryGetter);
    this.registerInclusionResolver('visitLog', this.visitLog.inclusionResolver);
    this.petType = this.createBelongsToAccessorFor('petType', petTypeRepositoryGetter,);
    this.registerInclusionResolver('petType', this.petType.inclusionResolver);
    this.doctor = this.createBelongsToAccessorFor('doctor', doctorRepositoryGetter,);
    this.registerInclusionResolver('doctor', this.doctor.inclusionResolver);
    this.pet = this.createBelongsToAccessorFor('pet', petRepositoryGetter,);
    this.registerInclusionResolver('pet', this.pet.inclusionResolver);
    this.petOwner = this.createBelongsToAccessorFor('petOwner', petOwnerRepositoryGetter,);
    this.registerInclusionResolver('petOwner', this.petOwner.inclusionResolver);
  }
}
