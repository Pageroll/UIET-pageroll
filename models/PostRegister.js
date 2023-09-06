const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    description:{
        type:String
    },
    file: {
        type:String,
        ref: 'FileMetadata1', // Reference to the file metadata schema
    },
});

const PostRegister = new mongoose.model("PostRegister",postSchema);

module.exports = PostRegister;