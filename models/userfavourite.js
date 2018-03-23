'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserFavourite = sequelize.define('UserFavourite', {
    userId: DataTypes.INTEGER,
    placeId: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  UserFavourite.associate = function(models) {
    // associations can be defined here
  };
  return UserFavourite;
};