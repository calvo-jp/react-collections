import styled from 'styled-components';
import CloseIcon from '../components/icons/Close';
import DollarIcon from '../components/icons/Dollar';
import Item from '../components/Item';
import IItem from '../types/item';
import noop from '../utils/noop';

const Landing = () => {
  return (
    <Container>
      <Header>
        <Brand>
          <h1>Money-tor</h1>
          <p>Monitor all your expenses and income.</p>
        </Brand>
      </Header>

      <Main>
        <Items>
          <Item
            data={{
              id: 'example-id-1',
              amount: 5000,
              description: 'payment for shoppee',
              createdAt: Date.now(),
              type: 'expense',
            }}
          />

          <Item
            data={{
              id: 'example-id-2',
              amount: 15000,
              description: 'salary',
              createdAt: Date.now(),
              type: 'income',
            }}
          />
        </Items>
      </Main>

      <CreateButton>
        <DollarIcon />
      </CreateButton>

      <CreateItemPopup />
    </Container>
  );
};

interface CreateItemPopupProps {
  onCancel?: () => void;
  onCreate?: (data: IItem) => void;
}

const CreateItemPopup = ({
  onCancel,
  onCreate = noop,
}: CreateItemPopupProps) => {
  return (
    <Modal>
      <ModalContent>
        <CloseButton onClick={onCancel}>
          <CloseIcon />
        </CloseButton>

        <form></form>
      </ModalContent>
    </Modal>
  );
};

const TextField = styled.input``;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  right: 16px;
  top: 16px;
  cursor: pointer;

  svg {
    display: block;
    width: 24px;
    height: 24px;
    stroke: #e2e8f0;
    transition: stroke 300ms ease-in-out;
  }

  &:hover,
  &:focus {
    svg {
      stroke: #cbd5e1;
    }
  }
`;

const ModalContent = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 0.15rem;
  width: 100%;
  height: 100%;

  @media screen and (min-width: 900px) {
    width: 80%;
    height: 80%;
  }
`;

const Modal = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0%;
  top: 0;
  z-index: 99;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CreateButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: linear-gradient(to right, #ea580c, #d97706);
  border: none;
  border-radius: 100%;
  padding: 0.5rem;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  z-index: 9;

  svg {
    width: 32px;
    height: 32px;
    display: block;
    fill: white;
  }
`;

const Items = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Main = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;

  @media screen and (min-width: 600px) {
    padding: 2rem;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  background-color: #f1f5f9;
  color: #334155;
`;

const Header = styled.header`
  background: linear-gradient(to right, #f97316, #f59e0b, #fb7185);
  padding: 2rem 1rem;
  margin: 0;
  text-align: center;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const Brand = styled.div`
  h1,
  p {
    margin: 0;
  }

  h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 3rem;
    font-weight: 900;
    color: #fff;
  }

  p {
    font-size: 1.15rem;
    font-style: italic;
    color: #ffe9d0;
  }
`;

export default Landing;
