import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../usuario';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password1: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]]
  }, {valitador: this.matchingPasswords});

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    const newUser: Usuario = {
      nome: this.formRegister.value.nome,
      email: this.formRegister.value.email,
      password: this.formRegister.value.password1
    };
    // register
    this.authService.register(newUser)
        .subscribe(
          (u) => {
            this.snackBar.open('Registrado com sucesso. Use sua nova credencial para fazer login.', 'OK', {duration: 2000});
            this.router.navigateByUrl('/auth/login');
          },
          (err) => {console.log(err);
                    this.snackBar.open('Erro. Voce não está registrado', 'OK', {duration: 2000});
          }
        );
  }

  matchingPasswords(group: FormGroup) {
    if (group) {
      const password1 = group.controls['password1'].value;
      const password2 = group.controls['password2'].value;

      if (password1 === password2) {
        return null;
      }
      return {matching: false};
    }
  }

}
