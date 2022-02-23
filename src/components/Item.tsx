import styled from 'styled-components';
import IItem from '../types/item';
import formatter from '../utils/formatter';
import CloseIcon from './icons/Close';
import DollarArrowDownIcon from './icons/DollarArrowDown';
import DollarArrowUpIcon from './icons/DollarArrowUp';

interface ExpenseProps {
  data: IItem;
  onDelete?: () => void;
  onUpdate?: () => void;
}

const Item = ({ data, onUpdate = noop, onDelete = noop }: ExpenseProps) => {
  return (
    <Container>
      <MainContent>
        <Amount>
          <IconWrapper success={data.isIncome}>
            {data.isIncome && <DollarArrowDownIcon />}
            {!data.isIncome && <DollarArrowUpIcon />}
          </IconWrapper>

          <h4>{formatter.currency.format(data.amount)}</h4>
        </Amount>

        <Summary>
          <p>{data.description}</p>
          <small>{formatter.dateTime.format(data.createdAt)}</small>
        </Summary>
      </MainContent>

      <CloseButton onClick={onDelete}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z" />
        </svg>
      </CloseButton>
    </Container>
  );
};

const MainContent = styled.div`
  flex-grow: 1;

  @media screen and (min-width: 600px) {
    display: flex;
    gap: 1rem;
  }
`;

const Amount = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

interface IconWrapperProps {
  success?: boolean;
}

const IconWrapper = styled.div<IconWrapperProps>`
  svg {
    width: 24px;
    height: 24px;
    fill: ${(props) => (props.success ? '#10B981' : '#FB7185')};
  }
`;

const Summary = styled.div`
  flex-grow: 1;
`;

const CloseButton = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
    fill: #cbd5e1;
    transition: fill 300ms ease-in-out;
  }

  &:hover,
  &:focus {
    svg {
      fill: #94a3b8;
    }
  }
`;

const Container = styled.div`
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.15rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;

  h4,
  p {
    margin: 0;
  }

  h4 {
    font-size: 2.4rem;
    font-weight: 300;
  }

  p {
    font-size: 1.15rem;
    color: #475569;
  }

  small {
    color: #94a3b8;
  }
`;

function noop() {}

export default Item;
