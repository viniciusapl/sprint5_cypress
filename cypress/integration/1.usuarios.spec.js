/// <reference types="cypress" />


import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'


describe('Casos de teste sobre a rota /usuarios da API Serverest', () => {
    it('Deve buscar todos os usuários cadastrados', () => {
      Serverest.buscarUsuarios().then( res => {
        cy.contractValidation(res, 'get-usuarios', 200)
        ValidaServerest.validarBuscaDeUsuarios(res)
      })
    })

    it('Deve cadastrar um novo usuário administrador', () => {
      Serverest.cadastrarNovoUsuario().then( res => {
        cy.contractValidation(res, 'post-usuarios', 201)
        ValidaServerest.validarCadastroDeUsuarioComSucesso(res)
      })
    })

    it('Deve buscar o usuário cadastrado pelo seu Id', () => {
      Serverest.buscarUsuarioPorId().then(res => {
        cy.contractValidation(res, 'get-usuario-by-id', 200)
        ValidaServerest.validarBuscaDeUsuarioPorId(res)
      })
    })

    it('Deve editar os dados do usuário cadastrado', () => {
      Serverest.editarUsuarioCadastrado().then(res => {
        cy.contractValidation(res, 'put-usuarios-by-id', 200)
        ValidaServerest.validarEdicaoDeUsuario(res)
      })
    })

    
    it('Deve excluir o usuário cadastrado', () => {
      Serverest.excluirUsuarioCadastrado().then(res => {
        cy.contractValidation(res, 'delete-usuarios-by-id', 200)
        ValidaServerest.validarExclusaoDeUsuario(res)
      })
    })
    it('Não deve postar um novo usuário administrador já cadastrado', () => {
      cy.postarUsuarioSemSucesso().then( res => {
        cy.contractValidation(res, 'post-usuarios', 400)
        ValidaServerest.validarCadastroDeUsuarioSemSucesso(res)
      })
    })

    it('Deve buscar e salvar um usuário no arquivo json', () => {
      Serverest.buscarUsuarios().then( res => {
        cy.log(JSON.stringify(res.body.usuarios[0]))
        cy.writeFile('./cypress/fixtures/users.json', res.body.usuarios[0])
        ValidaServerest.validarBuscaDeUsuarios(res)
      })
    })

  })