//frontend/src/components/Modal.js
import React, { Component } from "react";

// Importando todas as classes necessárias do módulo reactstrap
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

// Criando um componente baseado em classe
class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem
    };
  }

  // Manipulador de mudanças para verificar se uma checkbox está marcada ou não
  handleChange = e => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };

  // Renderizando o modal dentro da classe CustomModal, recebendo "toggle" e "onSave" como props
  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Tarefa </ModalHeader>
        <ModalBody>
          <Form>
            {/* 1º Grupo de Formulário: Campo de Título */}
            <FormGroup>
              <Label for="title">Título</Label>
              <Input
                type="text"
                name="title"
                value={this.state.activeItem.title}
                onChange={this.handleChange}
                placeholder="Digite o Título da Tarefa"
              />
            </FormGroup>

            {/* 2º Grupo de Formulário: Campo de Descrição */}
            <FormGroup>
              <Label for="description">Descrição</Label>
              <Input
                type="text"
                name="description"
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                placeholder="Digite a Descrição da Tarefa"
              />
            </FormGroup>

            {/* 3º Grupo de Formulário: Checkbox de Concluído */}
            <FormGroup check>
              <Label for="completed">
                <Input
                  type="checkbox"
                  name="completed"
                  checked={this.state.activeItem.completed}
                  onChange={this.handleChange}
                />
                Concluído
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        
        {/* Rodapé do Modal */}
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Salvar
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default CustomModal;
