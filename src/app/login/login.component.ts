import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessages: Array<string> = [];

  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit() {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      remember: new FormControl('', [Validators.required])
    });

    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');

    if (storedEmail && storedPassword) {
      this.loginForm.patchValue({ email: storedEmail, password: storedPassword });
      this.loginForm.get('remember')?.patchValue(true); // Check the remember box
    }

  }

  login() {

    if (this.loginForm.valid) {

      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      if (this.authService.login(email, password)) {

        if (this.loginForm.value.remember) {
          localStorage.setItem('userEmail', email);
          localStorage.setItem('userPassword', password);
        }

        this.router.navigate(['/home/dashboard']);

      } else {
        this.errorMessages.push("Credenciais inválidas");
      }

    } else {

      this.errorMessages = []; // Clear any previous error message

      if (this.loginForm?.get('email')?.hasError('required')) {
        this.errorMessages.push("O email é obrigatório.");
      }
      if (this.loginForm?.get('email')?.hasError('email')) {
        this.errorMessages.push("Por favor, forneça um e-mail válido");
      }
      if (this.loginForm?.get('password')?.hasError('required')) {
        this.errorMessages.push("O campo password é obrigatório");
      }
      if (this.loginForm?.get('password')?.hasError('minlength')) {
        this.errorMessages.push("O campo password deve conter no mínimo 6 caracteres");
      }

    }

  }

}
