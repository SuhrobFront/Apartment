import React, { useState } from "react";
import Navbar from "./Navbar";
import FilterBar from "./FilterBar";
import ApartmentGrid from "./ApartmentGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface Apartment {
  id: string;
  imageUrl: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  isFavorite: boolean;
}

interface FilterValues {
  priceRange: [number, number];
  bedrooms: string;
  location: string;
}

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterValues>({
    priceRange: [500, 3000],
    bedrooms: "any",
    location: "any",
  });

  // Sample apartment data
  const [apartments, setApartments] = useState<Apartment[]>([
    {
      id: "1",
      imageUrl:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      title: "Современная квартира с видом на город",
      location: "Центр города",
      price: 1200,
      bedrooms: 2,
      bathrooms: 1,
      area: 75,
      isFavorite: false,
    },
    {
      id: "2",
      imageUrl:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      title: "Роскошный пентхаус",
      location: "Район гавани",
      price: 2500,
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      isFavorite: true,
    },
    {
      id: "3",
      imageUrl:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
      title: "Уютная студия",
      location: "Университетский район",
      price: 850,
      bedrooms: 1,
      bathrooms: 1,
      area: 45,
      isFavorite: false,
    },
    {
      id: "4",
      imageUrl:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      title: "Просторная семейная квартира",
      location: "Пригород",
      price: 1800,
      bedrooms: 4,
      bathrooms: 2,
      area: 150,
      isFavorite: false,
    },
    {
      id: "5",
      imageUrl:
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
      title: "Современный лофт с террасой",
      location: "Арт-район",
      price: 1650,
      bedrooms: 2,
      bathrooms: 2,
      area: 95,
      isFavorite: true,
    },
    {
      id: "6",
      imageUrl:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      title: "Элегантный таунхаус",
      location: "Исторический центр",
      price: 2100,
      bedrooms: 3,
      bathrooms: 2.5,
      area: 135,
      isFavorite: false,
    },
  ]);

  // Handle search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real app, this would filter apartments based on the search query
    console.log(`Searching for: ${query}`);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
    // In a real app, this would filter apartments based on the filter values
    console.log("Filters applied:", newFilters);
  };

  // Handle apartment click
  const handleApartmentClick = (id: string) => {
    // In a real app, this would navigate to the apartment details page
    console.log(`Viewing apartment details for ID: ${id}`);
  };

  // Handle favorite toggle
  const handleFavoriteToggle = (id: string) => {
    setApartments((prevApartments) =>
      prevApartments.map((apt) =>
        apt.id === id ? { ...apt, isFavorite: !apt.isFavorite } : apt,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <Navbar logo="Квартира" onSearch={handleSearch} isLoggedIn={false} />

      {/* Filter Bar */}
      <FilterBar onFilterChange={handleFilterChange} />

      {/* Main Content */}
      <main className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Доступные квартиры
          </h1>
          <div className="flex gap-4">
            <Button variant="outline" className="hidden md:flex">
              Показать на карте
            </Button>
            <Tabs defaultValue="grid" className="w-[200px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="grid">Сетка</TabsTrigger>
                <TabsTrigger value="list">Список</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Featured Categories */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Популярные категории</h2>
            <Button variant="link" className="text-primary p-0">
              Смотреть все
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="font-medium mb-2">Новостройки</h3>
              <p className="text-sm text-gray-500">142 объекта</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="font-medium mb-2">С террасой</h3>
              <p className="text-sm text-gray-500">89 объектов</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="font-medium mb-2">С видом на город</h3>
              <p className="text-sm text-gray-500">76 объектов</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="font-medium mb-2">Рядом с метро</h3>
              <p className="text-sm text-gray-500">215 объектов</p>
            </div>
          </div>
        </div>

        {/* Apartment Grid */}
        <ApartmentGrid
          apartments={apartments}
          onApartmentClick={handleApartmentClick}
          onFavoriteToggle={handleFavoriteToggle}
        />

        {/* Call to Action */}
        <div className="mt-12 bg-primary/5 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Не нашли подходящий вариант?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Оставьте заявку, и наши специалисты подберут для вас идеальную
            квартиру по вашим критериям
          </p>
          <Button className="bg-primary text-white hover:bg-primary/90 px-8 py-2">
            Оставить заявку
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Квартира</h2>
              <p className="text-sm text-gray-500 mb-4">
                Найдите идеальную квартиру для жизни
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Компания
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-900">
                    О нас
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-900">
                    Карьера
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-900">
                    Новости
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-900">
                    Контакты
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Услуги
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-900">
                    Аренда
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-900">
                    Покупка
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-900">
                    Продажа
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-900">
                    Оценка
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Поддержка
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-900">
                    Помощь
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-900">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-900">
                    Условия использования
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-900">
                    Политика конфиденциальности
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Квартира. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
