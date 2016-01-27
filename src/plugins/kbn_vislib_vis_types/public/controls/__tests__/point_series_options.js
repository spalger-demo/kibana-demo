import ngMock from 'ngMock';
import $ from 'jquery';

describe('point series options', function () {
  describe('Set Y-Axis Extents', function () {
    let compile;

    beforeEach(ngMock.module('kibana'));
    beforeEach(ngMock.inject(function ($compile, $rootScope) {
      compile = function () {
        const $el = $('<vis-editor-vis-options>');
        const $scope = $rootScope.$new();
        $compile($el)($scope);
      };
    }));

    context('min is less than max', function () {
      it('hides the error message');
    });

    context('min is equal to max', function () {
      it('shows the error message');
    });

    context('min is greater than max', function () {
      it('shows the error message');
    });
  });
});
