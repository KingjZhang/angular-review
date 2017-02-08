import services from './services.js';

describe('Data service test', () => {
  let $rootScope, service;
  /** @type {DataService} */
  beforeEach(window.module('app.services'));

  beforeEach(inject(($injector) => {
    $rootScope = $injector.get('$rootScope');
  }));

  beforeEach(function () {
    inject(function ($injector) {
      service = $injector.get('DataService');
    });
  });

  it('should be able to write a review', () => {
    //given
    let testReview = {name: "name", title: "title", content: "testreview", star: 5};
    //when
    let returnReview;
    service.addReview(testReview).then(data => {
      returnReview = data;
    });
    $rootScope.$apply();
    //test
    expect(returnReview.guid).to.exist;
  });

  it('should be able to delete a review', () => {
    //given
    let reviews, guid, status;
    service.loadReviews().then(data => {
      reviews = data;//load all reviews first
    });
    $rootScope.$apply();
    guid = reviews[0].guid;//get the first review's guid/uuid
    //when
    service.deleteReview(guid).then(data => {
      status = data;
    });
    $rootScope.$apply();
    //test
    expect(status).to.be.equal(true);
  });

});
