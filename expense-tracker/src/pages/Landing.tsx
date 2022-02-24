import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import CloseIcon from '../components/icons/Close';
import DollarIcon from '../components/icons/Dollar';
import Item from '../components/Item';
import services from '../services';
import IItem from '../types/item';
import noop from '../utils/noop';

const Landing = () => {
  const [items, setItems] = useState<IItem[]>([]);
  const [poppedUp, setPoppedUp] = useState(false);

  useEffect(() => {
    services.item.read
      .all()
      .then(setItems)
      .catch((e) => {
        if (import.meta.env.DEV) console.error(e);
      });

    return () => {
      setItems([]);
      setPoppedUp(false);
    };
  }, []);

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
          {items.map((item) => (
            <Item
              key={item.id}
              data={item}
              onDelete={() => {
                services.item
                  .delete(item.id)
                  .then(() => {
                    setItems((array) => array.filter((i) => i.id !== item.id));
                  })
                  .catch((exception) => {
                    if (import.meta.env.DEV) console.error(exception);
                  });
              }}
              onUpdate={(data) => {
                services.item
                  .update(item.id, data)
                  .then((o) => {
                    if (o) {
                      setItems((array) =>
                        array.map((i) => (i.id === o.id ? o : i))
                      );
                    }
                  })
                  .catch((exception) => {
                    if (import.meta.env.DEV) console.error(exception);
                  });
              }}
            />
          ))}
        </Items>
      </Main>

      <CreateButton onClick={() => setPoppedUp(true)}>
        <DollarIcon />
      </CreateButton>

      {poppedUp && (
        <CreateItemPopup
          onCancel={() => setPoppedUp(false)}
          onCreate={(item) => {
            setItems((array) => [item, ...array]);
            setPoppedUp(false);
          }}
        />
      )}
    </Container>
  );
};

interface CreateItemPopupProps {
  onCancel?: () => void;
  onCreate?: (data: IItem) => void;
}

// TODO: setup validation
const CreateItemPopup = ({
  onCancel,
  onCreate = noop,
}: CreateItemPopupProps) => {
  const [type, setType] = useState<IItem['type']>('expense');
  const [amount, setAmount] = useState<number | ''>('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: implement something to show error here, too
    if (!type || !amount || !description) return;

    const item = await services.item.create({
      type,
      amount,
      description,
    });

    onCreate(item);
  };

  useEffect(() => {
    return () => {
      setType('expense');
      setAmount('');
      setDescription('');
    };
  }, []);

  return (
    <Modal>
      <ModalContent>
        <CloseButton onClick={onCancel}>
          <CloseIcon />
        </CloseButton>

        <ModalLogo>
          <DollarIcon />
        </ModalLogo>

        <Form onSubmit={handleSubmit} noValidate>
          <TextField
            placeholder="Amount"
            type="number"
            min={0}
            required
            autoFocus
            value={amount}
            onChange={(e) => {
              const value = e.target.valueAsNumber;
              if (!Number.isNaN(value)) setAmount('');
              setAmount(value);
            }}
          />

          <TextField
            type="text"
            placeholder="Description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Select
            required
            value={type}
            onChange={(e) => setType(e.target.value as IItem['type'])}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </Select>

          <Button type="submit">Submit</Button>
        </Form>
      </ModalContent>
    </Modal>
  );
};

const ModalLogo = styled.div`
  width: fit-content;
  margin: 0 auto 2rem;

  svg {
    width: 64px;
    height: 64px;
    fill: #e2e8f0;
  }
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(to right, #f59e0b, #fb923c);
  border: none;
  border-radius: 0.25rem;
  color: #fff;
  cursor: pointer;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
  filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1))
    drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px #fdbb7442;
  }
`;

const Form = styled.form`
  width: 400px;
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem;

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
  border-radius: 0.25rem;
  color: #475569;
  transition: border 300ms ease-in-out, box-shadow 300ms ease-in-out;

  &:hover {
    border: 1px solid #cbd5e1;
  }

  &:focus {
    border: 1px solid #fb923c;
    box-shadow: 0 0 0 2px #ffedd5c5;
    outline: none;
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
    width: 450px;
    height: 95%;
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
