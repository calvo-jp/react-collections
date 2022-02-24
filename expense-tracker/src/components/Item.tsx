import styled from 'styled-components';
import IItem from '../types/item';
import formatter from '../utils/formatter';
import noop from '../utils/noop';
import DollarArrowDownIcon from './icons/DollarArrowDown';
import DollarArrowUpIcon from './icons/DollarArrowUp';
import TrashIcon from './icons/Trash';

type UpdateInput = Partial<Pick<IItem, 'amount' | 'description' | 'type'>>;

interface ExpenseProps {
  data: IItem;
  onDelete?: () => void;
  onUpdate?: (data: UpdateInput) => void;
}

// TODO: add validation
const Item = ({ data, onUpdate = noop, onDelete = noop }: ExpenseProps) => {
  const isIncome = data.type === 'income';

  return (
    <Container>
      <MainContent>
        <Amount>
          <IconWrapper success={isIncome}>
            {isIncome && <DollarArrowDownIcon />}
            {!isIncome && <DollarArrowUpIcon />}
          </IconWrapper>

          <h4
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
            onBlur={(e) => {
              const value = e.target.textContent;

              if (value) {
                const amount = parseInt(value);

                if (!Number.isNaN(amount) && data.amount !== amount) {
                  onUpdate({ amount });
                }
              }
            }}
          >
            {formatter.currency.format(data.amount)}
          </h4>
        </Amount>

        <Summary spellCheck={false}>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => {
              const description = e.target.textContent;

              if (description && data.description !== description) {
                onUpdate({ description });
              }
            }}
          >
            {data.description}
          </p>

          <small>{formatter.dateTime.format(data.createdAt)}</small>
        </Summary>
      </MainContent>

      <CloseButton onClick={onDelete}>
        <TrashIcon />
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

  p {
    outline: none;
  }
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
    outline: none;
  }

  p {
    font-size: 1.15rem;
    color: #475569;
  }

  small {
    color: #94a3b8;
  }
`;

export default Item;
