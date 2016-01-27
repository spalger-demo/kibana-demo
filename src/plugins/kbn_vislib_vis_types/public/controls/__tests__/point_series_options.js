describe('point series options', function () {
  describe('Set Y-Axis Extents', function () {
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
