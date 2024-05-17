const { response, request, json } = require("express");
const Categorie = require("../models/Categorie");

const postCategorie = async (req, res = response) => {
	try {
		const name = req.body.name.toUpperCase();
		const categoriaDB = await Categorie.findOne({ name });

		if (categoriaDB) {
			return res.status(400).json({
				msg: `La categoria ${categoriaDB.name}, ya existe`,
			});
		}
		const data = {
			name,
			user: req.user._id,
		};

		const categoria = new Categorie(data);
		await categoria.save();
		res.status(201).json(categoria);
	} catch (error) {
		res.status(500).json(error);
	}
};

const getCategories = async (req, res = response) => {
	const { limit = 5, from = 0 } = req.query;
	const query = { status: true };
	const [total, categories] = await Promise.all([
		Categorie.find(query)
			.populate("user")
			.skip(Number(from))
			.limit(Number(limit)),
		Categorie.countDocuments(query),
	]);

	res.json({ categories, total });
};

const getCategorie = async (req, res = response) => {
	const { id } = req.params;
	let categorie = await Categorie.findById(id).populate("user");
	if (!categorie) {
		return res
			.status(404)
			.json({ msg: `La categoria ${categorie} buscada no existe` });
	}
	res.json(categorie);
};

const putCategorie = async (req, res = response) => {
	const { id } = req.params;
	const { name } = req.body;
	const categorie = await Categorie.findByIdAndUpdate(
		id,
		{ name },
		{ new: true }
	).populate("user");

	if (!categorie) {
		return res
			.status(404)
			.json({ msg: `La categoria ${categorie} buscada no existe` });
	}
	res.json(categorie);
};

const deleteCategorie = async (req, res = response) => {
	const { id } = req.params;
	const categorie = await Categorie.findById(
		id,
		{ status: false },
		{ new: true }
	).populate("user");
	res.json(categorie);
};

module.exports = {
	postCategorie,
	getCategories,
	getCategorie,
	putCategorie,
	deleteCategorie,
};
