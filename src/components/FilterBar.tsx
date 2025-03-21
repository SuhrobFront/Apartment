import React, { useState, useEffect } from "react";
import { Slider } from "./ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import {
  Filter,
  X,
  ChevronDown,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

interface FilterBarProps {
  onFilterChange?: (filters: FilterValues) => void;
  onSearch?: (query: string) => void;
  initialFilters?: {
    priceRange?: [number, number];
    bedrooms?: string;
    location?: string;
  };
}

interface FilterValues {
  priceRange: [number, number];
  bedrooms: string;
  location: string;
}

const FilterBar: React.FC<FilterBarProps> = ({
  onFilterChange = () => {},
  onSearch = () => {},
  initialFilters = {},
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>(
    initialFilters.priceRange || [500, 3000],
  );
  const [bedrooms, setBedrooms] = useState(initialFilters.bedrooms || "any");
  const [location, setLocation] = useState(initialFilters.location || "any");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  // Apply initial filters if provided
  useEffect(() => {
    if (Object.keys(initialFilters).length > 0) {
      applyFilters();
    }
  }, []);

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]] as [number, number]);
  };

  const handleBedroomsChange = (value: string) => {
    setBedrooms(value);
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const applyFilters = () => {
    const newFilters = {
      priceRange,
      bedrooms,
      location,
    };
    onFilterChange(newFilters);
    setIsFilterSheetOpen(false);
    setIsExpanded(false);
  };

  const resetFilters = () => {
    setPriceRange([500, 3000]);
    setBedrooms("any");
    setLocation("any");
    setSearchQuery("");
    onFilterChange({
      priceRange: [500, 3000],
      bedrooms: "any",
      location: "any",
    });
    onSearch("");
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={toggleExpand}
          >
            <Filter size={16} />
            <span>Фильтры</span>
            <ChevronDown
              size={16}
              className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
            />
          </Button>

          <div className="hidden md:flex items-center gap-4">
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex-1 max-w-md"
            >
              <Input
                type="text"
                placeholder="Поиск по адресу или названию..."
                className="pl-10"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Button type="submit" className="sr-only">
                Поиск
              </Button>
            </form>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Цена:</span>
              <span className="text-sm text-gray-500">
                ${priceRange[0]} - ${priceRange[1]}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Спальни:</span>
              <span className="text-sm text-gray-500">
                {bedrooms === "any" ? "Любое" : bedrooms}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Район:</span>
              <span className="text-sm text-gray-500">
                {location === "any" ? "Любой" : location}
              </span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-sm text-gray-500 hover:text-gray-900"
          >
            Сбросить
          </Button>
        </div>

        {/* Mobile search */}
        <div className="md:hidden mt-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Input
              type="text"
              placeholder="Поиск по адресу или названию..."
              className="pl-10"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Button type="submit" className="sr-only">
              Поиск
            </Button>
          </form>
        </div>

        {isExpanded && (
          <div className="mt-4 pb-2">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Тип недвижимости</label>
                <Select defaultValue="apartment">
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Квартира</SelectItem>
                    <SelectItem value="house">Дом</SelectItem>
                    <SelectItem value="townhouse">Таунхаус</SelectItem>
                    <SelectItem value="studio">Студия</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Диапазон цен</label>
                <div className="px-2">
                  <Slider
                    value={[priceRange[0], priceRange[1]]}
                    min={0}
                    max={10000}
                    step={100}
                    onValueChange={handlePriceChange}
                    className="my-4"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Спальни</label>
                <Select value={bedrooms} onValueChange={handleBedroomsChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите количество" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Любое</SelectItem>
                    <SelectItem value="studio">Студия</SelectItem>
                    <SelectItem value="1">1 спальня</SelectItem>
                    <SelectItem value="2">2 спальни</SelectItem>
                    <SelectItem value="3">3 спальни</SelectItem>
                    <SelectItem value="4+">4+ спален</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Район</label>
                <Select value={location} onValueChange={handleLocationChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите район" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Любой</SelectItem>
                    <SelectItem value="center">Центр</SelectItem>
                    <SelectItem value="north">Северный район</SelectItem>
                    <SelectItem value="south">Южный район</SelectItem>
                    <SelectItem value="west">Западный район</SelectItem>
                    <SelectItem value="east">Восточный район</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Площадь (м²)</label>
                <div className="flex items-center gap-2">
                  <Input type="number" placeholder="От" className="w-full" />
                  <span>-</span>
                  <Input type="number" placeholder="До" className="w-full" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Ванные комнаты</label>
                <Select defaultValue="any">
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите количество" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Любое</SelectItem>
                    <SelectItem value="1">1 ванная</SelectItem>
                    <SelectItem value="2">2 ванные</SelectItem>
                    <SelectItem value="3+">3+ ванных</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Этаж</label>
                <div className="flex items-center gap-2">
                  <Input type="number" placeholder="От" className="w-full" />
                  <span>-</span>
                  <Input type="number" placeholder="До" className="w-full" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Год постройки</label>
                <div className="flex items-center gap-2">
                  <Input type="number" placeholder="От" className="w-full" />
                  <span>-</span>
                  <Input type="number" placeholder="До" className="w-full" />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-medium mb-3">
                Дополнительные удобства
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="balcony" />
                  <label htmlFor="balcony" className="text-sm">
                    Балкон
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="parking" />
                  <label htmlFor="parking" className="text-sm">
                    Парковка
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="elevator" />
                  <label htmlFor="elevator" className="text-sm">
                    Лифт
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="ac" />
                  <label htmlFor="ac" className="text-sm">
                    Кондиционер
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="gym" />
                  <label htmlFor="gym" className="text-sm">
                    Спортзал
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="pool" />
                  <label htmlFor="pool" className="text-sm">
                    Бассейн
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="security" />
                  <label htmlFor="security" className="text-sm">
                    Охрана
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="furnished" />
                  <label htmlFor="furnished" className="text-sm">
                    Мебель
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button
                className="bg-primary text-white hover:bg-primary/90"
                onClick={applyFilters}
              >
                Применить фильтры
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
