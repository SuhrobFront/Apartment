import React from "react";
import { Button } from "./ui/button";
import { Search, Heart, Bed, Bath, Square, MapPin } from "lucide-react";
import { Badge } from "./ui/badge";

interface FloorPlan {
  id: string;
  imageUrl: string;
  title: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  location?: string;
}

interface FloorPlanListProps {
  floorPlans?: FloorPlan[];
  isLoading?: boolean;
  onFloorPlanClick?: (id: string) => void;
}

const FloorPlanList: React.FC<FloorPlanListProps> = ({
  floorPlans = [
    {
      id: "1",
      imageUrl:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      title: "Студия",
      area: 45,
      bedrooms: 1,
      bathrooms: 1,
      price: 850,
      location: "Центр города",
    },
    {
      id: "2",
      imageUrl:
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80",
      title: "Однокомнатная",
      area: 60,
      bedrooms: 1,
      bathrooms: 1,
      price: 1000,
      location: "Северный район",
    },
    {
      id: "3",
      imageUrl:
        "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80",
      title: "Двухкомнатная",
      area: 75,
      bedrooms: 2,
      bathrooms: 1,
      price: 1200,
      location: "Западный район",
    },
  ],
  isLoading = false,
  onFloorPlanClick = () => {},
}) => {
  const [favorites, setFavorites] = React.useState<string[]>([]);

  React.useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]",
    );
    setFavorites(savedFavorites);
  }, []);

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();

    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]",
    );
    let newFavorites;

    if (favorites.includes(id)) {
      newFavorites = savedFavorites.filter((favId: string) => favId !== id);
    } else {
      newFavorites = [...savedFavorites, id];
    }

    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  if (isLoading) {
    return (
      <div className="w-full bg-gray-50 p-4 md:p-6">
        <div className="flex flex-col space-y-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="h-[120px] w-full animate-pulse rounded-lg bg-gray-200"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 p-4 md:p-6">
      {floorPlans.length === 0 ? (
        <div className="flex h-[400px] w-full flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center">
          <Search size={48} className="text-gray-300 mb-4" />
          <h3 className="mb-2 text-xl font-medium text-gray-700">
            Планировки не найдены
          </h3>
          <p className="text-gray-500 mb-6">
            Попробуйте изменить параметры поиска
          </p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Сбросить фильтры
          </Button>
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          {floorPlans.map((floorPlan) => (
            <div
              key={floorPlan.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200"
              onClick={() => onFloorPlanClick(floorPlan.id)}
            >
              <div className="flex flex-col md:flex-row">
                <div className="relative md:w-1/4">
                  <div className="aspect-w-4 aspect-h-3 w-full h-full">
                    <img
                      src={floorPlan.imageUrl}
                      alt={floorPlan.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <Badge className="absolute bottom-3 left-3 bg-primary text-white">
                    {floorPlan.area} м²
                  </Badge>
                  <Button
                    variant="outline"
                    size="icon"
                    className={`absolute top-3 right-3 rounded-full bg-white/80 hover:bg-white ${favorites.includes(floorPlan.id) ? "text-red-500 hover:text-red-600" : "text-gray-400 hover:text-gray-600"}`}
                    onClick={(e) => toggleFavorite(e, floorPlan.id)}
                  >
                    <Heart
                      className={
                        favorites.includes(floorPlan.id) ? "fill-red-500" : ""
                      }
                      size={18}
                    />
                  </Button>
                </div>

                <div className="p-4 flex flex-col justify-between md:w-3/4">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold line-clamp-1">
                        {floorPlan.title}
                      </h3>
                      <div className="text-primary font-semibold text-lg">
                        ${floorPlan.price.toLocaleString()}/месяц
                      </div>
                    </div>

                    {floorPlan.location && (
                      <div className="flex items-center gap-1 text-gray-600 mt-1 mb-2">
                        <MapPin size={14} />
                        <span className="text-sm">{floorPlan.location}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-700 mt-3">
                      <div className="flex items-center gap-1">
                        <Square size={16} className="text-gray-500" />
                        <span>{floorPlan.area} м²</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bed size={16} className="text-gray-500" />
                        <span>{floorPlan.bedrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath size={16} className="text-gray-500" />
                        <span>{floorPlan.bathrooms}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onFloorPlanClick(floorPlan.id)}
                    >
                      Подробнее
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FloorPlanList;
