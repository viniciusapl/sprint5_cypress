//import cypress from "cypress"
import Factory from "../fixtures/facture"



const URL_USUARIOS = '/usuarios'
const URL_LOGIN = '/login'
const URL_PRODUTOS = '/produtos'
const URL_CARRINHOS = '/carrinhos'

export default class Serverest {

    //Buscar todos os usuários
    static buscarUsuarios() {
        return cy.rest('GET', URL_USUARIOS)
    }

    //Buscar um usuário e utilizar as informações dele para o login
    static buscarUsuarioParaLogin() {
        cy.request(URL_USUARIOS).then( res => {
            cy.wrap({
                email: res.body.usuarios[0].email,
                password: res.body.usuarios[0].password
            }).as('usuarioLogin')
        })
    }

    //Realizar o login
    static logar(usuario) {
        return cy.rest('POST', URL_LOGIN, usuario)
    }

    //SALVAR O TOKEN

    static salvarBearer(res) {
        Cypress.env('bearer', res.body.authorization.slice(7))
    }

    //PRODUTOS

    static buscarProdutos() {
        return cy.rest('GET', URL_PRODUTOS)
    }

    static cadastrarProdutoComSucesso() {
        let produto = Factory.gerarProduto()

        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            body: produto,
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env('bearer'),
            }

        })
    }
}