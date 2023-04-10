module.exports = (sequelize, Datatypes) => {
  const Category = sequelize.define(
    'Category', {
      id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: Datatypes.INTEGER,
        allowNull: false,
      }
    }, 
    {
      timestamps: false,
      tableName: 'categories',
      underscored: true,
    });
    return Category;
};