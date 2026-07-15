import Note from "../models/notes.js";

export async function getNotes(_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}

export async function createNote(req, res) {
try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }     

}

export async function getNotesById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateNote(req, res) {
try {
  const{ title, content } = req.body;
  const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
  if(!updatedNote) {
    return res.status(404).json({ message: "Note not found" });
  }
  res.status(200).json(updatedNote);
}
catch (error) {
  res.status(500).json({ message: error.message });
}}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);  
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" }); // ✅ add this
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}