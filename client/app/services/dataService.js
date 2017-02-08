import moment from "moment";

export default class DataService {
  constructor($q, localStorageService) {
    "ngInject";
    this.localStorageService = localStorageService;
    this.$q=$q;
    this.defaultReview = [{
      name: 'RPFP',
      title: 'starsChanged my perception of JavaScript',
      content: `As a Java web developer, I've used JavaScript quite a bit over the years, but never really liked it. Reading this book has changed my entire perception of JavaScript. It has given me a new appreciation of the language. Instead of mechanically explaining the syntax of the language, this book actually explains what is good about JavaScript, how to use it so that it will be a trusty friend (by focusing on its good parts) rather than a troublemaking backstabber (by avoiding the bad, ugly, and awful parts).
I have great respect for the author and appreciate his taking the time to write this book. It was a pleasure to read and got me excited about JavaScript because it was a tremendous help in learning how to use the language properly. Perhaps it is not a book for beginners, but if you know the basics but are tired of "programming by coincidence" and want to learn how to really effectively use the language, and actually have an easier time doing it because you will focus on a few very good parts (and flush out the bad parts from your memory), I highly recommend this book.`,
      star: 5,
      createDate: Date.now()-1000*3600*24*4
    }, {
      name: 'Kirk',
      title: 'Tough book but worth the effort',
      content: `I am an experienced C# developer (10+ yrs).
This is my first Javascript book. I thought it'd be a piece of cake but this book helped me realize how different of a beast javascript is from oop/d that I am so used to. And for helping me realize that alone, I think this book is great.
The book is very concise and in my opinion conveys too much information without adequate amount of examples.
If you have experiences working with javascript and ran into issues which you couldn't understand why, you will love this book. If not, I think for us mortals, it will be a difficult book to absorb all the information at once.`,
      star: 4,
      createDate: Date.now()-1000*3600*24*3
    }, {
      name: 'Paul W ',
      title: 'Classic, Invaluable.',
      content: `I would not forgive myself if I did not write a review for this book. This is one of the best books I have ever read in my entire life. It does not only help me grasp and love Javascript, but also greatly improved my understanding the way of how to do better programming. As a programmer, if you have not read this book, you missed a very good part. So, if you want to learn Javascript, this is definitely the right book to read.
Like the author said, This book is small, but it is dense. It is very hard to understand some pages in the first read. I read every pages at least 3 times, some pages more than 10 times to get the idea fully. But the effort definitely got rewarded.`,
      star: 5,
      createDate: Date.now()-1000*3600*24*2
    }, {
      name: 'Steven',
      title: 'An important standard JS book, but could also be called The Bad Parts.',
      content: `Many developers praise this book, but in my opinion it did not live up to what the author claimed. It's very negative documentation of JavaScript, by someone who is making a point of telling you he's an expert. There are many, many occurrences of paragraphs, pages, or maybe even most of a chapter, where it really should be called JavaScript: The Hot&Steaming Pile. He may be an expert in JavaScript but sometimes the arrogance in the book is hard to just accept and move on past. And the negativity in spite of the title... also difficult. I didn't buy this book to learn all the things I shouldn't learn. I bought it to learn the *good* parts. And in fairness, the good parts are covered, eventually. Although, they seemed to me to come with a bit too much opinion on subjective aspects. Perhaps that is why this review also includes too much opinion on subjective aspects. ;) In spite of this, it is one of the standard books all JavaScript developers should probably read.
It's just that I think it needs an editor to go through and slash and burn some of The Bad Parts sections. Some discussion of that is needed, but I suspect the author used his expert status to intimidate his editor into making poor choices on what to cut.`,
      star: 4,
      createDate: Date.now()-1000*3600*24*1
    }, {
      name: 'Alex',
      title: 'Three Stars',
      content: `Basic and to the point`,
      star: 3,
      createDate: Date.now()
    }];
    //localStorageService.clearAll();//Clear all data
    if (localStorageService.keys().length == 0) {
      let $this=this;
      //set init data
      this.defaultReview.forEach(function (review) {
        let key = $this.guid();
        review.guid = key;
        review.createDateString = moment(review.createDate).format('MMMM Do YYYY, h:mm:ss a');
        localStorageService.set(key, review);
      });
    }
  }

  guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  sortByDESC(name,minor) {
    return function(o,p){
      var a,b;
      if(o && p && typeof o === 'object' && typeof p ==='object'){
        a = o[name];
        b = p[name];
        if(a === b){
          return typeof minor === 'function' ? minor(o,p):0;
        }
        if(typeof a === typeof b){
          return a <b ? 1:-1;
        }
        return typeof a < typeof b ? 1:-1;
      }else{
        throw("error");
      }
    }
  }
  getAllReviews() {
    let reviews = [];
    let $this=this;
    this.localStorageService.keys().forEach(function (key) {
      reviews.push($this.localStorageService.get(key));
    });
    return reviews;
  }
  loadReviews() {
    return this.$q.when(this.getAllReviews());
  }
  searchReview(condition,currPage=1,pageSize=3) {
    let reviews = this.getAllReviews();
    reviews.sort(this.sortByDESC(condition, this.sortByDESC("createDate")));
    let total=reviews.length;
    let start = pageSize*(currPage - 1);
    let end= pageSize*currPage;
    if(start>=total){
      start=0;
    }
    reviews=reviews.slice(start,end);
    return this.$q.when({
      currPage,
      reviews,
      pageSize,
      total,
      pageCount: total % pageSize == 0 ? total / pageSize : Math.floor(total / pageSize) + 1
    });
  }
  addReview(review) {
    let key = this.guid();
    review.guid = key;
    review.createDate = Date.now();
    review.createDateString = moment(review.createDate).format('MMMM Do YYYY, h:mm:ss a');
    this.localStorageService.set(key, review);
    return this.$q.when(review);
  }
  deleteReview(guid) {
    this.localStorageService.remove(guid);
    return this.$q.when(true);
  }
}
