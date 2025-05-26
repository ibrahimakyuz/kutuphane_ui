import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      kullaniciAdi: ['', Validators.required],
     // sifre: ['', [Validators.required, Validators.minLength(6)]],
     sifre: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]], 
     sifreTekrar: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const sifre = control.get('sifre')?.value;
    const sifreTekrar = control.get('sifreTekrar')?.value;
    return sifre === sifreTekrar ? null : { notMatching: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register(this.registerForm.value).subscribe({
      next: (res) => {
        this.successMessage = res;
        this.registerForm.reset();
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (error) => {
        this.errorMessage = error.error || 'Kayıt sırasında hata oluştu.';
      }
    });
  }
}
