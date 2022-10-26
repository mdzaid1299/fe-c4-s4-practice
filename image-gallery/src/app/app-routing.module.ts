import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './source-code/home/home.component';
import { ImageViewComponent } from './source-code/image-view/image-view.component';
import { PageNotFoundComponent } from './source-code/page-not-found/page-not-found.component';

const routes: Routes = [
  {
      path: "image-view", component: HomeComponent
  },
  {
      path: "", redirectTo: "/image-view", pathMatch: "full"
  },
  {
      path: "image-view/:id", component: ImageViewComponent,
  },
  {
      path: "**", component: PageNotFoundComponent
  }
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
