import { Component, input, output } from '@angular/core';
import { Usuario } from '../../models/usuario';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-usuario-card',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './usuario-card.component.html',
  styleUrl: './usuario-card.component.css'
})
export class UsuarioCardComponent {
  usuario = input.required<Usuario>();
  editar = output<Usuario>();
  eliminar = output<number>();

  eliminarUsuario(): void {
    this.eliminar.emit(this.usuario().id);
  }

  actualizarUsuario(): void {
    this.editar.emit(this.usuario());
  }

}