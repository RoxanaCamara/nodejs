const { response, request, json } = require("express");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helper/generar-jwt");
const { verifyGoogle } = require("../helper/google-verify");
const { User } = require("../models");

const authPost = async (req, res = response) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ msg: "User or password invalid" });
		}
		if (!user.state) {
			return res
				.status(404)
				.json({ msg: "User or password invalid - For state" });
		}
		const validPassword = bcrypt.compareSync(password, user.password);
		if (!validPassword) {
			return res.status(404).json({ msg: "Password invalid" });
		}
		const token = await generarJWT(user.id);
		res.json({ token, user });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "Comunicate Suport" });
	}
};

const googleSingIn = async (req, res = response) => {
	const { id_token } = req.body;
	try {
		const { name, email, picture } = await verifyGoogle(id_token);
		let usuario = await User.findOne({ email });

		if (!usuario) {
			//tengo que crearlo
			const data = {
				name,
				email,
				password: ":P",
				img: picture,
				google: true,
			};
			const user = new User(data);
			await user.save();
		}

		usuario = await User.findOne({ email });

		if (!usuario.state) {
			//tengo que
			res.status(401).json({
				msg: "Hable con el admin, usuario bloqueado",
			});
		}

		const token = await generarJWT(usuario.id);

		console.log(token);

		res.json({
			usuario,
			token,
		});
	} catch (error) {
		res.status(404).json({
			msg: "El token no se pudo verificar",
		});
	}
};
const renovarToken = async (req, res = response) => {
	const { user } = req;
	const token = await generarJWT(user.id);
	res.json({ user, token });
};

module.exports = { authPost, googleSingIn, renovarToken };
