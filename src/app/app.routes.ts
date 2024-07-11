import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component : LoginComponent, canActivate:[authGuard]},
    {path: 'catalog', component : CatalogComponent, canActivate:[authGuard]}
];
