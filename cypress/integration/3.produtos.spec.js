/// <reference types="cypress" />


import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'


describe('Casos de teste sobre a rota /produtos da API Serverest', () => {

    it('Deve buscar todos os produtos cadastrados', () => {
        Serverest.buscarProdutos().then( res => {
            ValidaServerest.validarBuscaDeProdutos(res)
        })
    })

    context('Logar com sucesso', () => {
        beforeEach('Logar', () => {
            Serverest.buscarUsuarioParaLogin()
            cy.get('@usuarioLogin').then( usuario => {
              Serverest.logar(usuario).then( res => {
                ValidaServerest.validaLoginComSucesso(res)
                Serverest.salvarBearer(res)
              })
            })
        })

        it('Deve postar um novo produto com sucesso', () => {
            Serverest.cadastrarProdutoComSucesso().then( res => {
                ValidaServerest.validarCadastroDeProdutoComSucesso(res)
            })
        })

        it('Deve realizar a busca do produto cadastrado pelo Id', () => {
            Serverest.buscarProdutoCadastradoPorId().then( res => {
                ValidaServerest.validarBuscaDeProdutoCadastradoPorId(res)
            })
        })

        it('Deve editar os dados do produto cadastrado com sucesso', () => {
            Serverest.editarProdutoCadastrado().then( res => {
                ValidaServerest.validarEdicaoDeProdutoCadastradoComSucesso(res)
            })
        })

        it('Deve excluir o produto cadastrado com sucesso', () => {
            Serverest.deletarProdutoCadastrado().then( res => {
                ValidaServerest.validarExclusaoDeProduto(res)
            })
        })
    })

  })