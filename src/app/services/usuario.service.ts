import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private http = inject(HttpClient);
  private api = 'https://jsonplaceholder.typicode.com/users';

  listaUsuarios = signal<Usuario[]>([]);
  
  cargando = signal(false);

  constructor() { 

  }

  obtenerUsuarios(): void {
    this.cargando.set(true);
    this.http.get<any[]>(this.api)
      .subscribe({
        next: datos => {
          
          const usuarios = datos;
          this.listaUsuarios.set(usuarios);
          this.cargando.set(false);
        },
        error: error => {
          console.error(error);
          this.cargando.set(false);
        }
      });
  }

  eliminarUsuario(ID: number): void {
    this.listaUsuarios.update(listusuarios =>
      listusuarios.filter(usuario => usuario.id !== ID)
    );
  }

  actualizarUsuario(nuevoUsuario: Usuario): void{
    this.listaUsuarios.update(usuarios =>
      usuarios.map( usuario =>
        usuario.id === nuevoUsuario.id
          ? nuevoUsuario
          : usuario
      )
    );
  }

  nuevoUsuario(nuevoUsuario: Usuario):void{
    this.listaUsuarios.update(usuarios => [
      ...usuarios,
      nuevoUsuario
    ])
  }

}
