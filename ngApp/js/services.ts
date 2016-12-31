namespace app.Services {
 export class DoctorService {
   public DoctorResource;
   public getDoctor(getInfo) {
     console.log(getInfo)
     return this.DoctorResource.save(getInfo).$promise
   }
   constructor(
     $resource:ng.resource.IResourceService,
     public $state:ng.ui.IStateService
   ){
       this.DoctorResource = $resource('api/doctor');
   }
 }

 angular.module('app').service('doctorService', DoctorService)
}
