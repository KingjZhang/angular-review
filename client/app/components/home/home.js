import angular from 'angular';
import uiRouter from 'angular-ui-router';
import homeComponent from './home.component';
import ngMaterial from 'angular-material';
import services from '../../services/services';
import LocalStorageModule from 'angular-local-storage'
let homeModule = angular.module('home', [
  uiRouter,
  ngMaterial,
  LocalStorageModule,
  services.name
])
  .config(($stateProvider, $urlRouterProvider) => {
    "ngInject";
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        component: 'home'
      });
  })
  .component('home', homeComponent)
  .name;
export default homeModule;
