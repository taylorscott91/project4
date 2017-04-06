angular
  .module("blog", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    Router
  ])
  .factory("Post", [
    "$resource",
    Post
  ])
  .controller("indexCtrl", [
    "$state",
    "Post",
    indexController
  ])
  .controller("showCtrl", [
    "$state",
    "$stateParams",
    "Post",
    showController
  ])


function Router($stateProvider){
  $stateProvider
  .state("welcome", {
    url: "/",
    templateUrl: "/assets/js/ng-views/welcome.html"
  })
  .state("about", {
    url: "/about",
    templateUrl: "/assets/js/ng-views/about.html"
  })
  .state("index", {
    url: '/posts',
    templateUrl: "/assets/js/ng-views/index.html",
    controller: "indexCtrl",
    controllerAs: "vm"
  })
  .state("show", {
    url: '/posts/:title',
    templateUrl: "/assets/js/ng-views/show.html",
    controller: "showCtrl",
    controllerAs: "vm"
  })
}

function Post($resource){
  return $resource("/api/posts/:title", {}, {
    update: {method: "PUT"}
  })
}

function indexController ($state, Post) {
  this.posts = Post.query()
  this.newPost = new Post()
  this.create = function(){
    this.newPost.$save().then(function(post){
      $state.go("show", {title: post.title})
    })
  }
}

function showController($state, $stateParams, Post){
  this.post = Post.get({title: $stateParams.title})
  this.update = function(){
    this.post.$update({title: $stateParams.title})
  }
  this.destroy = function(){
    this.post.$delete({title: $stateParams.title}).then(function(){
      $state.go("index")
    })
  }
}
