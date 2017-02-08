class HomeController {
  constructor($state, DataService, $mdDialog, $mdToast) {
    "ngInject";
    this.name = 'home';
    this.$state = $state;
    this.DataService = DataService;
    this.$mdDialog = $mdDialog;
    this.$mdToast = $mdToast;
    this.star = 5;
    this.getNumber = function (n) {
      return new Array(n);
    };
    this.sortBy = [{name: "Most recent", condition: "createDate"}, {name: "Most star", condition: "star"}];
    if (!this.currPage) this.currPage = 1;
    if (!this.condition) this.condition = "createDate";
    if (!this.pageSize) this.pageSize = 3;

    this.loadReviews();
  }

  loadReviews() {
    // get the data from service
    this.DataService.searchReview(this.condition, this.currPage, this.pageSize)
      .then(data => {
        this.data = data;
      });
  }

  submit() {
    this.DataService
      .addReview({name: this.username, title: this.title, content: this.content, star: this.star})
      .then(data => {
        this.$mdToast.show(
          this.$mdToast.simple()
            .textContent('Add review succeed!')
            .parent(document.getElementById('mainLayout'))
            .position('bottom right')
            .hideDelay(3000)
        );
        this.loadReviews();
      });
  }

  deleteReview($event, guid) {
    var confirm = this.$mdDialog.confirm()
      .title('Would you like to delete this review?')
      .textContent('Please double check.')
      .targetEvent($event)
      .ok('Yes')
      .cancel('No');
    let $this = this;
    this.$mdDialog.show(confirm).then(function () {
      $this.DataService
        .deleteReview(guid)
        .then(data => {
          $this.$mdToast.show(
            $this.$mdToast.simple()
              .textContent('Delete succeed!')
              .position('bottom right')
              .hideDelay(3000)
          );
          $this.loadReviews();
        });
    }, function () {
      // Click cancel button, do nothing.
    });
  }
}

export default HomeController;
