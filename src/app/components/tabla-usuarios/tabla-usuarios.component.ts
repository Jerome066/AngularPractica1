import { Component, inject, input, output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { ToStringAddressPipe } from "../../pipes/to-string-Address.pipe";
import { MatIcon } from "@angular/material/icon";

import {TitleCasePipe } from "@angular/common";
import { ToStringGeoPipe } from "../../pipes/to-string-geo.pipe";

import Swal from "sweetalert2";

@Component({
  selector: 'app-tabla-usuarios',
  standalone: true,
  imports: [MatTableModule, ToStringAddressPipe, MatIcon, TitleCasePipe, ToStringGeoPipe],
  templateUrl: './tabla-usuarios.component.html',
  styleUrl: './tabla-usuarios.component.css'
})
export class TablaUsuariosComponent {

  servicio = inject(UsuarioService);
  listaUsuarios = input.required<Usuario[]>();
  editar = output<Usuario>();
  eliminar = output<number>();

  eliminarUsuario(id:number): void {
  
      Swal.fire({
        title: "¿Eliminar usuario?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Si",
        denyButtonText: `No`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Realizado!", "", "success");
          this.eliminar.emit(id);
        }
        else if (result.isDenied) Swal.fire("No se realizó cambios");
      });
  
      
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