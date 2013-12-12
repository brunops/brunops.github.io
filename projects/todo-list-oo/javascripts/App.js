var ENTER = 13;

function App() {
  this.init();
}

App.prototype.init = function() {
  this.$input = $('#new-item');
  this.$todoList = $('#todo-list');
  this.bindEvents();
};

App.prototype.bindEvents = function() {
  var self = this;
  self.$input.on('keypress', function(e) {
    if (e.which == ENTER && $.trim(self.$input.val()) !== '') {
      var newItem = new ItemView({
        text: self.$input.val()
      });

      self.$todoList.append(newItem.render());
      self.$input.val('');
    }
  });
};
