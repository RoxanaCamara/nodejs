const { User, Categorie, Product, Role } = require("../models");

const isRoleValid = async (role = "") => {
	const existRol = await Role.findOne({ role });
	if (!existRol) {
		throw new Error(`El rol ${role} no esta registrado en la db`);
	}
};

const isEmailInUsed = async (email = "") => {
	const existEmail = await User.findOne({ email });
	if (existEmail) {
		throw new Error(`El email ${email} ya esta registrado en la db`);
	}
};

const isEmailNotUsed = async (email = "") => {
	const existEmail = await User.findOne({ email });
	if (!existEmail) {
		throw new Error(`El email ${email} no esta registrado en la db`);
	}
};

const existUserForId = async (id = "") => {
	const existId = await User.findById(id);
	if (!existId) {
		throw new Error(`El id ${id} no es valido en la db`);
	}
};

const existNameCategorie = async (nameP = "") => {
	let name = nameP.toUpperCase();
	const categorie = await Categorie.findOne({ name });
	if (categorie) {
		throw new Error(`El name ${nameP} ya existe en la bd`);
	}
};

const existCategorieForId = async (id = "") => {
	const categorie = await Categorie.findById(id);
	if (!categorie) {
		throw new Error(`El id ${id} no es valido en la db`);
	}
};

const existProductForId = async (id = "") => {
	const product = await Product.findById(id);
	if (!product) {
		throw new Error(`El id ${id} no es valido en la db`);
	}
};

const existNameProduct = async (nameP = "") => {
	let name = nameP.toUpperCase();
	const product = await Product.findOne({ name });
	if (product) {
		throw new Error(`El name ${nameP} ya existe en la bd`);
	}
};

const collectionPermitidas = (collection = "", collections = []) => {
	const permitido = collections.includes(collection);
	if (!permitido) {
		throw new Error({
			msg: `La coleccion ${collection} no es valida. Debe subir un elemento a alguna de estas colecciones ${collections}`,
		});
	}
	return true;
};

module.exports = {
	isRoleValid,
	isEmailInUsed,
	existUserForId,
	isEmailNotUsed,
	existNameCategorie,
	existCategorieForId,
	existProductForId,
	existNameProduct,
	collectionPermitidas,
};
