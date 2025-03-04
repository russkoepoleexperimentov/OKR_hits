import { Routes } from '@angular/router';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

export const routes: Routes = [
    {
        path: '',
        component: WelcomePageComponent
    },
    {
        path:'register',
        component: RegisterPageComponent
    },
    {
        path:'login',
        component:LoginPageComponent
    }
];
