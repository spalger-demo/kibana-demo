import ngMock from 'ngMock';
import $ from 'jquery';
import expect from 'expect.js';

describe('point series options', function () {
  describe('Set Y-Axis Extents', function () {
    let compile;

    beforeEach(ngMock.module('kibana'));
    beforeEach(ngMock.inject(function ($compile, $rootScope, Private) {
      const Vis = Private(require('ui/Vis'));
      const indexPattern = Private(require('fixtures/stubbed_logstash_index_pattern'));

      compile = function (min, max) {
        const $el = $('<vis-editor-vis-options vis="vis">');
        const $scope = $rootScope.$new();

        $scope.vis = new Vis(indexPattern, {
          type: 'line',
          params: {
            setYExtents: true,
            yAxis: {
              max: max,
              min: min
            },
          },
          aggs: [
            {
              type: 'count',
              schema: 'metric',
            },
            {
              type: 'date_histogram',
              schema: 'segment',
              params: {
                field: '@timestamp',
              }
            }
          ],
        });

        $compile($el)($scope);
        $rootScope.$digest();

        const $err = $el.findTestSubject('visOptionSetYExtents error');

        return { $el, $err, $scope };
      };
    }));

    context('min is less than max', function () {
      it('hides the error message', function () {
        const { $el, $err } = compile(9, 10);
        expect($err.hasClass('ng-hide')).to.be(true);
      });
    });

    context('min is equal to max', function () {
      it('shows the error message', function () {
        const { $el, $err } = compile(10, 10);
        expect($err.hasClass('ng-hide')).to.be(false);
      });
    });

    context('min is greater than max', function () {
      it('shows the error message', function () {
        const { $el, $err } = compile(11, 10);
        expect($err.hasClass('ng-hide')).to.be(false);
      });
    });
  });
});
