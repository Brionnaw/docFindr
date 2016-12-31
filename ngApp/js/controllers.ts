namespace app.Controllers {
  export class HomeController {
    public speciality;
    public location;
    public doctorData
    public search (){
      let info = {
        speciality:this.speciality,
        location:this.location,
      }
      console.log(info)
        this.doctorService.getDoctor(info).then((res) => {
          if (res.message === 'search not found') {
           alert(res.message)
         } else
           this.doctorData = (JSON.parse(res.body));
           console.log(res)
       }
     )

    }
        constructor(
          private doctorService: app.Services.DoctorService,
        ) {
    }
  }
  //login Controller
  export class LoginController {
    public user;
    public login(){
      this.userService.login(this.user).then((res) => {
        if(res.message === "Correct"){
          window.localStorage["token" ] =res.jwt;
          this.$state.go('Home');
        } else {
          alert(res.message);
        }
      });
    }
    constructor(
      private  userService: app.Services.UserService,
      public $state: ng.ui.IStateService,
    ){
      // TOKEN
      let token = window.localStorage["token"];
      if(token) {
        let payload = JSON.parse(window.atob(token.split('.')[1]));
        if(payload.exp > Date.now()/ 1000) {
          this.$state.go('Home');
        }
      }
    }
}

//REGISTER USER IN REGISTER.HTML
   export class RegisterController{
     public id;
     public user;
     public register(){
       this.userService.register(this.user).then((res) => {
         if(res.message === "username already exist") {
           alert(res.message);
         } else {
           window.localStorage["token" ] = res.token;
           this.$window.location.href = 'http://localhost:3000/' // change after hosting
         }
       });
     }
     constructor(
       private userService: app.Services.UserService,
       public $state: ng.ui.IStateService,
       public $window
       ){
         let token = window.localStorage["token"];
         if(token) {
           let payload = JSON.parse(window.atob(token.split('.')[1]));
           if(payload.exp > Date.now()/ 1000) {
             this.$state.go('Home');
           }
         }
       }
     }

  angular.module('app').controller('HomeController', HomeController);
  angular.module('app').controller('LoginController', LoginController);
  angular.module('app').controller('RegisterController', RegisterController);

}
