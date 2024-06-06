import { Routes } from '@angular/router';
import { BodyComponent } from './inicio/body/body.component';
import { RegistroComponent } from './registro/registro.component';  // Asumiendo que tienes un componente de registro
import { IndexComponent as IndexClubes } from './clubes/index/index.component';
import { CreateComponent as CreateAcampantes } from './acampantes/create/create.component';
import { IndexComponent as IndexAcampantes } from './acampantes/index/index.component';
import { CreateComponent as CreateClubes } from './clubes/create/create.component';

import { IndexComponent as IndexPagina } from './Pagina/index/index.component';

import { IndexComponent as IndexTotalesclub } from './Totalesclub/index/index.component';

import { CreateComponent as CreateArchivos } from './Archivos/create/create.component';





export const routes: Routes = [

    { path: '', redirectTo: 'inicio/body', pathMatch: 'full' },
    { path: 'inicio/body', component: BodyComponent },

    { path: 'Pagina/index', component: IndexPagina },

    { path: 'registro', component: RegistroComponent }, 

    { path: 'clubes/:clubId/acampantes/create', component: CreateAcampantes },
   // { path: 'acampantes/editar/:id', component: CreateAcampantes },

    {path: 'clubes/:clubId/acampantes/editar/:id', component: CreateAcampantes} ,

    //{ path: 'clubes/:clubId/acampantes/editar/:id', component: CreateAcampantes }
    

    { path: 'clubes/:clubId/totales', component: IndexTotalesclub },

    { path: 'archivos/create/:clubId', component: CreateArchivos }, // Define la ruta con el parámetro clubId



    { path: 'acampantes/index', component: IndexClubes },
    { path: 'acampantes/index/:id', component: IndexClubes },

    { path: 'clubes/:clubId/acampantes', component: IndexAcampantes },

   
    
    //{ path: 'clubes/:clubId/acampantes/create', component: CreateComponent },

    { path: 'clubes/index', component: IndexClubes },
    { path: 'clubes/index/:id', component: IndexClubes },
    { path: 'clubes/editar/:id', component: CreateClubes },
    { path: 'clubes/create', component: CreateClubes },



    
];
