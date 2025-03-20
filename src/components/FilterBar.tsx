import React, { useState } from "react";
import { Slider } from "./ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Filter, X, ChevronDown } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";

interface FilterBarProps {
  onFilterChange?: (filters: FilterValues) => void;
}

interface FilterValues {
  priceRange: [number, number];
  bedrooms: string;
  location: string;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange = () => {} }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({
    priceRange: [500, 3000],
    bedrooms: "any",
    location: "any",
  });

  const handlePriceChange = (value: number[]) => {
    const newFilters = {
      ...filters,
      priceRange: [value[0], value[1]] as [number, number],
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleBedroomsChange = (value: string) => {
    const newFilters = { ...filters, bedrooms: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleLocationChange = (value: string) => {
    const newFilters = { ...filters, location: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      priceRange: [500, 3000],
      bedrooms: "any",
      location: "any",
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
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
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Цена:</span>
              <span className="text-sm text-gray-500">
                ${filters.priceRange[0]} - ${filters.priceRange[1]}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Спальни:</span>
              <span className="text-sm text-gray-500">
                {filters.bedrooms === "any" ? "Любое" : filters.bedrooms}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Район:</span>
              <span className="text-sm text-gray-500">
                {filters.location === "any" ? "Любой" : filters.location}
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
                    defaultValue={[
                      filters.priceRange[0],
                      filters.priceRange[1],
                    ]}
                    min={0}
                    max={10000}
                    step={100}
                    onValueChange={handlePriceChange}
                    className="my-4"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Спальни</label>
                <Select
                  value={filters.bedrooms}
                  onValueChange={handleBedroomsChange}
                >
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
                <Select
                  value={filters.location}
                  onValueChange={handleLocationChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите район" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Любой</SelectItem>
                    <SelectItem value="downtown">Центр</SelectItem>
                    <SelectItem value="uptown">Верхний город</SelectItem>
                    <SelectItem value="midtown">Средний город</SelectItem>
                    <SelectItem value="west">Западный район</SelectItem>
                    <SelectItem value="east">Восточный район</SelectItem>
                    <SelectItem value="north">Северный район</SelectItem>
                    <SelectItem value="south">Южный район</SelectItem>
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
              <Button className="bg-primary text-white hover:bg-primary/90">
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
