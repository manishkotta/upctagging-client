import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { GrowlModule } from 'primeng/growl';
// Components
import { AppComponent } from './app.component';
import { AppLoginComponent } from './app-login/app-login.component';
import { HeaderComponent } from './header/header.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpctabsComponent } from './upctabs/upctabs.component';
import { UntaggedupcComponent } from './untaggedupc/untaggedupc.component';
import { SearchComponent } from './search/search.component';
import { TaggedupcComponent } from './taggedupc/taggedupc.component';
import { SavedupcComponent } from './savedupc/savedupc.component';

// Routing Module 
import { AppRoutingModule }     from './app-routing.module';

// Services
import { FileuploadService } from './upc.tagging.services/fileupload.service';
import { UntaggedUpcService } from './upc.tagging.services/untagged-upc.service';
import { CommonService } from './upc.tagging.services/common.service';
import { DataTransferService } from './upc.tagging.services/data.transfer.service';
import { TaggedUpcService } from './upc.tagging.services/tagged-upc.service';
import { AuthenticationService } from './upc.tagging.services/authentication.service';
import { CookieService } from 'ngx-cookie-service';

import { UpctaggingHttpInterceptor } from './upctagging.http.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AppLoginComponent,
    HeaderComponent,
    FileuploadComponent,
    DashboardComponent,
    UpctabsComponent,
    UntaggedupcComponent,
    SearchComponent,
    TaggedupcComponent,
    SavedupcComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TableModule,
    AutoCompleteModule,
    DropdownModule,
    DialogModule,
    CheckboxModule,
    OverlayPanelModule,
    GrowlModule
  ],
  providers: [FileuploadService, UntaggedUpcService, CommonService, DataTransferService, TaggedUpcService, AuthenticationService, CookieService,{
    provide: HTTP_INTERCEPTORS,
    useClass: UpctaggingHttpInterceptor,
      multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
