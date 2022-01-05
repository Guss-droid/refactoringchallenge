import { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';

import { IFoodDesc } from '../Food';
import { FormHandles } from '@unform/core';

interface IModalAdd {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (food: IFoodDesc) => void;
}

export function ModalAddFood({ handleAddFood, isOpen, setIsOpen }: IModalAdd) {

  const formRef = useRef<FormHandles>(null)

  async function handleSubmit(food: IFoodDesc) {
    handleAddFood(food)
    setIsOpen()
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}