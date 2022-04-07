import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavLeftComponent } from './components/admin/nav-left/nav-left.component';
import { NavRightComponent } from './components/admin/nav-right/nav-right.component';
import { HomeComponent } from './components/admin/home/home.component';
import { SearchBarComponent } from './components/admin/search-bar/search-bar.component';
import { AdminComponent } from './components/admin/admin/admin.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/admin/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReceptsComponent } from './components/admin/recepts/recepts.component';
import { NgongaComponent } from './components/admin/ngonga/ngonga.component';
import { DoctorComponent } from './components/admin/doctor/doctor.component';
import { ServsComponent } from './components/admin/servs/servs.component';
import { DisponibilityComponent } from './components/admin/disponibility/disponibility.component';
import { AppointComponent } from './components/admin/appoint/appoint.component';
import { SearchFilterFuturePipe } from './pipes/search-filter-future.pipe';
import { MotifComponent } from './components/admin/motif/motif.component';
import { AppointodayComponent } from './components/admin/appointoday/appointoday.component';
import { AppointfutureComponent } from './components/admin/appointfuture/appointfuture.component';
import { AppointlastComponent } from './components/admin/appointlast/appointlast.component';
import { PieComponent } from './components/admin/pie/pie.component';
import { CategoryComponent } from './components/admin/category/category.component';
import { SocietyComponent } from './components/admin/society/society.component';
import { GrilleComponent } from './components/admin/grille/grille.component';
import { RoleComponent } from './components/admin/role/role.component';
import { PermissionsComponent } from './components/admin/permissions/permissions.component';
import { PatientComponent } from './components/admin/patient/patient.component';
import { SeePermissionsComponent } from './components/admin/see-permissions/see-permissions.component';

@NgModule({
  declarations: [
    AppComponent,
    NavLeftComponent,
    LoginComponent,
    NavRightComponent,
    HomeComponent,
    SearchBarComponent,
    AdminComponent,
    LoginComponent,
    ReceptsComponent,
    NgongaComponent,
    DoctorComponent,
    ServsComponent,
    DisponibilityComponent,
    AppointComponent,
    SearchFilterFuturePipe,
    MotifComponent,
    AppointodayComponent,
    AppointfutureComponent,
    AppointlastComponent,
    PieComponent,
    CategoryComponent,
    SocietyComponent,
    GrilleComponent,
    RoleComponent,
    PermissionsComponent,
    PatientComponent,
    SeePermissionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      progressBar: true,
      progressAnimation: 'increasing',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
