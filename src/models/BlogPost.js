module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define(
    'BlogPost',
     {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
        onDelete: 'CASCADE',
      published: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated: {
        type: DataTypes.DATE,
        allowNull: false,
      },
     },
     {
      timestamps: false,
      underscored: true,
      tableName: 'blog_posts'
     });
     BlogPost.associate = (models) => {
       BlogPost.belongsTo(models.User,
        {foreignKey: 'userId', as: 'users'})
     }
     return BlogPost;
};
