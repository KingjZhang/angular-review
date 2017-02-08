import HomeModule from './home'

describe('Home', () => {
  let $rootScope, $state, $location, $componentController, $compile;

  beforeEach(window.module(HomeModule));

  beforeEach(inject(($injector) => {
    $rootScope = $injector.get('$rootScope');
    $componentController = $injector.get('$componentController');
    $state = $injector.get('$state');
    $location = $injector.get('$location');
    $compile = $injector.get('$compile');
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
    it('default component should be home', () => {
      $location.url('/');
      $rootScope.$digest();
      expect($state.current.component).to.eq('home');
    });
  });

  describe('Controller', () => {
    // controller specs
    let controller,$scope;
    beforeEach(() => {
      controller = $componentController('home', {
        $scope: $rootScope.$new()
      });
    });
    it('has a name property', () => { // erase if removing this.name from the controller
      expect(controller).to.have.property('name');
    });
  });

  describe('View', () => {
    // view layer specs.
    let scope, template;

    beforeEach(() => {
      scope = $rootScope.$new();
      template = $compile('<home></home>')(scope);
      angular.element(document.body).append(template);
      scope.$apply();
    });

    it('has submit button in template', () => {
      expect(template.find('button').html()).to.have.string('Submit');
    });

    it('has review in template', function() {
      expect(template.html()).to.have.string('Alex');
    });

    it('has name\'s input in template', function() {
     let name=document.getElementsByName("name")[0];
      expect(name).to.exist;
    });

    it('has title\'s input in template', function() {
      let title=document.getElementsByName("title")[0];
      expect(title).to.exist;
    });

    it('has review\'s input in template', function() {
      let review=document.getElementsByName("content")[0];
      expect(review).to.exist;
    });
  });
});
