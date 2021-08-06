const BlogModel = require("../models/BlogModel");

exports.getData = (req, res) => {
    BlogModel.find()
        .then(response => {
        res.json({ status: 200, message: "Data fetch..", data: response});
        })
        .catch(err => {
        res.json({ status: 200, message: "Data not fetch." });
    })
}

exports.addData = (req, res) => {   
    const title = req.body.title;
    const content = req.body.content;
    const name = req.body.name;

    if(!title) return res.json({ status: 404, message: "Title is required" });
    if(!content) return res.json({ status: 404, message: "Content is required" });
    if(!name) return res.json({ status: 404, message: "Name is required" });
    
  const addData = new BlogModel({
    title: title,
    content: content,
    name: name,
  });

  addData
    .save()
    .then(() => {
      res.json({ status: 200, message: "Data insert" });
    })
    .catch((err) => {
      res.json({ status: 200, message: "Data not insert" });
    });
}

exports.deleteData = async (req, res) => {
    const deleteData = await BlogModel.deleteOne({ _id: req.params.id })
    if (deleteData) {
        res.json({ status: 200, message: "Data is delete" });
    } else {
        res.json({ status: 200, message: "Data not delete!" });
    }
}

exports.updateData = (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const name = req.body.name;

  if (!title) return res.json({ status: 404, message: "Title is required" });
  if (!content) return res.json({ status: 404, message: "Content is required" });
  if (!name) return res.json({ status: 404, message: "Name is required" });

  BlogModel.findByIdAndUpdate(req.params.id, {
    title: title,
    content: content,
    name: name,
  })
    .then(() => {
      res.json({ status: 200, message: "Data updated" });
    })
    .catch((err) => {
      res.json({ status: 200, message: "Data not update" });
    });
};
