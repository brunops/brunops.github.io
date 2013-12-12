function ItemView(opts) {
  opts = opts || {};
  this.model = opts.model ||
              (opts.text ? new Item({ text: opts.text }) : new Item());
}

ItemView.prototype.bindEvents = function($element) {
  var self = this;

  // Update status
  $element.find('input').on('change', function(e) {
    self.model.finished = !self.model.finished;
  });

  // Destroy element
  $element.find('.destroy').on('click', function() {
    $element.remove();
  });
};

ItemView.prototype.renderRaw = function() {
  return $.trim(_.template($('#item').html(), { text: this.model.text, finished: this.model.finished }));
};

ItemView.prototype.render = function() {
  var $itemElement = $(this.renderRaw());
  this.bindEvents($itemElement);
  return $itemElement;
};

