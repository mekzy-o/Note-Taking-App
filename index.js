//Function to Initialize Note Taking App
(function() {
    var app = new NoteApp().init();
  })();
  
  function NoteApp() {
    var self = this;
    self.noteInput = document.querySelector('#note-text-input');
    self.InputColor = document.querySelector('#colors');
    self.noteHtml = document.querySelector('.notes-container');
    self.notes = [];
    self.activeNote = null;
    self.init = function() {
      document.querySelector('#save-note-form').addEventListener('submit', self.handleFormSubmit);
      return self;
    }
    
    self.handleFormSubmit = function(ev) {
      ev.preventDefault();
      self.save(self.noteInput.value, self.InputColor.value);
    }
    
    self.save = function(noteText, color) {
      if(self.activeNote === null) {
        var note = new Note(noteText, color);
        note.generate();
        note.remove.addEventListener('click', function(ev) { self.removeNote(note);});
        note.edit.addEventListener('click', function(ev) { self.editNote(note);});
        self.noteHtml.appendChild(note.html);
        self.notes.push(note);
      } else {
        self.activeNote.setText(noteText);
        self.activeNote.setColor(color);
      }
      self.InputColor.value = "";
      self.noteInput.value = "";
      self.activeNote = null;
    }
    
    self.editNote = function(note) {
      self.activeNote = note;
      self.InputColor.value = note.color;
      self.noteInput.value = note.text;
    }
    
    self.removeNote = function(note) {
      var ix = self.notes.findIndex(function(x) { return note === x;});
      if(ix > -1) {
        self.notes.splice(ix, 0);
        self.noteHtml.removeChild(note.html);
      }
    }
  }
  
  function Note(text, color) {
    var self = this;
    self.text = text;
    self.color = color;
    self.html = null;
    self.remove = null;
    self.edit = null;
    self.content = null;
    
    self.generate = function() {
      self.html = document.createElement('div');
      self.content = document.createElement('p');
      self.remove = document.createElement('span');
      self.remove.className = 'delete';
      self.remove.innerHTML = '&times;'
      self.edit = document.createElement('button');
      self.edit.innerHTML = 'Edit';
      self.setColor(self.color);
      self.setText(self.text);
      self.html.appendChild(self.content);
      self.html.appendChild(self.remove);
      self.html.appendChild(self.edit);
    }
    
    self.setColor = function(color) {
      self.html.className = 'note-item';
      self.html.classList.add(color);
      self.color = color;
    }  
    
    self.setText = function(text) {
      self.content.textContent = text;
      self.text = text;
    }
  }