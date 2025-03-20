import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

interface CategoryCardProps {
  id: string;
  title: string;
  imageUrl: string;
  count: number;
  onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  title,
  imageUrl,
  count,
  onClick,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Navigate to floor plans with this category filter
      navigate(`/floor-plans?category=${id}`);
    }
  };

  return (
    <Card
      className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg bg-white h-full"
      onClick={handleClick}
    >
      <div className="relative">
        <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>
        <Badge className="absolute bottom-3 left-3 bg-primary text-white">
          {count} {count === 1 ? "объект" : "объектов"}
        </Badge>
      </div>

      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
