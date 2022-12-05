import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { RouterModule, Routes } from '@angular/router';
import { IsAdminGuard } from '../globalGuards/is-admin.guard';
import { IsLoggedInGuard } from '../globalGuards/is-logged-in.guard';

const routes: Routes = [
  {
    path: 'admin/panel',
    canActivate: [IsLoggedInGuard, IsAdminGuard],
    component: AdminPanelComponent,
  },
];


@NgModule({
  declarations: [
    AdminPanelComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class AdminModule { }
