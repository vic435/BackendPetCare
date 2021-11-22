import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {VisitLog, VisitLogRelations, Request} from '../models';
import {RequestRepository} from './request.repository';

export class VisitLogRepository extends DefaultCrudRepository<
  VisitLog,
  typeof VisitLog.prototype.id,
  VisitLogRelations
> {

  public readonly request: HasOneRepositoryFactory<Request, typeof VisitLog.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RequestRepository') protected requestRepositoryGetter: Getter<RequestRepository>,
  ) {
    super(VisitLog, dataSource);
    this.request = this.createHasOneRepositoryFactoryFor('request', requestRepositoryGetter);
    this.registerInclusionResolver('request', this.request.inclusionResolver);
  }
}
