import Note from "../models/note.model.js";
export const createNote=async(req,res)=>{
    try {
        const {title,content,tags,userId}=req.body;
        if(!title || !content){
            return res.status(400).json({message:"Title and content are required"});
        }
        if(!userId){
            return res.status(400).json({message:"userId is required"});
        }
      const newNote=  new Note({title,content,tags: tags || [], userId })
      await newNote.save();
      res.status(201).json(newNote)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const getNotes=async(req,res)=>{
    try {
      const { userId } = req.query;
      if(!userId){
        return res.status(400).json({message:"userId is required"});
      }
      const notes= await Note.find({ userId }).sort({createdAt:-1})
        res.status(200).json(notes)
    } catch (error) {
         res.status(500).json({message:error.message})
    }
}

export const updateNote=async(req,res)=>{
    try {
        const {title,content,tags,userId}=req.body;
        if(!userId){
            return res.status(400).json({message:"userId is required"});
        }
        const updatedNote= await Note.findOneAndUpdate(
            {_id:req.params.id, userId},
            {title,content, tags},
            {new:true},
        )
        if(!updatedNote){
            return res.status(404).json({message:"Note not updated"})
        }
        res.status(200).json(updatedNote)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const deleteNote=async(req,res)=>{
    try {
        const { userId } = req.query;
        if(!userId){
            return res.status(400).json({message:"userId is required"});
        }
        const deletedNote= await Note.findOneAndDelete({_id:req.params.id, userId})
        if(!deletedNote){
            return res.status(404).json({message:"Note not found"})
        }
        res.status(200).json({message:"Note deleted successfully"})
    } catch (error) {
         res.status(500).json({message:error.message})
    }
}

export const togglePinNote = async (req, res) => {
  try {
    const { userId } = req.body;
    if(!userId){
      return res.status(400).json({message:"userId is required"});
    }
    const note = await Note.findOne({_id:req.params.id, userId})
    if(!note){
      return res.status(404).json({message:"Note not found"});
    }
    note.isPinned = !note.isPinned
    await note.save()
    res.status(200).json(note)
  } catch (error) {
    res.status(500).json({ message: "Failed to pin note" })
  }
}
