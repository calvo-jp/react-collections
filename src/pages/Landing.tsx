import styled from 'styled-components';
import Item from '../components/Item';

const Landing = () => {
  return (
    <Container>
      <Header>
        <Brand>
          <h1>Money-tor</h1>
          <p>Monitor your expenses and income.</p>
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
    </Container>
  );
};

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
