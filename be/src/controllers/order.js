const { Orders } = require("../../models");

// Create a new Orders
exports.create = async (req, res) => {
	try {
		const order = await Orders.create(req.body);
		res.status(201).json(order);
	} catch (err) {
		console.log(err);
		res.status(400).json({ error: err.message });
	}
};

// Get all Orderss
exports.findAll = async (req, res) => {
	try {
		const order = await Orders.findAll();
		res.json(order);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get a single Orders by ID
exports.findOne = async (req, res) => {
	try {
		const order = await Orders.findByPk(req.params.id);
		if (order) {
			res.json(order);
		} else {
			res.status(404).json({ error: "Orders not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Update a Orders by ID
exports.update = async (req, res) => {
	try {
		const [updatedRowsCount] = await Orders.update(req.body, {
			where: { OrderID: req.params.id },
		});

		if (updatedRowsCount > 0) {
			const updatedOrder = await Orders.findByPk(req.params.id);
			if (updatedOrder) {
				res.json(updatedOrder);
			} else {
				res.status(404).json({ error: "Order not found after update" });
			}
		} else {
			const existingOrder = await Orders.findByPk(req.params.id);
			if (existingOrder) {
				res.json(existingOrder);
			} else {
				res.status(404).json({ error: "Order not found" });
			}
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Delete a Orders by ID
exports.delete = async (req, res) => {
	try {
		const deleted = await Orders.destroy({
			where: { OrdersID: req.params.id },
		});
		if (deleted) {
			res.status(204).json();
		} else {
			res.status(404).json({ error: "Orders not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

//get number of orders by recent month
exports.orderByMonth = async (req, res) => {
	try {
		const orders = await Orders.findAll();
		const count = new Array(12).fill(0);

		orders.forEach((ord) => {
			const month = new Date(ord.SaleDate).getMonth();
			count[month]++;
		});

		const result = count.map((c, index) => ({
			month: `month ${index + 1}`,
			count: c
		}));

		res.json(result);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

//get number of orders by recent week
exports.orderByWeek = async (req, res) => {
	try {
		const order = await Orders.findAll();
		const count = new Array(7).fill(0);
		order.forEach((ord) => {
			const day = new Date(ord.OrdDate).getDay();
			count[day]++;
		});
		res.json(count);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

