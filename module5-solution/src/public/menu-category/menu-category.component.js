(function () {
"use strict";

angular.module('public')
.component('menuCategory', {
  templateUrl: 'src/public/menu-category/menu-category.html',
  bindings: {
    category: '<'
  },
  controller: MenuCategoryController
});


MenuCategoryController.$inject = [];
function MenuCategoryController() {
  var $ctrl = this;
  $ctrl.imageBasePath = 'http://cdn.rawgit.com/jhu-ep-coursera/fullstack-course5/master/examples/Lecture59';
}


})();
