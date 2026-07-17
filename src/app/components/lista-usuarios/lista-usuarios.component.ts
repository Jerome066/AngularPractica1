import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';

import { FormularioUsuarioComponent } from '../formulario-usuario/formulario-usuario.component';
import { UsuarioCardComponent } from '../usuario-card/usuario-card.component';

import { MatProgressBarModule } from '@angular/material/progress-bar'; // barra de progreso
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { TablaUsuariosComponent } from "../tabla-usuarios/tabla-usuarios.component";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator'

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [
    UsuarioCardComponent,
    FormularioUsuarioComponent,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TablaUsuariosComponent,
    MatButtonToggleModule,
    MatPaginator
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

  //Texto de busqueda para filtrar
  busquedaCorreo = signal("");

  //Texto de busqueda para filtrar
  busquedaCiudad = signal("");

  //Texto de busqueda para filtrar
  busquedaEmpresa = signal("");

  //Texto de busqueda para filtrar
  busquedaSitioW = signal("");

  //Variable para mostrar o no el formulario
  mostrarFormulario = signal(false);

  //Varaible para cambio de tarjeta a tabla
  vista = signal<'card' | 'table'>('card');

  //Usuario seleccionado segun el filtro de busqueda
  usuarioSeleccionado = signal<Usuario | null>(null);

  fontStyleControl = new FormControl('');
  fontStyle?: string;

  //Varaible para el orden alfabetico
  ordenAlf = signal<true | false>(true);

  pageSize = signal(5);
  pageIndex = signal(0);

  listaPage = this.servicioUsuario.listaUsuarios();

  //Lista de usuarios filtrados con el texto de busqueda
  filtroUsuarios = computed(() => {

    var texto = this.busquedaF().toLowerCase();
    var correotxt = this.busquedaCorreo().toLowerCase();
    var ciudadtxt = this.busquedaCiudad().toLowerCase();
    var empresatxt = this.busquedaEmpresa().toLowerCase();
    var sitiotxt = this.busquedaSitioW().toLowerCase();

    let resultado = this.servicioUsuario.listaUsuarios().filter(usuario => {
      const coincideTexto = !texto ||
        usuario.name.toLowerCase().includes(texto) ||
        usuario.username.toLowerCase().includes(texto);

      const coincideCorreo = !correotxt ||
        usuario.email.toLowerCase().includes(correotxt);

      const coincideCiudad = !ciudadtxt ||
        usuario.address.city.toLowerCase().includes(ciudadtxt);

      const coincideEmpresa = !empresatxt ||
        usuario.company.name.toLowerCase().includes(empresatxt);

      const coincideSitio = !sitiotxt ||
        usuario.website.toLowerCase().includes(sitiotxt);

      return coincideTexto && coincideCorreo && coincideCiudad && coincideEmpresa && coincideSitio;
    });

    resultado = this.ordenAlf()
      ? resultado.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
      : resultado.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));

    return resultado;
  });

  usuariosPaginados = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    const end = start + this.pageSize();
    return this.filtroUsuarios().slice(start, end);
  });

  constructor() {
    effect(() => {
      // Se ejecuta cada vez que cambian los filtros
      this.busquedaF();
      this.busquedaCorreo();
      this.busquedaCiudad();
      this.busquedaEmpresa();
      this.busquedaSitioW();
      this.pageIndex.set(0);
    });
  }

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

  editarUsuario(usuario: Usuario): void {
    this.usuarioSeleccionado.set(usuario);
    this.mostrarFormulario.set(true);
  }

  cerrarFormulario(): void {
    this.usuarioSeleccionado.set(null);
    this.mostrarFormulario.set(false);
  }

  //Cambio de vista entre tarjetas y tabla
  cambiarVista(valor: 'card' | 'table') {
    this.vista.set(valor);
  }

  //Limpieza de filtros
  limpiarFiltros():void{
    this.busquedaF.set("");
    this.busquedaCorreo.set("");
    this.busquedaCiudad.set("");
    this.busquedaEmpresa.set("");
    this.busquedaSitioW.set("");
  }

  // Cambiar orden alfabetico
  cambiarOrdenAlf() {
    this.ordenAlf.update(current => !current)
  }

  //Actualización del paginado
  onPageChange(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }
}
