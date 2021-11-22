import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Pet, PetRelations, Request, PetType, PetOwner} from '../models';
import {RequestRepository} from './request.repository';
import {PetTypeRepository} from './pet-type.repository';
import {PetOwnerRepository} from './pet-owner.repository';

export class PetRepository extends DefaultCrudRepository<
  Pet,
  typeof Pet.prototype.id,
  PetRelations
> {

  public readonly requests: HasManyRepositoryFactory<Request, typeof Pet.prototype.id>;

  public readonly petType: BelongsToAccessor<PetType, typeof Pet.prototype.id>;

  public readonly petOwner: BelongsToAccessor<PetOwner, typeof Pet.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RequestRepository') protected requestRepositoryGetter: Getter<RequestRepository>, @repository.getter('PetTypeRepository') protected petTypeRepositoryGetter: Getter<PetTypeRepository>, @repository.getter('PetOwnerRepository') protected petOwnerRepositoryGetter: Getter<PetOwnerRepository>,
  ) {
    super(Pet, dataSource);
    this.petOwner = this.createBelongsToAccessorFor('petOwner', petOwnerRepositoryGetter,);
    this.registerInclusionResolver('petOwner', this.petOwner.inclusionResolver);
    this.petType = this.createBelongsToAccessorFor('petType', petTypeRepositoryGetter,);
    this.registerInclusionResolver('petType', this.petType.inclusionResolver);
    this.requests = this.createHasManyRepositoryFactoryFor('requests', requestRepositoryGetter,);
    this.registerInclusionResolver('requests', this.requests.inclusionResolver);
  }
}
