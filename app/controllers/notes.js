import Ember from "ember";

export default Ember.ArrayController.extend({

  searchText: null,

  filteredNotes: function () {
    if(this.get('searchText') && this.get('searchText').trim()){
      return this.get('model').filter(function (record) {
        return record.get('title').indexOf(this.get('searchText')) > -1;
      }.bind(this));
    } else {
      return this.get('model');
    }
  }.property('model.@each', 'searchText'),

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

    noteSearch: function(text) {
      // renderTemplate: function() {
      //   this.render('notes', {outlet: 'searchResults'});
      // }
      var results = this.store.find( 'text', {q: params});

      this.set('searchResults', '');
    },

    search: function(item) {
      items = this.store.find( 'item', {q: this.params});
      this.get('items').set('model', items)
    },

    deleteNote: function(note) {
      note.destroyRecord().then(function() {
        this.flashMessage('success', 'Woot! That note is gone forever.');
      });
    }
  }
});
