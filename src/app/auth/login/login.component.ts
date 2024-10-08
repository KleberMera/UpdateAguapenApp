import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent {
  formLogin = signal<FormGroup>(
    new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  );

  private authService = inject(AuthService);
  private router = inject(Router);

  async onSubmit() {
    if (this.formLogin().valid) {
      try {
        const response: any = await this.authService
          .login(this.formLogin().value)
          .toPromise();
        if (response.token) {
          toast.success('Login exitoso');
          //Ir al dashboard
          this.router.navigate(['/home']);
        }
      } catch (err: any) {
        toast.error(err.error.message);
      }
    }
  }
}
