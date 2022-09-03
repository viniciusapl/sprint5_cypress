/// <reference types="cypress" />

//const cypress = require("cypress")// ------> essa linha estava causando um erro ao executar o cypress, por isso comentei ela


describe('Casos de teste sobre a rota /usuarios da API Serverest', () => {
    it('Deve buscar todos os usuários cadastrados', () => {
      cy.request('/usuarios').then( res => {
        expect(res).to.be.a('object')
        expect(res.body.quantidade).to.be.a('number')
        expect(res.body.quantidade).to.be.greaterThan(0)
      } )
    })

    it('Não deve postar um novo usuário administrador já cadastrado', () => {
      cy.postarUsuarioSemSucesso().then( res => {
        expect(res).to.be.a('object')
        expect(res.body.message).to.be.a('string')
        expect(res.body.message).to.be.eq('Este email já está sendo usado')
      })
    })

/*    it('Deve validar o comando personalizado', () => {
      cy.rest('GET', '/usuarios').then( res => {
        expect(res).to.be.a('object')
        cy.log(JSON.stringify(res))
      })
    })*/

    it('Deve realizar o login corretamente', () => {
      cy.buscarUsuarioParaLogin().then( usuario => {
        cy.logar(usuario.email, usuario.password).then( res => {
          expect(res).to.be.a('object')
          expect(res.body.message).to.be.a('string')
          expect(res.body).haveOwnProperty('authorization')
        })
      })
    })
  })