import Note from "../models/Note.js";

export const getAllNotesController = async (req, res) => {
    try {
        const notes = await Note.find().sort({createdAt: -1}); // newest first
        res.status(200).json(notes)

    } catch (error) {
        console.error("error in get notes controller", error);
        res.status(500).json({ message: "error in getting notes" })
    }
}

export const getNoteByIdController = async (req, res) => {
    try{
        const note = await Note.findById(req.params.id)
        if(!note) return res.status(404).json({message: "note by provided id not found"})
        res.status(200).json(note)

    } catch(error){
        console.error("error in getting note by controller", error);
        res.status(500).json({ message: "error in getting note by id" })

    }
}

export const createNoteController = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content });
        const savedNOte = await newNote.save();
        res.status(201).json({ savedNOte });


    } catch (error) {
        console.error("error in creating notes controller", error);
        res.status(500).json({ message: "error in creating note" })

    }

}


export const updateNoteController = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        if (!updatedNote) return res.staus(404).json({ message: "note not foound with this id" })
        res.status(200).json({ updatedNote })
    } catch (error) {

        console.error("error in update notes controller", error);
        res.status(500).json({ message: "error in updating note" })

    }
}


export const deleteNoteController = async (req, res) => {
    try{
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if(!deletedNote) return res.status(404).json({message: "note not found"})
        
        res.json({message: "note deleted successfully"})

    } catch(error){
        console.error("error in deleteing notes controller", error);
        res.status(500).json({ message: "error in deleting note" })

    }

    }
