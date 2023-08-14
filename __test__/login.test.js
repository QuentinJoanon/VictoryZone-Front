require('dotenv').config();
const loginTest = require('./login');

test("Permission level de niveau 1, l'utilisateur accede au tableau de bord.", async () => {
  const permissionLevel = await loginTest(
    process.env.ADMIN_LOGIN,
    process.env.ADMIN_PASSWORD
  );
  expect(permissionLevel).toBe(1);
});

test("Permission level de niveau 2 ou 3, l'utilisateur est renvoyé à l'écran de connexion.", async () => {
  const permissionLevel = await loginTest(
    process.env.USER_LOGIN,
    process.env.USER_PASSWORD
  );
  expect(permissionLevel).toBe(2 | 3);
});
