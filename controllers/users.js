const { response, request } = require("express");
const Users = require("../models/User");
const bcrypt = require("bcryptjs");

const usersGet = async (req, res = response) => {
	const { limit = 5, from = 0 } = req.query;
	const query = { state: true };
	//para ejecutar las dos funciones a la vez
	try {
		const [total, users] = await Promise.all([
			Users.find(query).skip(Number(from)).limit(Number(limit)),
			Users.countDocuments(query),
		]);
		res.json({ msg: "GET API", users, total });
	} catch (error) {
		res.status(500).json(error);
	}
};

const usersPost = async (req, res = response) => {
	const { name, email, password, role } = req.body;
	try {
		const user = new Users({ name, email, password, role });
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(user.password, salt);
		await user.save();
		res.json({ msg: "POST API", user });
	} catch (error) {
		res.status(500).json(error);
	}
};

const usersPut = async (req, res = response) => {
	const { id } = req.params;
	const { _id, password, ...all } = req.body;

	try {
		if (password) {
			const salt = bcrypt.genSaltSync();
			all.password = bcrypt.hashSync(password, salt);
		}
		await Users.findByIdAndUpdate(id, all);
		res.json({ msg: "PUT API", all });
	} catch (error) {
		res.status(500).json({
			error,
		});
	}
};

const usersPatch = async (req, res = response) => {
	const { id } = req.params;
	const { _id, password, ...all } = req.body;

	try {
		if (password) {
			const salt = bcrypt.genSaltSync();
			all.password = bcrypt.hashSync(password, salt);
		}
		await Users.findByIdAndUpdate(id, all);
		res.json({ msg: "PATCH API", all });
	} catch (error) {
		res.status(500).json({
			error,
		});
	}
};

const usersDelete = async (req, res = response) => {
	const { id } = req.params;
	//Fisicamente lo borramos de mongo
	//const userDelete = await Users.findByIdAndDelete(id)
	//Recomendado, en donde dejamos su propiedad en falso para dejar de contarlo
	try {
		const userDelete = await Users.findByIdAndUpdate(id, { state: false });
		res.json(userDelete);
	} catch (error) {
		res.status(500).json(error);
	}
};

module.exports = {
	usersGet,
	usersPost,
	usersPut,
	usersPatch,
	usersDelete,
};
