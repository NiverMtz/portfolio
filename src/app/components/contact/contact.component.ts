import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

type SendStatus = 'idle' | 'invalid' | 'sending' | 'success' | 'error';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  private readonly endpoint = environment.contactEndpoint;

  status: SendStatus = 'idle';

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
    // Honeypot: campo trampa oculto. Debe quedar vacío.
    botcheck: [''],
  });

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // Al volver a escribir tras un envío, limpia el mensaje de éxito/error.
    this.form.valueChanges.subscribe(() => {
      if (this.status !== 'sending') {
        this.status = 'idle';
      }
    });
  }

  get f() {
    return this.form.controls;
  }

  /** True cuando el campo es inválido y el usuario ya interactuó con él. */
  isInvalid(control: 'name' | 'email' | 'message'): boolean {
    const ctrl = this.form.controls[control];
    return ctrl.invalid && (ctrl.touched || ctrl.dirty);
  }

  onSubmit(): void {
    if (this.status === 'sending') {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.status = 'invalid';
      return;
    }

    this.status = 'sending';

    this.http.post(this.endpoint, this.form.getRawValue()).subscribe({
      next: () => {
        this.status = 'success';
        this.form.reset();
      },
      error: () => {
        this.status = 'error';
      },
    });
  }
}
