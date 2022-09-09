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

    //Buscar as informações de um usuário
    static buscarUsuarioExistente() {
        cy.request(URL_USUARIOS).then( res => {
            cy.wrap({
                nome: res.body.usuarios[0].nome,
                email: res.body.usuarios[0].email,
                password: res.body.usuarios[0].password,
                administrador: res.body.usuarios[0].administrador
            }).as('usuarioExistente')
        })
    }

    //Cadastrar um novo usuário
    static cadastrarNovoUsuario() {
        let usuario = Factory.gerarUsuarioAdministrador()

        return cy.rest('POST', URL_USUARIOS, usuario)
    }

    static buscarUsuarioPorId() {
        return cy.request({
            method: 'GET',
            url: `${URL_USUARIOS}/${Cypress.env('idUsuarioCadastrado')}`
        })
    }

    static editarUsuarioCadastrado() {
        let usuario = Factory.gerarUsuarioAdministrador()

        return cy.request({
            method: 'PUT',
            url: `${URL_USUARIOS}/${Cypress.env('idUsuarioCadastrado')}`,
            body: usuario
        })
    }

    static excluirUsuarioCadastrado() {
        return cy.request({
            method: 'DELETE',
            url: `${URL_USUARIOS}/${Cypress.env('idUsuarioCadastrado')}`
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
    //Faz a busca de todos os produtos
    static buscarProdutos() {
        return cy.rest('GET', URL_PRODUTOS)
    }

    //Cadastra um novo produto
    static cadastrarProdutoComSucesso() {
        let produto = Factory.gerarProduto()

        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            body: produto,
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env('bearer')
            }

        })
    }

    //Realizar a busca de um produto pelo seu Id
    static buscarProdutoCadastradoPorId() {
        return cy.request({
            method: 'GET',
            url: `${URL_PRODUTOS}/${Cypress.env('idProdutoCadastrado')}`
        })
    }

    //Usa o Id do produto para realizar a alteração nos dados cadastrados
    static editarProdutoCadastrado() {
        let produto = Factory.gerarProduto()
        return cy.request({
            method: 'PUT',
            url: `${URL_PRODUTOS}/${Cypress.env('idProdutoCadastrado')}`,
            body: produto,
            auth: {
                bearer: Cypress.env('bearer')
            }
        })
    }

    //Excluir um produto cadastrado
    static deletarProdutoCadastrado() {
        return cy.request({
            method: 'DELETE',
            url: `${URL_PRODUTOS}/${Cypress.env('idProdutoCadastrado')}`,
            auth: {
                bearer: Cypress.env('bearer')
            }
        })
    }

    //Essa função abaixo fiz para conseguir realizar a adição de um carrinho
    //Nela eu faço uma requisição GET na url de produtos para ter a lista de todos os produtos cadastrados
    static buscarProdutoParaCarrinho() {
        cy.request(URL_PRODUTOS).then( res => {
            let qtd_produtos = res.body.quantidade - 1 //Nessa requisição, uma das respostas que obtemos é a quantidade de produtos cadastrados, então aproveito essa informação e uso aqui
            let inteiro = Factory.gerarInteiroAleatorio(qtd_produtos) // Aqui eu passo o número dos produtos cadastrados como parâmetro para ser sorteado um número aleatório dentro do intervalo de 0 até o número de produtos cadastrados, e assim selecionar um produto dentro da lista de produtos 

            // Depois de selecionar o produto vou "embalar" as informações dele que preciso
            cy.wrap({
                idProduto: res.body.produtos[inteiro]._id, //Para gerar um carrinho preciso do id do produto
                quantidade: Factory.gerarInteiroAleatorio(100)// e também da quantidade de produtos que será adicionada ao carrinho
            }).as('produtoParaCarrinho')
        })
    }


    //CARRINHOS
    //Buscar carrinhos
    static buscarCarrinhos() {
        return cy.rest('GET', URL_CARRINHOS)
    }

    static adicionarCarrinhoComSucesso(produto) {
        return cy.request({
            method: 'POST',
            url: URL_CARRINHOS,
            body: {
                produtos: [produto]
            },
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env('bearer')
            }
        })
    }


    static concluirCompraComSucesso() {
        return cy.request({
            method: 'DELETE',
            url: `${URL_CARRINHOS}/concluir-compra`,
            auth: {
                bearer: Cypress.env('bearer')
            }
        })
    }

}