# language: pt
Funcionalidade: Realizar um pedido estando autenticado como cliente

    Contexto: Me cadastrar
      Quando Eu estou na tela Principal
      Então clico no botão "Login" na Dashboard
      Quando Eu estou na tela de Login
      Então Eu clico no link de "Registre-se"
        E Eu preencho os dados requisitados
      Quando Clico no botão de "Cadastre-se"
        E é exibida uma mensagemm de confirmação
        E eu já estou autenticado

    Contexto: Adicionar items ao carrinho e confirmar para pedido os mesmos
      Quando Eu estou na tela homepage
      Então eu clico em "Adicionar" em um card de produto
        E é exibida uma mensagem de confirmação
      Quando Clico no icone de carrinho contido na header
        E é exibido a tela de carrinho na tela
      Então eu clico no botão de "Confirmar"

    Contexto: Realizar um pedido
      Dado que os items do carrinho foram confirmados
        E eu já estou autenticado
      Quando estou na etapa de Endereço
      Então eu escolho o endereço a ser usado
      Quando clico no botão "Próximo"
      Então eu deveria ser jogado para etapa de pagamento
      Quando estou na etapa de pagamento
      Então preencho o formulário de pagamento
      Quando clico no botão "Próximo"


    Contexto: Acompanhar pedido
Funcionalidade: Realizar operações de criar, alterar, deletar e ler estando autenticado como administrador
  Contexto: Como administrador gostaria de criar produtos
    Quando eu estou na tela principal
    Então eu clico no link de "Dashboard"
      Quando Eu estou na tela de Dashboard
        Então eu clico no link de "Criar produto"
        E eu preencho os dados requisitados
        Então eu clico no link "Adicionar produto" 
          E é exibido mensagem de confirmação da criação

  Contexto: Como administrador gostaria de deletar produtos
    Quando eu estou na tela principal
    Então eu clico no link de "Dashboard"
      Quando Eu estou na tela de Dashboard
        Então eu clico no link de "Deletar produto"
        E eu clico em "Deletar" do produto em questão que deseja deletar
          E é exibido mensagem de confirmação da deletação


  Contexto: Como administrador gostaria de alterar produtos
    Quando eu estou na tela principal
    Então eu clico no link de "Dashboard"
      Quando Eu estou na tela de Dashboard
        Então eu clico no link de "Atualizar produto"
        E eu clico em "Atualizar" do produto em questão que deseja atualizar
          E é exibido mensagem de confirmação da alteração

  Contexto: Como administrador gostaria de ler produtos
    Quando eu estou na tela principal
    Então eu clico no link de "Dashboard"
      Quando Eu estou na tela de Dashboard
       Então eu clico no link de "Atualizar produto"
       E eu clico em "Mostrar mais" do produto em questão que deseja ler

  Contexto: Como administrador gostaria de cancelar entrega
    Quando eu estou na tela principal
    Então eu clico no link de "Dashboard"
      Quando Eu estou na tela de Dashboard
        Então eu clico no link de "Listar pedidos"
        E eu clico em "Mostrar mais" do produto em questão que deseja cancelar
          Então altero o status do pedido para "Pedido Cancelado"
            E é exibido mensagem de confirmação da cancelação

  Contexto: Como administrador gostaria de alterar status da entrega
    Quando eu estou na tela principal
    Então eu clico no link de "Dashboard"
      Quando Eu estou na tela de Dashboard
        Então eu clico no link de "Listar pedidos"
        E eu clico em "Mostrar mais" da entrega em questão que deseja cancelar
          Então altero o status da entrega para o seu status novo alterado.
            E é exibido mensagem de confirmação da alteração de status

  Contexto: Como administrador gostaria de ler entrega
    Quando eu estou na tela principal
    Então eu clico no link de "Dashboard"
      Quando Eu estou na tela de Dashboard
        Então eu clico no link de "Listar pedidos"
        E eu clico em "Mostrar mais" da entrega em questão que deseja ler



Feature: Image Registration

  Scenario: Submitting an image with invalid inputs
    Given I am on the image registration page
    When I enter "" in the title field
    Then I enter "" in the URL field
    Then I click the submit button
    Then I should see "Please type a title for the image" message above the title field
    And I should see "Please type a valid URL" message above the imageUrl field
    And I should see an exclamation icon in the title and URL fields

  Scenario: Submitting an image with valid inputs using enter key
    Given I am on the image registration page
    When I enter "Alien BR" in the title field
    Then I should see a check icon in the title field
    When I enter "https://cdn.mos.cms.futurecdn.net/eM9EvWyDxXcnQTTyH8c8p5-1200-80.jpg" in the URL field
    Then I should see a check icon in the imageUrl field
    Then I can hit enter to submit the form
    And the list of registered images should be updated with the new item
    And the new item should be stored in the localStorage
    Then The inputs should be cleared

  Scenario: Submitting an image and updating the list
    Given I am on the image registration page
    Then I have entered "BR Alien" in the title field
    Then I have entered "https://cdn.mos.cms.futurecdn.net/eM9EvWyDxXcnQTTyH8c8p5-1200-80.jpg" in the URL field
    When I click the submit button
    And the list of registered images should be updated with the new item
    And the new item should be stored in the localStorage
    Then The inputs should be cleared

  Scenario: Refreshing the page after submitting an image clicking in the submit button
    Given I am on the image registration page
    Then I have submitted an image by clicking the submit button
    When I refresh the page
    Then I should still see the submitted image in the list of registered images