import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import CloseIcon from '../components/icons/Close';
import DollarIcon from '../components/icons/Dollar';
import Item from '../components/Item';
import IItem from '../types/item';
import noop from '../utils/noop';

const Landing = () => {
  const [open, setOpen] = useState(false);

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

      <CreateButton onClick={() => setOpen(true)}>
        <DollarIcon />
      </CreateButton>

      {open && (
        <CreateItemPopup
          onCancel={() => setOpen(false)}
          onCreate={() => setOpen(false)}
        />
      )}
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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Modal>
      <ModalContent>
        <CloseButton onClick={onCancel}>
          <CloseIcon />
        </CloseButton>

        <Form onSubmit={handleSubmit} noValidate>
          <TextField
            placeholder="Amount"
            type="number"
            min={0}
            required
            autoFocus
            name="amount"
          />

          <TextField
            type="text"
            placeholder="Description"
            name="description"
            required
          />

          <Select required name="type">
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </Select>

          <Button type="submit">Submit</Button>
        </Form>
      </ModalContent>
    </Modal>
  );
};

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(to right, #f59e0b, #fb923c);
  border: none;
  border-radius: 0.25rem;
  color: #fff;
  cursor: pointer;
  outline: none;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;

  &:focus {
    box-shadow: 0 0 0 3px #fdbb7442;
  }
`;

const Form = styled.form`
  padding: 1rem;
  width: 400px;
  max-width: 80%;
  margin: 0 auto;

  *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const formControlBaseStyle = css`
  border: 1px solid #e2e8f0;
  background-color: transparent;
  padding: 0.75rem;
  display: block;
  width: 100%;
  outline: none;
  border-radius: 0.25rem;
  color: #475569;
  transition: border 300ms ease-in-out, box-shadow 300ms ease-in-out;

  &:hover {
    border: 1px solid #cbd5e1;
  }

  &:focus {
    border: 1px solid #fb923c;
    box-shadow: 0 0 0 2px #ffedd5c5;
  }
`;

const TextField = styled.input`
  ${formControlBaseStyle}

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type='number'] {
    -moz-appearance: textfield;
  }

  &::placeholder {
    opacity: 1;
  }
`;

const Select = styled.select`
  ${formControlBaseStyle}

  -webkit-appearance: none;
  -moz-appearance: none;
`;

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
  display: flex;
  flex-direction: column;
  justify-content: center;

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
