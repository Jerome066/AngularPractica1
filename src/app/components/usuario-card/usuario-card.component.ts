import { Component, input, output, signal } from '@angular/core';
import { Usuario } from '../../models/usuario';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';

import Swal from "sweetalert2";


@Component({
  selector: 'app-usuario-card',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatExpansionModule
  ],
  templateUrl: './usuario-card.component.html',
  styleUrl: './usuario-card.component.css'
})
export class UsuarioCardComponent {
  usuario = input.required<Usuario>();
  editar = output<Usuario>();
  eliminar = output<number>();

  readonly panelOpenState = signal(false);

  eliminarUsuario(): void {
    Swal.fire("Realizado!", "", "success");
    this.eliminar.emit(this.usuario().id);
  }

  actualizarUsuario(): void {
    this.editar.emit(this.usuario());
  }

}