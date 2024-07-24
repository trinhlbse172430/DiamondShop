const { Promotions } = require("../../models");

// Create a new Promotions
exports.create = async (req, res) => {
	try {
		const promotion = await Promotions.create(req.body);
		res.status(201).json(promotion);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get all Promotions
exports.findAll = async (req, res) => {
	try {
		const promotion = await Promotions.findAll();
		res.json(promotion);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get a single Promotions by ID
exports.findOne = async (req, res) => {
	try {
		const promotion = await Promotions.findByPk(req.params.id);
		if (promotion) {
			res.json(promotion);
		} else {
			res.status(404).json({ error: "Promotions not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Update a Promotions by ID
exports.update = async (req, res) => {
	try {
		const [updated] = await Promotions.update(req.body, {
			where: { PromotionID: req.params.id },
		});
		if (updated) {
			const updatedPromotion = await Promotions.findByPk(req.params.id);
			res.json(updatedPromotion);
		} else {
			res.status(404).json({ error: "Promotions not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Delete a Promotions by ID
exports.delete = async (req, res) => {
	try {
		const deleted = await Promotions.destroy({
			where: { PromotionID: req.params.id },
		});
		if (deleted) {
			res.status(204).json();
		} else {
			res.status(404).json({ error: "Promotions not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
