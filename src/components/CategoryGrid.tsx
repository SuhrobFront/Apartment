import React from "react";
import { useNavigate } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import { Button } from "./ui/button";

interface Category {
  id: string;
  title: string;
  imageUrl: string;
  count: number;
}

interface CategoryGridProps {
  categories: Category[];
  title?: string;
  showViewAll?: boolean;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  title = "Популярные категории",
  showViewAll = true,
}) => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/floor-plans?category=${categoryId}`);
  };

  const handleViewAll = () => {
    navigate("/floor-plans");
  };

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {showViewAll && (
          <Button variant="outline" onClick={handleViewAll}>
            Показать все
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            id={category.id}
            title={category.title}
            imageUrl={category.imageUrl}
            count={category.count}
            onClick={() => handleCategoryClick(category.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
