import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Components from './components/components';
import AppComponent from './app.component';
import ngMaterial from 'angular-material';
import 'angular-material/angular-material.css';
import services from './services/services';
import LocalStorageModule from 'angular-local-storage'

angular.module('app', [
    uiRouter,
    ngMaterial,
    LocalStorageModule,
    services.name,
    Components
  ])
  .config(($locationProvider, localStorageServiceProvider) => {
    "ngInject";
    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    //$locationProvider.html5Mode(true).hashPrefix('!');
    localStorageServiceProvider
      .setPrefix('review');
  })
  .component('app', AppComponent);
