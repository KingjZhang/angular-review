import angular from 'angular';
import LocalStorageModule from 'angular-local-storage'

import DataService from './dataService';

export default angular
  .module('app.services', [LocalStorageModule])
  .service({
    DataService
  });
