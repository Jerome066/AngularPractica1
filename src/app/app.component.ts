import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaUsuariosComponent } from "./components/lista-usuarios/lista-usuarios.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ListaUsuariosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'practica1';
}
