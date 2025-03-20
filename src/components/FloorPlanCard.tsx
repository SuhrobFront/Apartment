import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Heart, Bed, Bath, Square } from "lucide-react";

interface FloorPlanCardProps {
  id?: string;
  imageUrl?: string;
  title?: string;
  area?: number;
  bedrooms?: number;
  bathrooms?: number;
  price?: number;
  onClick?: () => void;
}

const FloorPlanCard: React.FC<FloorPlanCardProps> = ({
  id = "1",
  imageUrl = "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=800&q=80",
  title = "Стандартная планировка",
  area = 75,
  bedrooms = 2,
  bathrooms = 1,
  price = 1200,
  onClick = () => {},
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if this apartment is in favorites when component mounts
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(id));
  }, [id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event

    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (isFavorite) {
      // Remove from favorites
      const newFavorites = favorites.filter((fav: string) => fav !== id);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    } else {
      // Add to favorites
      favorites.push(id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    setIsFavorite(!isFavorite);
  };

  return (
    <Card
      className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg bg-white cursor-pointer h-full flex flex-col"
      onClick={onClick}
    >
      <div className="relative">
        <div className="aspect-w-4 aspect-h-3 w-full overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>
        <Badge className="absolute bottom-3 left-3 bg-primary text-white">
          {area} м²
        </Badge>
        <Button
          variant="outline"
          size="icon"
          className={`absolute top-3 right-3 rounded-full bg-white/80 hover:bg-white ${isFavorite ? "text-red-500 hover:text-red-600" : "text-gray-400 hover:text-gray-600"}`}
          onClick={toggleFavorite}
        >
          <Heart className={isFavorite ? "fill-red-500" : ""} size={18} />
        </Button>
      </div>

      <CardContent className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="mb-2 text-lg font-semibold line-clamp-1">{title}</h3>

          <div className="grid grid-cols-3 gap-2 text-sm text-gray-700 mb-3">
            <div className="flex items-center gap-1">
              <Square size={16} className="text-gray-500" />
              <span>{area} м²</span>
            </div>
            <div className="flex items-center gap-1">
              <Bed size={16} className="text-gray-500" />
              <span>{bedrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath size={16} className="text-gray-500" />
              <span>{bathrooms}</span>
            </div>
          </div>
        </div>

        <div className="text-primary font-semibold text-lg">
          ${price.toLocaleString()}/месяц
        </div>
      </CardContent>
    </Card>
  );
};

export default FloorPlanCard;
