import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    //RecipeModule, ShoppingListModule are not imported here because are loading lazily
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({shoppingList: shoppingListReducer}),
    SharedModule,
    CoreModule
  ],
//   providers: [
            //It is better to provide services with @Injectable
            //inside the service i.e (@Injectable({ providedIn: 'root}))
            //and not in the way they are now provided, so the app module is leaner
            //and has less providers
            
            //ShoppingListService provided with @Injectable({ providedIn: 'root}),  
            //All other services are in core.module.ts
        // ],
  bootstrap: [AppComponent]
})
export class AppModule { }
