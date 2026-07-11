import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { FormularioUsuarioComponent } from '../formulario-usuario/formulario-usuario.component';
import { UsuarioCardComponent } from '../usuario-card/usuario-card.component';
import { Usuario } from '../../models/usuario';


@Component({
  selector: 'app-lista-usuarios',
  standalone:true,
  imports: [UsuarioCardComponent, FormularioUsuarioComponent],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})

export class ListaUsuariosComponent implements OnInit{
  //Servicio
  servicioUsuario = inject(UsuarioService);

  //Lista de usuarios recuperado del servicio
  listaUsuarios = this.servicioUsuario.obtenerUsuarios();

  //Texto de busqueda para filtrar
  busqueda = signal("");

  //Variable para mostrar o no el formulario
  mostrarFormulario = signal(false);

  //Usuario seleccionado segun el filtro de busqueda
  usuarioSeleccionado = signal<Usuario | null>(null);

  //Lista de usuarios filtrados con el texto de busqueda
  filtroUsuarios = computed(() => { 

    const texto = this.busqueda().toLowerCase();
    return this.servicioUsuario.listaUsuarios().filter(usuario => 
      usuario.name.toLowerCase().includes(texto) ||
      usuario.email.toLowerCase().includes(texto)
    );
  });

  ngOnInit():void{
    this.listaUsuarios = this.servicioUsuario.obtenerUsuarios();
  }

  eliminarUsuario(ID: number): void{
    this.servicioUsuario.eliminarUsuario(ID);
  }

  agregarUsuario(usuario: Usuario): void{
    this.usuarioSeleccionado.set(null);
    this.servicioUsuario.nuevoUsuario(usuario);
  }

  actualizarUsuario(usuario: Usuario): void{
    this.usuarioSeleccionado.set(null);
    this.servicioUsuario.actualizarUsuario(usuario);
  }

  cerrarFormulario(): void{
    this.mostrarFormulario.set(false);
    this.usuarioSeleccionado.set(null);
  }

}
