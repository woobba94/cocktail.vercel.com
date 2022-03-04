import Item from './Item';

interface ResultBoxProps {
  name: string;
}

const ResultBox = ({ name }: ResultBoxProps) => {
  return (
    <div>
      {name}
      <Item />
      <Item />
      <Item />
    </div>
  );
};
export default ResultBox;
