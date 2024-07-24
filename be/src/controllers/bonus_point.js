const { BonusPoints } = require("../../models");

// Create a new BonusPoints
exports.create = async (req, res) => {
	try {
		const bonusPoint = await BonusPoints.create(req.body);
		res.status(201).json(bonusPoint);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get all BonusPoints
exports.findAll = async (req, res) => {
	try {
		const bonusPoint = await BonusPoints.findAll();
		res.json(bonusPoint);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get a single BonusPoints by ID
exports.findOne = async (req, res) => {
	try {
		const bonusPoint = await BonusPoints.findByPk(req.params.id);
		if (bonusPoint) {
			res.json(bonusPoint);
		} else {
			res.status(404).json({ error: "BonusPoints not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Update a BonusPoints by ID
exports.update = async (req, res) => {
	try {
		const [updated] = await BonusPoints.update(req.body, {
			where: { BonusPointID: req.params.id },
		});
		if (updated) {
			const updatedBonusPoint = await BonusPoints.findByPk(req.params.id);
			res.json(updatedBonusPoint);
		} else {
			res.status(404).json({ error: "BonusPoints not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Delete a BonusPoints by ID
exports.delete = async (req, res) => {
	try {
		const deleted = await BonusPoints.destroy({
			where: { BonusPointID: req.params.id },
		});
		if (deleted) {
			res.status(204).json();
		} else {
			res.status(404).json({ error: "BonusPoints not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
