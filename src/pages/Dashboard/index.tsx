import { useEffect, useState } from 'react';

import { Header } from '../../components/Header';
import { Food, IFoodDesc } from '../../components/Food';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';

import { api } from '../../services/api';

import { FoodsContainer } from './styles';

export function Dashboard() {

  const [foods, setFoods] = useState<IFoodDesc[]>([])
  const [editingFood, setEditingFood] = useState<IFoodDesc>({} as IFoodDesc)
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)

  async function handleAddFood(food: IFoodDesc) {
    try{

      const res = await api.post<IFoodDesc>('/foods', {
        ...food,
        available: true
      })

      setFoods((prev) => [...prev, res.data])
    } catch (err) {
      console.log(err)
    }
  }

  async function handleUpdateFood(food: IFoodDesc) {
    try {
      
      const res = await api.put<IFoodDesc>(`/foods/${editingFood.id}`, {
        ...editingFood,
        ...food
      })

      setFoods((prev) => [...prev, res.data])
    } catch (err) {
      console.log(err)
    }
  }

  async function handleDeleteFood(id: number) {
    try {

      await api.delete(`/foods/${id}`)

      setFoods((prev) => prev.filter((food) => food.id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  const toggleModal = () => setModalOpen(!modalOpen)
  const toggleEditModal = () => setEditModalOpen(!editModalOpen)

  async function handleEditFood(food: IFoodDesc) {
    setEditingFood(food)
    setEditModalOpen(true)
  }

  useEffect(() => {

    async function fetchFoods() {
      
      const res = await api.get('/foods')

      setFoods(res.data)
    }

    fetchFoods()
  }, [])

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  )
}
