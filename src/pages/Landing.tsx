import styled from 'styled-components';
import Item from '../components/Item';

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
            }}
          />
          <Item
            data={{
              id: 'example-id-2',
              amount: 15000,
              description: 'salary',
              createdAt: Date.now(),
              isIncome: true,
            }}
          />
        </Items>
      </Main>

      <CreateButton>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M19 16.166c0-4.289-4.465-5.483-7.887-7.091-2.079-1.079-1.816-3.658 1.162-3.832 1.652-.1 3.351.39 4.886.929l.724-3.295c-1.814-.551-3.437-.803-4.885-.841v-2.036h-2v2.134c-3.89.535-5.968 2.975-5.968 5.7 0 4.876 5.693 5.62 7.556 6.487 2.54 1.136 2.07 3.5-.229 4.021-1.993.451-4.538-.337-6.45-1.079l-.909 3.288c1.787.923 3.931 1.417 6 1.453v1.996h2v-2.105c3.313-.464 6.005-2.293 6-5.729z" />
        </svg>
      </CreateButton>
    </Container>
  );
};

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
