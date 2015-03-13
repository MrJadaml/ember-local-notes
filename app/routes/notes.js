import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('note');
  },

  setupController: function(controller, notes) {
    this._super(controller, notes);
    var leftCol = [];
    var rightCol = [];
    for (var i = 0; i < notes.content.length; i++) {
      if (notes.content[i].id % 2 === 0) {
        leftCol.push(notes.content[i]);
      } else {
        rightCol.push(notes.content[i]);
      }
    }
    controller.set('left', leftCol);
    controller.set('right', rightCol);
  }
});
