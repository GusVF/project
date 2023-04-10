module.exports = (sequelize, Datatypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      displayName: {
        allowNull: false,
        type: Datatypes.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        type: Datatypes.STRING,
      },
      password: {
        type: Datatypes.STRING,
        allowNull: false,
      },
      image: {
        allowNull: false,
        type: Datatypes.STRING,
      },
  },
  {
    timestamps: false,
    tableName: 'users',
    underscored: true,
  });
  return User;
};
