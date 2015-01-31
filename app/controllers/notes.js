import Ember from "ember";

export default Ember.ArrayController.extend({
  actions: {
    newNote: function() {
      var title = this.get('noteTitle');
      var body = this.get('noteCopy');
      if (body) {
        var note = this.store.createRecord('note', {
          title: title,
          body: body
        });
        note.save();
      }
        this.set('noteTitle', '');
        this.set('noteCopy', '');
    },

    deleteNote: function(note) {
      note.destroyRecord().then(function() {
        this.flashMessage('success', 'Woot! That note is gone forever.');
      });
    }
  }
});
