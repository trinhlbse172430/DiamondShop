"use strict";
module.exports = (sequelize, DataTypes) => {
	const Product = sequelize.define(
		"Products",
		{
			ProductID: {
				type: DataTypes.CHAR(10),
				primaryKey: true,
			},
			ProName: {
				type: DataTypes.STRING(255),
			},
			ProTypeID: {
				type: DataTypes.CHAR(10),
				allowNull: false,
			},
			GoldID: {
				type: DataTypes.CHAR(10),
				allowNull: false,
			},
			DiamondID: {
				type: DataTypes.CHAR(10),
				allowNull: false,
			},
			DiamondSmallID: {
				type: DataTypes.CHAR(10),
				allowNull: false,
			},
			DiaSmallQuantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			WagePrice: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
			},
			Currency: {
				type: DataTypes.STRING(10),
			},
			Ration: {
				type: DataTypes.FLOAT,
			},
			ProPicture: {
				type: DataTypes.STRING(255),
			},
		},
		{
			tableName: "Products",
			timestamps: false,
		},
	);

	return Product;
};
