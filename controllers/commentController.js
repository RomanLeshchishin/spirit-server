const Comment = require("../models/Comment");

class commentController{
    async create(req, res){
        try{
            const {user_id, name, surname, email, number, comment} = req.body
            const createdComment = new Comment({user_id, email, name, surname, number, comment})
            await createdComment.save()
            return res.json(createdComment)
        }catch (e){
            console.log(e)
            res.status(400).json({message: 'Comment error'})
        }
    }

    async getAll(req, res){
        try {
            const comments = await Comment.getAll()
            return res.json(comments)
        }catch (e){
            console.log(e)
            res.status(400).json({message: 'Get comments error'})
        }
    }

    async update(req, res){
        try {
            const updatedComment = await Comment.findByIdAndUpdate(req.body._id, req.body, {new: true})
            return res.json(updatedComment)
        }catch (e){
            res.status(500).json(e.message)
        }
    }

    async delete(req, res) {
        try {
            const comment_id = req.params.id
            const deletedComment = await Comment.findByIdAndDelete(comment_id)
            return res.json(deletedComment)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}
