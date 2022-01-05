import Logo from '../../assets/logo.svg';
import { FiPlusSquare } from 'react-icons/fi';

import { Container } from './styles';

interface IOpenModal {
  openModal: () => void
}

export function Header({ openModal }: IOpenModal) {
  return (
    <Container>
      <header>
        <img src={Logo} alt="GoRestaurant" />
        <nav>
          <div>
            <button
              type="button"
              onClick={openModal}
            >
              <div className="text">Novo Prato</div>
              <div className="icon">
                <FiPlusSquare size={24} />
              </div>
            </button>
          </div>
        </nav>
      </header>
    </Container>
  )
}