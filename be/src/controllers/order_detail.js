const { OrderDetails } = require("../../models");

// Create a new OrderDetails
exports.create = async (req, res) => {
	try {
		const orderDetail = await OrderDetails.create(req.body);
		res.status(201).json(orderDetail);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get all OrderDetails
exports.findAll = async (req, res) => {
	try {
		const orderDetail = await OrderDetails.findAll();
		res.json(orderDetail);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get a single OrderDetails by ID
exports.findOne = async (req, res) => {
	try {
		const orderDetail = await OrderDetails.findByPk(req.params.id);
		if (orderDetail) {
			res.json(orderDetail);
		} else {
			res.status(404).json({ error: "OrderDetails not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Update a OrderDetails by ID
exports.update = async (req, res) => {
	try {
		const [updated] = await OrderDetails.update(req.body, {
			where: { OrderDetailID: req.params.id },
		});
		if (updated) {
			const updatedOrderDetail = await OrderDetails.findByPk(req.params.id);
			res.json(updatedOrderDetail);
		} else {
			res.status(404).json({ error: "OrderDetails not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Delete a OrderDetails by ID
exports.delete = async (req, res) => {
	try {
		const deleted = await OrderDetails.destroy({
			where: { OrderDetailID: req.params.id },
		});
		if (deleted) {
			res.status(204).json();
		} else {
			res.status(404).json({ error: "OrderDetails not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get all OrderDetails by Order ID
exports.findByOrder = async (req, res) => {
	try {
		const orderDetail = await OrderDetails.findAll({
			where: { OrderID: req.params.id },
		});
		res.json(orderDetail);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
