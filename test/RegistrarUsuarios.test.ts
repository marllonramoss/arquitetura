import RegistrarUsuario from "../src/exemplo/app/usuario/RegistrarUsuario";
import BancoEmMemoria from "../src/exemplo/adaptadores/db/BancoEmMemoria";
import InverterSenha from "../src/exemplo/adaptadores/auth/InverterSenha";
import SenhaComEspaco from "../src/exemplo/adaptadores/auth/SenhaComEspaco";
import CriptoReal from "../src/exemplo/adaptadores/auth/CriptoReal";

test("Deve registrar um usuario invertendo a senha", () => {
  const colecao = new BancoEmMemoria();
  const provedorCripto = new InverterSenha();
  const casoDeUso = new RegistrarUsuario(colecao, provedorCripto);

  const usuario = casoDeUso.executar(
    "Joao da Silva da Silva",
    "jjjoao@zmail.com",
    "123456"
  );

  expect(usuario).toHaveProperty("id");
  expect(usuario.nome).toBe("Joao da Silva da Silva");
  expect(usuario.senha).toBe("654321");
});
test("Deve registrar um usuario com senha com espacos", () => {
  const colecao = new BancoEmMemoria();
  const provedorCripto = new SenhaComEspaco();
  const casoDeUso = new RegistrarUsuario(colecao, provedorCripto);

  const usuario = casoDeUso.executar(
    "Joao da Silva da Silva",
    "jjjoao@zmail.com",
    "123456"
  );

  expect(usuario).toHaveProperty("id");
  expect(usuario.nome).toBe("Joao da Silva da Silva");
  expect(usuario.senha).toBe("1 2 3 4 5 6");
});

test("Deve registrar um usuario com senha criptografada", () => {
  const colecao = new BancoEmMemoria();
  const provedorCripto = new CriptoReal();
  const casoDeUso = new RegistrarUsuario(colecao, provedorCripto);

  const usuario = casoDeUso.executar(
    "Joao da Silva da Silva",
    "jjjoao@zmail.com",
    "123456"
  );

  expect(usuario).toHaveProperty("id");
  expect(usuario.nome).toBe("Joao da Silva da Silva");
  expect(provedorCripto.comparar("123456", usuario.senha)).toBeTruthy();
});
