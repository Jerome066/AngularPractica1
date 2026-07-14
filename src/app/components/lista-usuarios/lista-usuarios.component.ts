import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';

import { FormularioUsuarioComponent } from '../formulario-usuario/formulario-usuario.component';
import { UsuarioCardComponent } from '../usuario-card/usuario-card.component';

import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { TablaUsuariosComponent } from "../tabla-usuarios/tabla-usuarios.component";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [
    UsuarioCardComponent,
    FormularioUsuarioComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TablaUsuariosComponent,
    MatButtonToggleModule
  ],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})

export class ListaUsuariosComponent implements OnInit {
  //Servicio
  servicioUsuario = inject(UsuarioService);

  //Lista de usuarios recuperado del servicio
  listaUsuarios = this.servicioUsuario.obtenerUsuarios();

  //Texto de busqueda para filtrar
  busquedaF = signal("");

  //Variable para mostrar o no el formulario
  mostrarFormulario = signal(false);

  //Varaible para cambio de tarjeta a tabla
  vista = signal<'card' | 'table'>('card');

  //Usuario seleccionado segun el filtro de busqueda
  usuarioSeleccionado = signal<Usuario | null>(null);

  fontStyleControl = new FormControl('');
  fontStyle?: string;


  //Lista de usuarios filtrados con el texto de busqueda
  filtroUsuarios = computed(() => {

    const texto = this.busquedaF().toLowerCase();
    return this.servicioUsuario.listaUsuarios().filter(usuario =>
      usuario.name.toLowerCase().includes(texto) ||
      usuario.email.toLowerCase().includes(texto)
    );
  });

  ngOnInit(): void {
    this.listaUsuarios = this.servicioUsuario.obtenerUsuarios();
  }

  eliminarUsuario(ID: number): void {
    this.servicioUsuario.eliminarUsuario(ID);
  }

  agregarUsuario(): void {
    this.usuarioSeleccionado.set(null);
    this.mostrarFormulario.set(true);
  }

  actualizarUsuario(usuario: Usuario): void {
    this.usuarioSeleccionado.set(null);
    this.mostrarFormulario.set(false);
    this.servicioUsuario.actualizarUsuario(usuario);
  }

  editarUsuario(usuario: Usuario): void {
    this.usuarioSeleccionado.set(usuario);
    this.mostrarFormulario.set(true);
  }

  cerrarFormulario(): void {
    this.mostrarFormulario.set(false);
    this.usuarioSeleccionado.set(null);
  }

  //Cambio de vista entre tarjetas y tabla
  cambiarVista(valor: 'card' | 'table') {
  this.vista.set(valor);
  }

}
