import PostSchema from '../models/Post.js';

export const create = async (req, res) => {
  try {
    const doc = new PostSchema({
      title: req.body.title,
      text: req.body.text,
      category: req.body.category,
      imageURL: req.body.imageURL,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post)
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось создать пост",
    })
  }
}

export const getAll = async (req, res) => {
  try {
    const posts = await PostSchema.find().populate('user').exec()
    res.json(posts)


  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить посты"
    })
  }
}

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    
    PostSchema.findOneAndUpdate(
    {
        _id: postId,
    },
    {
      $inc: { viewsCount: 1 },
    },
    {
      returnDocument: 'after'
    },
    (err, doc) => {
      if(err) {
        console.log(err);
        return res.status(500).json({
          message: "Не удалось поучить посты",
        });
      }
      if(!doc) {
        return res.status(404).json({
          message: "Статья не найдена",
        })
      }

      res.json(doc);
    },

    ).populate('user')


  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить посты"
    })
  }
}

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    PostSchema.findOneAndDelete({
      _id: postId,
    }, 
    (err, doc) => {
      if(err) {
        console.log(error);
        res.status(500).json({
          message: "Не удалось удалить пост",
        })
      }

      if (!doc) {
        res.status(404).json({
          message: "Пост не найден",
        })
      }
    })

    res.json({
      success: true,
    })
    

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить посты"
    })
  }
}

export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostSchema.updateOne({
      _id: postId,
    },
    {
      title: req.body.title,
      text: req.body.text,
      imageURL: req.body.imageURL,
      user: req.body.user,
      category: req.body.category,
    },
    res.json({
      success: true,
    })
    );

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось изменить пост"
    })
  }
}

