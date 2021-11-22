import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PetOwner, PetOwnerRelations, Request, Pet} from '../models';
import {RequestRepository} from './request.repository';
import {PetRepository} from './pet.repository';

export class PetOwnerRepository extends DefaultCrudRepository<
  PetOwner,
  typeof PetOwner.prototype.id,
  PetOwnerRelations
> {

  public readonly requests: HasManyRepositoryFactory<Request, typeof PetOwner.prototype.id>;

  public readonly pets: HasManyRepositoryFactory<Pet, typeof PetOwner.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RequestRepository') protected requestRepositoryGetter: Getter<RequestRepository>, @repository.getter('PetRepository') protected petRepositoryGetter: Getter<PetRepository>,
  ) {
    super(PetOwner, dataSource);
    this.pets = this.createHasManyRepositoryFactoryFor('pets', petRepositoryGetter,);
    this.registerInclusionResolver('pets', this.pets.inclusionResolver);
    this.requests = this.createHasManyRepositoryFactoryFor('requests', requestRepositoryGetter,);
    this.registerInclusionResolver('requests', this.requests.inclusionResolver);
  }
}
