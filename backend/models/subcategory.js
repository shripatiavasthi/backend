const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'No subcategory name added'],
    },
    Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true,'No category name added']
    },
})

module.exports = mongoose.model('SubCategory', subCategorySchema);