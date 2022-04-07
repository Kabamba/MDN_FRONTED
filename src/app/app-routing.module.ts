import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/admin/home/home.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { LoginComponent } from './components/admin/login/login.component';
import { AuthGuard } from './guards/admin/auth.guard';
import { IsActiveGuard } from './guards/admin/isActive.guard';
import { ReceptsComponent } from './components/admin/recepts/recepts.component';
import { DoctorComponent } from './components/admin/doctor/doctor.component';
import { ServsComponent } from './components/admin/servs/servs.component';
import { DisponibilityComponent } from './components/admin/disponibility/disponibility.component';
import { AppointComponent } from './components/admin/appoint/appoint.component';
import { MotifComponent } from './components/admin/motif/motif.component';
import { AppointodayComponent } from './components/admin/appointoday/appointoday.component';
import { AppointfutureComponent } from './components/admin/appointfuture/appointfuture.component';
import { AppointlastComponent } from './components/admin/appointlast/appointlast.component';
import { SocietyComponent } from './components/admin/society/society.component';
import { CategoryComponent } from './components/admin/category/category.component';
import { GrilleComponent } from './components/admin/grille/grille.component';
import { RoleComponent } from './components/admin/role/role.component';
import { PermissionsComponent } from './components/admin/permissions/permissions.component';
import { PatientComponent } from './components/admin/patient/patient.component';
import { SeePermissionsComponent } from './components/admin/see-permissions/see-permissions.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin/login', pathMatch: 'full' },
  {
    path: 'admin/login',
    component: LoginComponent,
  },
  {
    path: 'admin/home',
    canActivate: [AuthGuard, IsActiveGuard],
    component: HomeComponent,
    data: { permission:'HOME.STAT'},
  }, 
  {
    path: 'admin/admins',
    canActivate: [AuthGuard, IsActiveGuard],
    component: AdminComponent,
    data: { permission:'ADMIN.LIST'},
  },
  {
    path: 'admin/recepts',
    canActivate: [AuthGuard, IsActiveGuard],
    component: ReceptsComponent,
    data: { permission:'RECEPTIONNISTE.LIST'},
  },
  {
    path: 'admin/services',
    canActivate: [AuthGuard, IsActiveGuard],
    component: ServsComponent,
    data: { permission:'SERVICES.LIST'},
  },
  {
    path: 'admin/doctors',
    canActivate: [AuthGuard, IsActiveGuard],
    component: DoctorComponent,
    data: { permission:'DOCTEUR.LIST'},
  },
  {
    path: 'admin/dispo/:id',
    canActivate: [AuthGuard, IsActiveGuard],
    component: DisponibilityComponent,
    data: { permission:'DOCTEUR.HORAIRE.UNIQUE'},
  },
  {
    path: 'admin/appoints',
    canActivate: [AuthGuard, IsActiveGuard],
    component: AppointComponent,
    data: { permission:'RDV.LIST'},
  },
  {
    path: 'admin/motifs',
    canActivate: [AuthGuard, IsActiveGuard],
    component: MotifComponent,
    data: { permission:'MOTIFS.LIST'},
  },
  {
    path: 'admin/appoints/today',
    canActivate: [AuthGuard, IsActiveGuard],
    component: AppointodayComponent,
    data: { permission:'MOTIFS.LIST'},
  },
  {
    path: 'admin/appoints/future',
    canActivate: [AuthGuard, IsActiveGuard],
    component: AppointfutureComponent,
    data: { permission:'MOTIFS.LIST'},
  },
  {
    path: 'admin/appoints/last',
    canActivate: [AuthGuard, IsActiveGuard],
    component: AppointlastComponent,
    data: { permission:'MOTIFS.LIST'},
  },
  {
    path: 'admin/society',
    canActivate: [AuthGuard, IsActiveGuard],
    component: SocietyComponent,
    data: { permission:'SOCIETES.LIST'},
  },
  {
    path: 'admin/roles',
    canActivate: [AuthGuard, IsActiveGuard],
    component: RoleComponent,
    data: { permission:'ROLES.LIST'},
  },
  {
    path: 'admin/permissions',
    canActivate: [AuthGuard, IsActiveGuard],
    component: PermissionsComponent,
    data: { permission:'PERMISSIONS.LIST'},
  },
  {
    path: 'admin/category',
    canActivate: [AuthGuard, IsActiveGuard],
    component: CategoryComponent,
    data: { permission:'CATEGORIE_SOCIETES.LIST'},
  },
  {
    path: 'admin/grille',
    canActivate: [AuthGuard, IsActiveGuard],
    component: GrilleComponent,
    data: { permission:'GRILLE.LIST'},
  },
  {
    path: 'admin/patients',
    canActivate: [AuthGuard, IsActiveGuard],
    component: PatientComponent,
    data: { permission:'PATIENT.LIST'},
  },

  {path: 'admin/see-permissions', component:SeePermissionsComponent},
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
