import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import FilterBar from "./FilterBar";
import FloorPlanGrid from "./FloorPlanGrid";
import FloorPlanList from "./FloorPlanList";
import ViewToggle from "./ViewToggle";

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

interface FilterValues {
  priceRange: [number, number];
  bedrooms: string;
  location: string;
}

const FloorPlansPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterValues>({
    priceRange: [500, 3000],
    bedrooms: "any",
    location: "any",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Sample floor plan data
  const [floorPlans, setFloorPlans] = useState<FloorPlan[]>([
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
    {
      id: "4",
      imageUrl:
        "https://images.unsplash.com/photo-1560185008-b033106af5c3?w=800&q=80",
      title: "Трехкомнатная",
      area: 95,
      bedrooms: 3,
      bathrooms: 2,
      price: 1500,
      location: "Северный район",
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
      location: "Южный район",
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
      location: "Центр города",
    },
  ]);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);

    // Simulate search filtering
    setTimeout(() => {
      if (query.trim() === "") {
        setFloorPlans([
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
          {
            id: "4",
            imageUrl:
              "https://images.unsplash.com/photo-1560185008-b033106af5c3?w=800&q=80",
            title: "Трехкомнатная",
            area: 95,
            bedrooms: 3,
            bathrooms: 2,
            price: 1500,
            location: "Северный район",
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
            location: "Южный район",
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
            location: "Центр города",
          },
        ]);
      } else {
        // Filter by search query (case insensitive)
        const filtered = floorPlans.filter(
          (plan) =>
            plan.title.toLowerCase().includes(query.toLowerCase()) ||
            (plan.location &&
              plan.location.toLowerCase().includes(query.toLowerCase())),
        );
        setFloorPlans(filtered);
      }
      setIsLoading(false);
    }, 500);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
    setIsLoading(true);

    // Simulate filter application
    setTimeout(() => {
      // Apply price filter
      const [minPrice, maxPrice] = newFilters.priceRange;

      // Apply bedroom filter
      let filteredPlans = [
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
        {
          id: "4",
          imageUrl:
            "https://images.unsplash.com/photo-1560185008-b033106af5c3?w=800&q=80",
          title: "Трехкомнатная",
          area: 95,
          bedrooms: 3,
          bathrooms: 2,
          price: 1500,
          location: "Северный район",
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
          location: "Южный район",
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
          location: "Центр города",
        },
      ].filter((plan) => plan.price >= minPrice && plan.price <= maxPrice);

      // Apply bedroom filter if not "any"
      if (newFilters.bedrooms !== "any") {
        const bedroomCount = parseInt(newFilters.bedrooms);
        filteredPlans = filteredPlans.filter(
          (plan) => plan.bedrooms === bedroomCount,
        );
      }

      // Apply location filter if not "any" (in a real app, this would filter by location)
      if (newFilters.location !== "any") {
        // This is just a simulation - in a real app you'd filter by actual location data
        if (newFilters.location === "center") {
          filteredPlans = filteredPlans.filter(
            (plan) => plan.location === "Центр города",
          );
        } else if (newFilters.location === "north") {
          filteredPlans = filteredPlans.filter(
            (plan) => plan.location === "Северный район",
          );
        } else if (newFilters.location === "south") {
          filteredPlans = filteredPlans.filter(
            (plan) => plan.location === "Южный район",
          );
        } else if (newFilters.location === "west") {
          filteredPlans = filteredPlans.filter(
            (plan) => plan.location === "Западный район",
          );
        }
      }

      // Apply search query if exists
      if (searchQuery.trim() !== "") {
        filteredPlans = filteredPlans.filter(
          (plan) =>
            plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (plan.location &&
              plan.location.toLowerCase().includes(searchQuery.toLowerCase())),
        );
      }

      setFloorPlans(filteredPlans);
      setIsLoading(false);
    }, 800);
  };

  // Handle floor plan click
  const handleFloorPlanClick = (id: string) => {
    navigate(`/apartments/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation Bar */}
      <Navbar logo="Квартира" onSearch={handleSearch} isLoggedIn={false} />

      {/* Filter Bar */}
      <FilterBar onFilterChange={handleFilterChange} />

      {/* Main Content */}
      <main className="container mx-auto py-6 px-4 flex-grow">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Доступные планировки
          </h1>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <p className="text-gray-500">
              {isLoading
                ? "Загрузка..."
                : `${floorPlans.length} ${floorPlans.length === 1 ? "объект" : "объектов"}`}
            </p>
            <ViewToggle currentView={viewMode} onViewChange={setViewMode} />
          </div>
        </div>

        {/* Floor Plan View (Grid or List) */}
        {viewMode === "grid" ? (
          <FloorPlanGrid
            floorPlans={floorPlans}
            isLoading={isLoading}
            onFloorPlanClick={handleFloorPlanClick}
          />
        ) : (
          <FloorPlanList
            floorPlans={floorPlans}
            isLoading={isLoading}
            onFloorPlanClick={handleFloorPlanClick}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold text-gray-900">Квартира</h2>
              <p className="text-sm text-gray-500">
                Найдите идеальную квартиру
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <a href="#" className="text-gray-500 hover:text-gray-900">
                О нас
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900">
                Контакты
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900">
                Условия
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900">
                Конфиденциальность
              </a>
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Квартира. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FloorPlansPage;
