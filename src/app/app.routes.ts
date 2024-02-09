import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExamsComponent } from './exams/exams.component';
import { StoreComponent } from './store/store.component';
import { ForumComponent } from './forum/forum.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent, children: [
            {
                path: 'dashboard',
                component: DashboardComponent,                
            },
            {
                path: 'meus-simulados',
                component: ExamsComponent
            },
            {
                path: 'loja-simulados',
                component: StoreComponent
            },
            {
                path: 'forum',
                component: ForumComponent
            },            
        ]
    },
    {
        path: '**',
        component: HomeComponent
    }
];


/**
 *     {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: HomeComponent
    },

 */