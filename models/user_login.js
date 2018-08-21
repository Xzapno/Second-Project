module.exports = function(sequelize, DataTypes) 
{
  var User = sequelize.define("User",
  {
    email:
    {
      type: DataTypes.TEXT,
      allowNull: false
    },
    username: 
    {
      type: DataTypes.TEXT,
      allowNull: false
    },
    password: 
    {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  return User;
};