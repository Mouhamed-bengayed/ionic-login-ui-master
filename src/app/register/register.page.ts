import { Component, OnInit } from '@angular/core';
import { ModalController  } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPage } from '../login/login.page';
import { AuthTestService } from './auth-test.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  agreePrivacy: boolean = false;
  user = {
    name: '',
    username: '',
    email: '',
    password: ''
  };
  signupError: string = '';

  constructor(public modalCtrl: ModalController, private router: Router, public authService: AuthTestService) {}
  ngOnInit() { }

  async dismiss() {
    return await this.modalCtrl.dismiss();
  }


  async register(signupForm: NgForm) {
    if (signupForm.valid && !this.agreePrivacy) {
      const user = {
        name: this.user.name,
        username: this.user.username,
        email: this.user.email,
        password: this.user.password,
        blocked: false,
        address: 'TUNISIA',
        valid: false,
        role: [
          {
            id: 1,
            name: 'ROLE_Employee',
          },
        ],
      };
      this.authService.signupUser(user).subscribe(
        (response) => {
          console.log('User registered successfully!');
          if (response && response.jwtToken) {
            const token = response.jwtToken;
            localStorage.setItem('token', token);
          }
          alert('Check your email account for verification!');
          this.router.navigate(['/WelcomePa']);
        },
        (error) => {
          console.error('Error during registrationapp.', error);
          alert('Error during registration. Please try again.');
          this.signupError = 'Error during registration. Please try again.';
        }
      );
    } else {
      console.log('Form is invalid or Privacy Policy not agreed.');
    }
  }

  

}




