"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Orders",
			[
				{
					"OrderID": "ORD001",
					"SaleDate": "2024-06-20",
					"CusPhone": "0823667838",
					"CusName": "Nguyễn Văn A",
					"CusAddress": "04 ngõ 67 Chu Văn An",
					"TotalDetailPrice": "19500000.00",
					"DiscountPrice": "1950000.00",
					"TotalPrice": "17550000.00",
					"ShipPrice": "50000.00",
					"Currency": "VND",
					"BonusPointID": "1",
					"OrderPoint": 5,
					"PromotionID": "PRO001",
					"CustomerID": 1,
					"EmployeeIDShip": "EMP005",
					"OrdNote": "giao nhanh",
					"OrdStatus": 2
				},
				{
					"OrderID": "ORD002",
					"SaleDate": "2024-04-20",
					"CusPhone": "0823667838",
					"CusName": "Nguyễn Văn B",
					"CusAddress": "04 ngõ 67 Chu Văn An",
					"TotalDetailPrice": "14660000.00",
					"DiscountPrice": "2340000.00",
					"TotalPrice": "56438000.00",
					"ShipPrice": "50000.00",
					"Currency": "VND",
					"BonusPointID": "2",
					"OrderPoint": 10,
					"PromotionID": "PRO001",
					"CustomerID": 2,
					"EmployeeIDShip": "EMP005",
					"OrdNote": null,
					"OrdStatus": 5
				},
				{
					"OrderID": "ORD003",
					"SaleDate": "2024-03-19",
					"CusPhone": "0823667838",
					"CusName": "Nguyễn Văn B",
					"CusAddress": "04 ngõ 67 Chu Văn An",
					"TotalDetailPrice": "14660000.00",
					"DiscountPrice": "7890000.00",
					"TotalPrice": "32200000.00",
					"ShipPrice": "50000.00",
					"Currency": "VND",
					"BonusPointID": "1",
					"OrderPoint": 5,
					"PromotionID": "PRO001",
					"CustomerID": 2,
					"EmployeeIDShip": "EMP005",
					"OrdNote": null,
					"OrdStatus": 5
				},
				{
					"OrderID": "ORD004",
					"SaleDate": "2024-02-18",
					"CusPhone": "0823667838",
					"CusName": "Nguyễn Văn B",
					"CusAddress": "04 ngõ 67 Chu Văn An",
					"TotalDetailPrice": "14660000.00",
					"DiscountPrice": "7650000.00",
					"TotalPrice": "24500000.00",
					"ShipPrice": "50000.00",
					"Currency": "VND",
					"BonusPointID": "1",
					"OrderPoint": 5,
					"PromotionID": "PRO001",
					"CustomerID": 2,
					"EmployeeIDShip": "EMP005",
					"OrdNote": null,
					"OrdStatus": 5
				},
				{
					"OrderID": "ORD005",
					"SaleDate": "2024-01-19",
					"CusPhone": "0823667838",
					"CusName": "Nguyễn Văn B",
					"CusAddress": "04 ngõ 67 Chu Văn An",
					"TotalDetailPrice": "14660000.00",
					"DiscountPrice": "2220000.00",
					"TotalPrice": "46500000.00",
					"ShipPrice": "50000.00",
					"Currency": "VND",
					"BonusPointID": "1",
					"OrderPoint": 5,
					"PromotionID": "PRO001",
					"CustomerID": 2,
					"EmployeeIDShip": "EMP005",
					"OrdNote": null,
					"OrdStatus": 5
				},
				{
					"OrderID": "ORD006",
					"SaleDate": "2024-05-19",
					"CusPhone": "0823667838",
					"CusName": "Nguyễn Văn A",
					"CusAddress": "04 ngõ 67 Chu Văn An",
					"TotalDetailPrice": "14660000.00",
					"DiscountPrice": "1230000.00",
					"TotalPrice": "12314000.00",
					"ShipPrice": "50000.00",
					"Currency": "VND",
					"BonusPointID": "1",
					"OrderPoint": 5,
					"PromotionID": "PRO001",
					"CustomerID": 2,
					"EmployeeIDShip": "EMP005",
					"OrdNote": null,
					"OrdStatus": 5
				},
				{
					"OrderID": "ORD010",
					"SaleDate": "2024-06-27",
					"CusPhone": "0823667838",
					"CusName": "Nguyễn Văn A",
					"CusAddress": "04 ngõ 67 Chu Văn An",
					"TotalDetailPrice": "14720000.00",
					"DiscountPrice": "1472000.00",
					"TotalPrice": "13298000.00",
					"ShipPrice": "50000.00",
					"Currency": "VND",
					"BonusPointID": "1",
					"OrderPoint": 5,
					"PromotionID": "PRO001",
					"CustomerID": 2,
					"EmployeeIDShip": "EMP006",
					"OrdNote": null,
					"OrdStatus": 6
				},
				{
					"OrderID": "ORD011",
					"SaleDate": "2024-06-27",
					"CusPhone": "0823667838",
					"CusName": "Nguyễn Văn A",
					"CusAddress": "04 ngõ 67 Chu Văn An",
					"TotalDetailPrice": "14660000.00",
					"DiscountPrice": "1466000.00",
					"TotalPrice": "13244000.00",
					"ShipPrice": "50000.00",
					"Currency": "VND",
					"BonusPointID": "1",
					"OrderPoint": 5,
					"PromotionID": "PRO001",
					"CustomerID": 2,
					"EmployeeIDShip": "EMP001",
					"OrdNote": "123",
					"OrdStatus": 3
				}
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Orders", null, {});
	},
};
