module.exports = function (mongoose) {

    let Schema = mongoose.Schema;

// used in bathhouse
    let GallerySchema = new Schema({
        _id: Schema.Types.ObjectID,
        url: String
    })

    return mongoose.model("gallerymodel", GallerySchema, "galleries")
}

