import { CATEGORY } from '../constants';

interface CategoryProps {
  ingredients: string[];
}

const Category = ({ ingredients }: CategoryProps) => {
  const alcoholTab = [];
  const otherTab = [];

  ingredients?.forEach((ingredient: string) => {
    CATEGORY.forEach((liquor) => {
      if (ingredient.toLowerCase().indexOf(liquor) > 0) {
        alcoholTab.push(ingredient);
      } else {
        otherTab.push(ingredient);
      }
    });
  });
  return (
    <div>
      <div>Tab1</div>
      <div>Tab2</div>
    </div>
  );
};

export default Category;
