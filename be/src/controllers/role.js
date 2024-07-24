const { Roles } = require("../../models");

// Create a new Roles
exports.create = async (req, res) => {
	try {
		const role = await Roles.create(req.body);
		res.status(201).json(role);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get all Roles
exports.findAll = async (req, res) => {
	try {
		const role = await Roles.findAll();
		res.json(role);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get a single Roles by ID
exports.findOne = async (req, res) => {
	try {
		const role = await Roles.findByPk(req.params.id);
		if (role) {
			res.json(role);
		} else {
			res.status(404).json({ error: "Roles not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Update a Roles by ID
exports.update = async (req, res) => {
	try {
		const [updated] = await Roles.update(req.body, {
			where: { RoleID: req.params.id },
		});
		if (updated) {
			const updatedRole = await Roles.findByPk(req.params.id);
			res.json(updatedRole);
		} else {
			const existingRole = await Roles.findByPk(req.params.id);
			res.json(existingRole); // Return the existing customer data if no update occurred
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Delete a Roles by ID
exports.delete = async (req, res) => {
	try {
		const deleted = await Roles.destroy({
			where: { RoleID: req.params.id },
		});
		if (deleted) {
			res.status(204).json();
		} else {
			res.status(404).json({ error: "Roles not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
