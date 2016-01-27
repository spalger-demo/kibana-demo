import ngMock from 'ngMock';
import $ from 'jquery';

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

        return { $el, $scope };
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
