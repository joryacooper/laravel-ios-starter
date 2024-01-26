import { Routes } from '@angular/router';
import { mustBeAuthenticated } from "@/lib/guards/must-be-authenticated";
import { appContextMustBeLoaded } from "@/lib/guards/app-context-must-be-loaded";
import { mustBeUnauthenticated } from "@/lib/guards/must-be-unauthenticated";

export const routes: Routes = [
  {
    path: '',
    canActivate: [mustBeAuthenticated],
    loadComponent: () => import('@/lib/components/auth-root/auth-root.component').then((c) => c.AuthRootComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('@/app/components/article/index/article-index.component').then((c) => c.ArticleIndexComponent),
      },
      {
        path: 'articles/:articleId',
        canActivate: [appContextMustBeLoaded],
        loadComponent: () => import('@/app/components/article/detail/article-detail.component').then((c) => c.ArticleDetailComponent),
      },
      {
        path: 'settings',
        canActivate: [appContextMustBeLoaded],
        loadComponent: () => import('@/lib/components/settings/settings.page').then((c) => c.SettingsPage),
      },
      {
        path: 'settings/profile',
        canActivate: [appContextMustBeLoaded],
        loadComponent: () => import('@/lib/components/settings/profile/profile.component').then((c) => c.ProfileComponent),
      },
      {
        path: 'settings/plan',
        canActivate: [appContextMustBeLoaded],
        loadComponent: () => import('@/lib/components/settings/plan/plan.component').then((c) => c.PlanComponent),
      },
      {
        path: 'settings/password',
        canActivate: [appContextMustBeLoaded],
        loadComponent: () => import('@/lib/components/settings/password/password.component').then((c) => c.PasswordComponent),
      }
    ]
  },
  {
    path: 'get-started',
    canActivate: [mustBeUnauthenticated],
    loadComponent: () => import('@/lib/components/get-started/get-started.component').then((c) => c.GetStartedComponent),
  }
];

