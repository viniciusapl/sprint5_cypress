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
        ValidaServerest.validarBuscaDeUsuarioPorId(res)
      })
    })

    it('Deve editar os dados do usuário cadastrado', () => {
      Serverest.editarUsuarioCadastrado().then(res => {
        ValidaServerest.validarEdicaoDeUsuario(res)
      })
    })

    
    it('Deve excluir o usuário cadastrado', () => {
      Serverest.excluirUsuarioCadastrado().then(res => {
        ValidaServerest.validarExclusaoDeUsuario(res)
      })
    })
    
    

    /*it('Não deve postar um novo usuário administrador já cadastrado', () => {

    })*/



    /*it('Não deve postar um novo usuário administrador já cadastrado', () => {
      cy.postarUsuarioSemSucesso().then( res => {
        expect(res).to.be.a('object')
        expect(res.body.message).to.be.a('string')
        expect(res.body.message).to.be.eq('Este email já está sendo usado')
      })
    })*/

    it('Deve buscar o usuário de um arquivo json', () => {
      cy.fixture('users.json').then(json => {
        let usuario = {
          email: json.email,
          password: json.password
        }
        Serverest.logar(usuario).then( res => {
          ValidaServerest.validaLoginComSucesso(res)
          Serverest.salvarBearer(res)
        })
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