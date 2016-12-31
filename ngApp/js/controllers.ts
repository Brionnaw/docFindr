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

  angular.module('app').controller('HomeController', HomeController);
}
