namespace app.Services {
  export class UserService {
    public RegisterResource;
    public LoginResource;
    public CurrentUserResource;
    public currentUser;
    public login(user) {
      return this.LoginResource.save(user).$promise;
    }
    public register(user){
      return this.RegisterResource.save(user).$promise;
    }

    public getCurrentUser(id){
      return this.CurrentUserResource.query({id:id})
    }
    public getUser(){
      return this.currentUser
    }
    public constructor(
      $resource:ng.resource.IResourceService,
      public $state:ng.ui.IStateService
    ){
      this.RegisterResource = $resource('api/users/register');
      this.LoginResource = $resource('api/users/login');
      this.CurrentUserResource = $resource('api/users/currentUser/:id');
      let token = window.localStorage["token"];
      if(token) {
        let payload = JSON.parse(window.atob(token.split('.')[1]));
        this.currentUser = this.getCurrentUser(payload.id);
        console.log('logged in') // redirect user to login if token is expired.
      } else {
        this.$state.go('Login')
      }
    }
  }

// doctor service
 export class DoctorService {
   public DoctorResource;
   public NameResource;
   public InsuranceResource;
   public getDoctor(getInfo) {
     console.log(getInfo)
     return this.DoctorResource.save(getInfo).$promise
   }
   public getName(getInfo) {
     console.log(getInfo)
     return this.NameResource.save(getInfo).$promise
   }
   public getInsurance(getInfo) {
     console.log(getInfo)
     return this.InsuranceResource.save(getInfo).$promise
   }
   constructor(
     $resource:ng.resource.IResourceService,
     public $state:ng.ui.IStateService
   ){
     this.DoctorResource = $resource('api/doctor');
     this.NameResource = $resource('api/doctor/name');
     this.InsuranceResource = $resource('api/doctor/insurance');
   }
 }
 angular.module('app').service('userService', UserService);
 angular.module('app').service('doctorService', DoctorService);
}
