import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Heart, MapPin } from "lucide-react";

interface ApartmentCardProps {
  id?: string;
  imageUrl?: string;
  title?: string;
  location?: string;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  isFavorite?: boolean;
  onFavoriteToggle?: (id: string) => void;
  onClick?: () => void;
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({
  id = "1",
  imageUrl = "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
  title = "Современная квартира с видом на город",
  location = "Центр города",
  price = 1200,
  bedrooms = 2,
  bathrooms = 1,
  area = 75,
  isFavorite = false,
  onFavoriteToggle = () => {},
  onClick = () => {},
}) => {
  return (
    <Card
      className="w-full max-w-[350px] overflow-hidden transition-all duration-300 hover:shadow-lg bg-white cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <div className="aspect-ratio-[4/3] w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <button
          className="absolute right-3 top-3 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-colors hover:bg-white"
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle(id);
          }}
          aria-label={
            isFavorite ? "Удалить из избранного" : "Добавить в избранное"
          }
        >
          <Heart
            className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`}
          />
        </button>
        <Badge className="absolute bottom-3 left-3 bg-primary text-white">
          ${price.toLocaleString()}/месяц
        </Badge>
      </div>

      <CardContent className="p-4">
        <h3 className="mb-1 text-lg font-semibold line-clamp-1">{title}</h3>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location}</span>
        </div>

        <div className="flex justify-between text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <span className="font-medium">{bedrooms}</span>
            <span>{bedrooms === 1 ? "Спальня" : "Спальни"}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">{bathrooms}</span>
            <span>{bathrooms === 1 ? "Ванная" : "Ванные"}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">{area}</span>
            <span>м²</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t border-gray-100 p-4">
        <button
          className="w-full rounded-md bg-primary py-2 text-center text-sm font-medium text-white transition-colors hover:bg-primary/90"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          Подробнее
        </button>
      </CardFooter>
    </Card>
  );
};

export default ApartmentCard;
