function Item(opts) {
  opts = opts || {};
  this.text = opts.text || '';
  this.finished = opts.finished || false;
}

Item.prototype.finish = function() {
  this.finished = true;
};

Item.prototype.start = function() {
  this.finished = false;
};
