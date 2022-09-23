const UserModel = (sequelize, DataTypes) => {
  const UserTable = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    display_name: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		image: DataTypes.STRING,
  }, 
	{
		timestamps: false,
		underscored: true,
	});

	// UserTable.associate = (models) => {
	// 	UserTable.belongsTo(models.classes, 
	// 		{ foreignKey: 'idClass', as: 'class'});
	// };

  return UserTable;
};

module.exports = UserModel;

