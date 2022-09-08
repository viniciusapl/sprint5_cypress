/// <reference types="cypress" />


import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'


describe('Casos de teste sobre a rota /usuarios da API Serverest', () => {
    it.only('Deve buscar todos os usuários cadastrados', () => {
      Serverest.buscarUsuarios().then( res => {
        cy.contractValidation(res, 'get-usuarios', 200)
        ValidaServerest.validarBuscaDeUsuarios(res)
      })
    })

    it('Não deve postar um novo usuário administrador já cadastrado', () => {
      cy.postarUsuarioSemSucesso().then( res => {
        expect(res).to.be.a('object')
        expect(res.body.message).to.be.a('string')
        expect(res.body.message).to.be.eq('Este email já está sendo usado')
      })
    })

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