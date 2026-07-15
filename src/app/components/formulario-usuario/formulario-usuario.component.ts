import { Component, inject, input, effect, output } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatFormFieldModule } from '@angular/material/form-field';

import { UsuarioService } from '../../services/usuario.service';

import { Usuario } from '../../models/usuario';

import { FormGroupDirective } from '@angular/forms';
import { viewChild } from '@angular/core';

@Component({
  selector: 'app-formulario-usuario',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  templateUrl: './formulario-usuario.component.html',
  styleUrl: './formulario-usuario.component.css'
})
export class FormularioUsuarioComponent {
  formDirective = viewChild(FormGroupDirective);

  private fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);

  usuarioEditar = input<Usuario | null>(null);
  guardado = output<void>();
  cerrar = output<void>();

  usuarioActual: Usuario | null = null;

  formulario = this.fb.group({

    name: ['', [
      Validators.required
    ]],
    username: ['', [
      Validators.required
    ]],
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    phone: [
      '',
      [
        Validators.required
      ]
    ],
    website: [''],

    address: this.fb.group({

      street: ['', [Validators.required]],
      suite: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],

      geo: this.fb.group({

        lat: [0, [Validators.pattern(/^-?\d+(\.\d+)?$/)]],
        lng: [0, [Validators.pattern(/^-?\d+(\.\d+)?$/)]]

      })

    }),

    company: this.fb.group({

      name: ['', [Validators.required]],
      catchPhrase: ['', []],
      bs: ['', []]

    })

  });

  constructor() {

    effect(() => {

      const usuario = this.usuarioEditar();
      this.usuarioActual = usuario;
      if (!usuario) {
        this.formulario.reset({
        });
        return;
      }

      this.formulario.patchValue({
        name: usuario.name,
        username: usuario.username,
        email: usuario.email,
        phone: usuario.phone,
        website: usuario.website,

        address: {
          street: usuario.address.street,
          suite: usuario.address.suite,
          city: usuario.address.city,
          zipcode: usuario.address.zipcode,
          geo: {
            lat: usuario.address.geo.lat,
            lng: usuario.address.geo.lng
          }
        },

        company: {
          name: usuario.company.name,
          catchPhrase: usuario.company.catchPhrase,
          bs: usuario.company.bs
        }
      });

    });

  }

  guardarUsuario(): void {

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const usuario: Usuario = {
      id: this.usuarioActual?.id ?? Date.now(),
      ...this.formulario.getRawValue()
    } as Usuario;

    if (this.usuarioActual) {
      this.usuarioService.actualizarUsuario(usuario);
    } else {
      this.usuarioService.nuevoUsuario(usuario);
    }

    this.formDirective()?.resetForm();

    this.usuarioActual = null;
    this.guardado.emit();
  }

  cancelarFormulario():void{
    this.cerrar.emit();
  }


}