const mongoose = require('mongoose');

const fileMetadataSchema1 = new mongoose.Schema({
    filename: String,
    contentType: String,
    // Other metadata fields here
});

const FileMetadata1 = mongoose.model('FileMetadata1', fileMetadataSchema1);

module.exports = FileMetadata1;