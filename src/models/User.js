module.exports = (sequelize, DataType) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      displayName: {
        allowNull: false,
        type: DataType.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataType.STRING,
      },
      password: {
        allowNull: false,
        type: DataType.STRING,
      },
      image: {
        allowNull: false,
        type: DataType.STRING,
      },
  },
  {
    timestamps: false,
    tableName: 'users',
    underscored: true,
  });
  return User;
};
