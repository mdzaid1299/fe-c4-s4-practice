## Practice

This practice comprises 1 exercise.

### Context

Graffitti designers have been assigned a project to develop `Image Gallery` app which should be a single page application.

The application would have multiple views and the user should be able to navigate smoothly from one view to another.

The landing view should display the images with basic details such as caption and size.

Each image should be clickable, and upon click, should allow user to navigate to another view that displays the image in enlarged view with more details displayed with the image.

### Problem Statement

Create a navigable app named `Image Gallery`. Enable routing in the app while the app is being created.

Define route configurations and add routes to application to allow users to navigate between the different views of the application.

### Tasks

#### About the boilerplate

- The boilerplate code contains folder `source-code` which contains component and service code files.
    - The code files will need to be copied to the `app` folder after the app is created.
- The boilerplate code also contains folder `images` which contains image files required by this app.
    - The image files need to be copied to the `assets` folder located inside the `src` folder of the newly created app.

#### Task # 1 – Create Route Enabled `Image Gallery` app.

- Create app `Image Gallery` using Angular CLI command
    ```
        ng new image-gallery --skip-tests
    ```
- Respond with "y" when the prompts appears on the screen that asks whether route should be enabled in the application
- **Note:** 
    - When the route enable option is selected at the time of creating Angular app, an additional `app-routing.module.ts` file is added, defined with `AppRoutingModule`, added with required imports from `@angular/router` package and containing declaration of routes array.
    - The `AppRoutingModule` is imported in the `AppModule`.
- Copy the image files available in `images` folder of the boilerplate to the `assets` folder of the `src` folder of the `Image Gallery` app.
- Install Angular Material for using Angular Material components, themes and schematics
    ` ng add @angular/material`
- Copy the files available in the `source-code` folder of the boilerplate to the `app` folder of the `Image Gallery` app
- Copy the following `import` statements in `app.module.ts` file
    ```ts
        import { LayoutModule } from '@angular/cdk/layout';
        import { NavbarComponent } from './navbar/navbar.component';
        import { MatSidenavModule } from '@angular/material/sidenav';
        import { MatListModule } from '@angular/material/list';
        import { MatIconModule } from '@angular/material/icon';
        import { MatToolbarModule } from '@angular/material/toolbar';
        import { MatCardModule } from '@angular/material/card';
        import { MatButtonModule } from '@angular/material/button';
        import { HomeComponent } from './home/home.component';
        import { ImageViewComponent } from './image-view/image-view.component';
        import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
        import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
        import { ImageService } from './services/image.service';
    ```
- Copy the following list of components in `declarations` property in `@NgModule`
    ```ts
        NavbarComponent,
        HomeComponent,
        ImageViewComponent,
        PageNotFoundComponent
    ```
- Copy the following list of modules in `imports` property in `@NgModule`
    ```ts
        LayoutModule,
        MatListModule,
        MatSidenavModule,
        MatIconModule,
        MatToolbarModule,
        MatCardModule,
        MatButtonModule
    ```
#### Task # 2 – Define Routes in AppRoutingModule
- Define following routes for enabling navigation in `Image Gallery` app
    - `\image-view` navigates to `Home` component.
    - `\` default route, should redirect to `\home` URL.
    - `\image-view\:id` route with `id` parameter to navigate to `ImageView` component.
    - Wild card route to handle `page not found` error
- In the `app-routing.module.ts` file, populate the routes array with route definitions
    ```ts
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
    ```
#### Task # 3 – Add Routes to Image Gallery app

1. Add `routerLink` attributes to anchor tags of `mat-toolbar` in `navbar.component.html` file.
    - The values of the `routerLink` attributes should be the route paths that allows navigation to `Home` component
    - The path can be default path that redirects to `/image-view` or it can be the specific path `/image-view`, both navigating to `Home` component
    ```html
        <a routerLink="/">Image Gallery</a>
        <a routerLink="/image-view" id="home" mat-stroked-button>
            <mat-icon>home</mat-icon>
        </a>
    ```
    - Test the functioning of anchor tags by
        - Clicking on `home` icon on toolbar. It should keep the users stay on landing view.
        - Typing `http://localhost:4200/` in browser’s URL address bar. It should keep the users stay on landing view and moreover the browser’s URL should change to `http://localhost:4200/image-view`

2. Add `routerLink` attribute to anchor tag of `mat-card` in the `home.component.html` file.
    - The value of the `routerLink` attribute should be the route path that accepts `id` as the route parameter, allowing navigation to `Image-View` component.
    ```html
        <mat-card *ngFor="let image of imageList">
            <a routerLink="{{image.id}}">
                ...
            </a>
        </mat-card>
    ```
    - Test the working of this anchor tag by clicking on any image.
        - At this point of time, the `Image-View` component gets displayed but will not display the selected image and its details, since the code to read route parameter will be done in the next task
        - If the image with id 3 is clicked, the browser’s URL address bar should display the path value as `http://localhost:4200/image-view/3`

3. Add `routerLink` attribute to anchor tag in in `page-not-found.component.html` file.
    - The value of the `routerLink` attribute should be the route path that allows navigation to `Home` component.
    ```html
        <a routerLink="/">Back to Home</a>
    ```
        - Test the wild card route by typing an invalid path in browser URL, for example, `http://localhost:4200/image-views`
        
#### Task # 4 - Retrieve Route Information to Display Selected Image
1. In the `image-view.component.ts` file, inject `ActivatedRoute`
    ```ts
    constructor(private activatedRoute: ActivatedRoute, 
        private imageService: ImageService) { 
    }
    ```
2. Implement the `OnInit` interface and implement it's `ngOnInit()` method to read the value of route parameter `id`
    ```ts
        ngOnInit(): void {
            this.activatedRoute.paramMap.subscribe(data => {
            let id = data.get('id') ?? 0;
                this.imageService.getImage(+id).subscribe(data => {
                    this.image = data;
                });
            });
        }
    ```
    - **Note:** ImageService is already injected in the boilerplate code. This service has methods that allows fetching all images, image for the given `imageId` and delete image for the given `imageId`
    - Test the task to retrieve route information by clicking on any image
        - The app should navigate to `image-view` component
        - The `image-view` component should display the selected image in enlarged size with the image details and a delete button below it.


#### Task # 5 – Enable Programmatic Navigation from Image-View to Home component
- Create `ImageRouter` service
    `ng g s services/image-router`
- Inject `Router` service imported from `@angular/router` package.
- Add method `navigateToHome()` to `ImageRouter` service. The method should call `navigate()` method of `Router` service and provide default path ("") or path "image-view" to navigate to `Home` component.
    ```ts
        navigateToHome() {
            this.router.navigate([""]);
        }
    ```
- Inject the `ImageRouter` service in `Image-View` component.
    ```typescript 
            constructor(private activatedRoute: ActivatedRoute, 
            private imageService: ImageService,
            private imageRouter: ImageRouterService) { 
        }
    ```
- The `image-view.component.ts` file contains method `delete()` that calls the `deleteImage()` method of `ImageService` to delete the displayed image.
- Inside the `delete()` method, once the image is deleted, call the method `navigateToHome()` of `ImageRouter` service to programmatically navigate to `Home` component
    ```ts
        this.imageService.deleteImage(this.image.id).subscribe(data => {
            this.imageRouter.navigateToHome(); //code to navigate to home      
        });
    ```
- Test the task to enable programmatic navigation by clicking on an image in `home` view.
    - The app should navigate to `image-view` displaying the selected image in enlarged size.
    - Click on the delete button displayed below the image details.
    - The image gets deleted from the array and the user is navigated to the `home` view.
    - The `home` view should not show the deleted image.
