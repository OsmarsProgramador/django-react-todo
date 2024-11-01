//frontend/src/App.js
// Importar o componente do módulo react
import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from 'axios';

// Criar uma classe que estende o componente
class App extends Component {

  // Adicionar um construtor para receber props
  constructor(props) {
    super(props);
    
    // Definir as propriedades no estado inicial
    this.state = {
      // viewCompleted representa o status da tarefa.
      // Define como falso por padrão.
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },

      // Esta lista armazena todas as tarefas
      taskList: []
    };
  }

  // Adicionar o componentDidMount para carregar as tarefas
  componentDidMount() {
    this.refreshList();
  }

  // Atualizar a lista de tarefas usando Axios para requisições HTTP
  refreshList = () => {
    axios
      .get("http://localhost:8000/api/tasks/")
      .then(res => this.setState({ taskList: res.data }))
      .catch(err => console.log(err));
  };

  // Alterar o status de viewCompleted com base no parâmetro
  displayCompleted = status => {
    this.setState({ viewCompleted: status });
  };

  // Renderizar spans para alternar entre tarefas concluídas e incompletas
  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          Concluídas
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incompletas
        </span>
      </div>
    );
  };

  // Renderizar os itens na tela com base no estado
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.taskList.filter(
      (item) => item.completed === viewCompleted
    );

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            onClick={() => this.editItem(item)}
            className="btn btn-secondary mr-2"
          >
            Editar
          </button>
          <button
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger"
          >
            Excluir
          </button>
        </span>
      </li>
    ));
  };

  // Alternar o modal (abrir/fechar)
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  // Enviar um item para a API (novo ou editado)
  handleSubmit = (item) => {
    this.toggle();
    alert("Salvar: " + JSON.stringify(item));

    if (item.id) {
      // Se for uma edição, enviar um PUT
      axios
        .put(`http://localhost:8000/api/tasks/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    // Se for um novo item, enviar um POST
    axios
      .post("http://localhost:8000/api/tasks/", item)
      .then((res) => this.refreshList());
  };

  // Excluir um item
  handleDelete = (item) => {
    alert("Excluir: " + JSON.stringify(item));
    axios
      .delete(`http://localhost:8000/api/tasks/${item.id}/`)
      .then((res) => this.refreshList());
  };

  // Criar um novo item
  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  // Editar um item existente
  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  // Renderizar o conteúdo na tela
  render() {
    return (
      <main className="content">
        <h1 className="text-success text-uppercase text-center my-4">
          Gerenciador de Tarefas
        </h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createItem} className="btn btn-info">
                  Adicionar Tarefa
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default App;
