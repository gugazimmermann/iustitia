import { database } from '@iustitia/api/database';
import { validateEmail } from '@iustitia/site/shared-utils';


export async function updateProfile(req, res) {
  const { body } = req;
  if (
    !body.name ||
    !body.email ||
    !validateEmail(body.email) ||
    !body.address ||
    !body.neighborhood ||
    !body.city ||
    !body.state ||
    !body.phone ||
    !body.zip
  ) {
    return res.status(401).send({ message: "Dados inválidos!" });
  }
  body.userId = req.userId
  try {
    const profile = await database.Profile.findOne({ where: { userId: req.userId } });
    if (!profile) {
      await database.Profile.create(body);
    } else {
      profile.update(body)
    }
    const user = await database.User.findOne({ where: { id: req.userId } });
    const file = `${req.userId.split("-").join("")}.${req.file.originalname.split('.').pop()}`
    user.update({ avatar: file });
    return res.send({ message: "Perfil alterado com sucesso!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}
