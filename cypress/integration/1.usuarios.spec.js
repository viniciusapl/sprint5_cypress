/// <reference types="cypress" />


import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'


describe('Casos de teste sobre a rota /usuarios da API Serverest', () => {
    it('Deve buscar todos os usuários cadastrados', () => {
      Serverest.buscarUsuarios().then( res => {
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
    
  })