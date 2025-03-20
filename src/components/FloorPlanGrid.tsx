import React from "react";
import FloorPlanCard from "./FloorPlanCard";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

interface FloorPlan {
  id: string;
  imageUrl: string;
  title: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
}

interface FloorPlanGridProps {
  floorPlans?: FloorPlan[];
  isLoading?: boolean;
  onFloorPlanClick?: (id: string) => void;
}

const FloorPlanGrid: React.FC<FloorPlanGridProps> = ({
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
    },
    {
      id: "4",
      imageUrl:
        "https://images.unsplash.com/photo-1560185008-b033106af5c3?w=800&q=80",
      title: "Трехкомнатная",
      area: 95,
      bedrooms: 3,
      bathrooms: 2,
      price: 1500,
    },
    {
      id: "5",
      imageUrl:
        "https://images.unsplash.com/photo-1560184990-4a5229fef9c7?w=800&q=80",
      title: "Четырехкомнатная",
      area: 120,
      bedrooms: 4,
      bathrooms: 2,
      price: 1800,
    },
    {
      id: "6",
      imageUrl:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
      title: "Пентхаус",
      area: 150,
      bedrooms: 3,
      bathrooms: 2,
      price: 2500,
    },
  ],
  isLoading = false,
  onFloorPlanClick = () => {},
}) => {
  if (isLoading) {
    return (
      <div className="w-full bg-gray-50 p-4 md:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="h-[300px] w-full animate-pulse rounded-lg bg-gray-200"
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {floorPlans.map((floorPlan) => (
            <div key={floorPlan.id} className="h-full">
              <FloorPlanCard
                id={floorPlan.id}
                imageUrl={floorPlan.imageUrl}
                title={floorPlan.title}
                area={floorPlan.area}
                bedrooms={floorPlan.bedrooms}
                bathrooms={floorPlan.bathrooms}
                price={floorPlan.price}
                onClick={() => onFloorPlanClick(floorPlan.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FloorPlanGrid;
