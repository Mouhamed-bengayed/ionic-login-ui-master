import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthTestService } from '../register/auth-test.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginError: string = '';
  rememberMe = false; 
  constructor( public modalCtrl: ModalController,private authTestService: AuthTestService, private router: Router) { }
  user1: any;
   afficherDiv: boolean = true;
  ngOnInit() {
  }
  async dismiss() {
    await this.modalCtrl.dismiss();
  }
  user = {
    email: '',
    password: ''
  };
  onSubmit(loginForm: NgForm) {
    
    if (loginForm.valid) {
      const email = this.user.email;
      const password = this.user.password;
      this.authTestService.login(email, password, this.rememberMe).subscribe(
        (response) => {      
              this.authTestService.setUserData(response); 

          console.log('User logged in successfully!');
          const token = response.accessToken;
          if (this.rememberMe) {
          
            this.authTestService.setCurrentUser(this.user1);
            localStorage.setItem('access_token', token);
            
          } else {
            console.log("token"+token)

            sessionStorage.setItem('access_token', token);
          }
         
          const userAuthorities = response.authorities.map((authority) => authority.authority);
          
          if (userAuthorities.includes("ROLE_Entreprise")) {
            this.afficherDiv=false;
             localStorage.setItem('test1',this.afficherDiv.toString());
            this.router.navigate(['user_dashboard/monprofil']);
          } else {
            this.router.navigate(['user_dashboard/monprofil']); 
          }
        
        },
        (error) => {
          console.error('Invalid email or password. Please try again.');
          this.loginError = 'Invalid email or password. Please try again.';

        }
        );
      } else {
        console.log('Form is invalid. Please check your inputs.');
      }
    }


 
}
