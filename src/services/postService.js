const { User, Category, BlogPost, PostCategory,
    sequelize } = require('../database/models');
  
  const verifyCategory = async (categoryIds) => {
    const { rows } = await Category.findAndCountAll({
      where: {
        id: categoryIds,
      },
    });
  
    if (rows.length !== categoryIds.length) {
      return { message: '"categoryIds" not found' };
    }
  
    return true;
  };
  
  const create = async (postInfo, userId) => {
    const { title, content } = postInfo;
    const response = await sequelize.transaction(async (transaction) => {
      const post = await BlogPost.create(
        { title, content, userId },
        { transaction },
      );
  
      const postId = post.dataValues.id;
  
      const categories = postInfo.categoryIds
        .map((categoryId) => ({ postId, categoryId }));
  
      await PostCategory.bulkCreate(
        categories,
        { transaction },
      );
  
      return post;
    });
  
    return response;
  };
  
  const getAll = async () => {
    const post = await BlogPost.findAll({
      include: [{
          model: User,
          as: 'user',
          attributes: {
            exclude: ['password'],
          },
        }, {
          model: Category,
          as: 'categories',
          through: { attributes: [] },
      },
      ],
    });
  
    return post;
  };
  
  const getById = async (id) => {
    const post = await BlogPost.findOne({
      where: { id },
      include: [{
          model: User,
          as: 'user',
          attributes: {
            exclude: ['password'],
          },
        }, {
          model: Category,
          as: 'categories',
          through: { attributes: [] },
      },
      ],
    });
  
    if (!post) return { message: 'Post does not exist' };
  
    return post;
  };
  
  const verifyAuthor = async (postId, userId) => {
    const post = await BlogPost.findOne({
      where: { id: postId },
    });
  
    if (!post) return { message: 'Post does not exist', code: 404 };
  
    if (post.userId !== userId) return { message: 'Unauthorized user', code: 401 };
  
    return true;
  };
  
  const update = async (postInfo, postId) => {
    const { title, content } = postInfo;
  
    await BlogPost.update(
      { title, content },
      { where: { id: postId } },
    );
  
    const updat = await getById(postId);
  
    return updat;
  };
  
  module.exports = {
    verifyCategory,
    create,
    getById,
    getAll,
    verifyAuthor,
    update,
  };