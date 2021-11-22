import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {VetClinic, VetClinicRelations, Doctor} from '../models';
import {DoctorRepository} from './doctor.repository';

export class VetClinicRepository extends DefaultCrudRepository<
  VetClinic,
  typeof VetClinic.prototype.id,
  VetClinicRelations
> {

  public readonly doctors: HasManyRepositoryFactory<Doctor, typeof VetClinic.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('DoctorRepository') protected doctorRepositoryGetter: Getter<DoctorRepository>,
  ) {
    super(VetClinic, dataSource);
    this.doctors = this.createHasManyRepositoryFactoryFor('doctors', doctorRepositoryGetter,);
    this.registerInclusionResolver('doctors', this.doctors.inclusionResolver);
  }
}
