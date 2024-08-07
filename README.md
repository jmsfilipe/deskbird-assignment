# DeskbirdAssignment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.3.

## How to navigate
Local storage is seeded with 2 users
- u: admin pw: admin
- u: user pw: user

`admin` having an admin role, and being able to edit users, and `user` being just readonly.

## Considerations
Decided to seed localstorage with the 2 types of users. (passwords are saved on the store for demo purposes).

Created a guard to prevent users accessing routes that need authentication.

Created a directive to show a feature if the current logged in user has an admin role.

Entirely done using the ngrx pattern.

Using Material to handle UI, and the dialog requirement.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
