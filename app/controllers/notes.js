import Ember from "ember";

export default Ember.ArrayController.extend({
  actions: {
    newNote: function() {
      var body = this.get('noteCopy');
      if (body) {
        var note = this.store.createRecord('note', {
          body: body
        });

        this.set('noteCopy', '');
        note.save();
      }
    },

    deleteNote: function(note_id) {
      this.store.find('note', note_id).then(function(note) {
        note.deleteRecord();
        note.save();
      });
    }
  }
});
