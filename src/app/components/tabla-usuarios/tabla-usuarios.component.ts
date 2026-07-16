import { Component, inject, input, output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { ToStringAddressPipe } from "../../pipes/to-string-Address.pipe";
import { MatIcon } from "@angular/material/icon";

import {TitleCasePipe } from "@angular/common";

@Component({
  selector: 'app-tabla-usuarios',
  standalone: true,
  imports: [MatTableModule, ToStringAddressPipe, MatIcon, TitleCasePipe ],
  templateUrl: './tabla-usuarios.component.html',
  styleUrl: './tabla-usuarios.component.css'
})
export class TablaUsuariosComponent {

  servicio = inject(UsuarioService);
  listaUsuarios = input.required<Usuario[]>();
  editar = output<Usuario>();
  eliminar = output<number>();

  eliminarUsuario(id:number): void {
    this.eliminar.emit(id);
  }

  actualizarUsuario(usuario:Usuario): void {
    this.editar.emit(usuario);
  }

  displayedColumns: string[] = [
    'name',
    'username',
    'email',
    'phone',
    'address',
    'company',
    'options'
  ];

}