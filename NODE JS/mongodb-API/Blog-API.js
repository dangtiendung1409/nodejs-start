const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const port = 3000;

// ket noi voi co so du lieu
mongoose.connect('mongodb://localhost:27017/blog');

// dinh nghia schema 
const BlogSchema = new mongoose.Schema({
    title: String,
    author: String,
    body: String,
    comments: [{body: String, date: Date}],
    date: { type: Date, default: Date.now},
    hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number,
    } 
})

const BlogPost = mongoose.model('BlogPost', BlogSchema);
// cau hinh bodyParser
app.use(bodyParser.json());

// route getall
app.get('/api/blogs', async (req, res)=> {
  try {
      const blogs = await BlogPost.find(); // Sửa từ Blog thành BlogPost ở đây
      res.json(blogs);
  } catch(error){
      res.status(500).json({error: error.message});
  }
});

app.get('/api/blogs/:id', async (req, res)=> {
  try {
    const blog = await BlogPost.findById(req.params.id); // Sửa từ Blog thành BlogPost ở đây
    if(!blog){ // Sửa từ product thành blog ở đây
      return res.status(404).json({error: 'Cmt khong tontai'})
    }
    res.json(blog);
  } catch(error){
    res.status(500).json({error: error.message});
  }
});

// Route cmt
app.post('/api/blogs', async (req, res) => {
  const {title,author,body,comments,date,hidden,meta} = req.body;
try {
  const newBlog= new BlogPost({title,author,body,comments,date,hidden,meta}); // Sửa từ Blog thành BlogPost ở đây
  const savedBlog = await newBlog.save();
   res.json(savedBlog);
} catch (error) {
  res.status(500).json({ error: error.message });
}
});

// Route để cập nhật Blog
app.put('/api/blogs/:id', async (req, res) => {
  const {title,author,body,comments,date,hidden,meta} = req.body;
try {
  const updatedBlog = await BlogPost.findByIdAndUpdate(
  req.params.id,
  { title,author,body,comments,date,hidden,meta },
  { new: true }
  );
  if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
  }
  res.json(updatedBlog);
} catch (error) {
  res.status(500).json({ error: error.message });
}
});

// Route để xóa Blog theo id
app.delete('/api/blogs/:id', async (req, res) => {
try {
  const deleteBlog = await BlogPost.findByIdAndDelete(req.params.id); // Sửa từ Blog thành BlogPost ở đây
  if (!deleteBlog) {
      return res.status(404).json({ error: 'Blog not found' });
  }

  res.json(deleteBlog);
} catch (error) {
  res.status(500).json({ error: error.message });
}
});

// Bắt đầu server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});