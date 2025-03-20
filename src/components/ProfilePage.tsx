import React, { useState } from "react";
import Navbar from "./Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { User, Settings, Heart, Clock, LogOut } from "lucide-react";
import ApartmentGrid from "./ApartmentGrid";

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

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile");

  // Sample user data
  const user = {
    name: "Иван Иванов",
    email: "ivan@example.com",
    phone: "+7 (999) 123-45-67",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ivan",
    joinDate: "Март 2022",
  };

  // Sample favorite apartments
  const favoriteApartments: Apartment[] = [
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
  ];

  // Sample viewing history
  const viewingHistory: Apartment[] = [
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
  ];

  const handleApartmentClick = (id: string) => {
    console.log(`Viewing apartment details for ID: ${id}`);
  };

  const handleFavoriteToggle = (id: string) => {
    console.log(`Toggling favorite status for apartment ID: ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar logo="Квартира" isLoggedIn={true} userName={user.name} />

      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <Badge className="mt-2">Пользователь</Badge>
                </div>

                <div className="space-y-2">
                  <Button
                    variant={activeTab === "profile" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="mr-2 h-4 w-4" /> Профиль
                  </Button>
                  <Button
                    variant={activeTab === "favorites" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("favorites")}
                  >
                    <Heart className="mr-2 h-4 w-4" /> Избранное
                  </Button>
                  <Button
                    variant={activeTab === "history" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("history")}
                  >
                    <Clock className="mr-2 h-4 w-4" /> История просмотров
                  </Button>
                  <Button
                    variant={activeTab === "settings" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="mr-2 h-4 w-4" /> Настройки
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-500"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Выйти
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="profile" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6">
                      Личная информация
                    </h2>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Имя
                          </label>
                          <Input id="name" defaultValue={user.name} />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="text-sm font-medium"
                          >
                            Email
                          </label>
                          <Input
                            id="email"
                            type="email"
                            defaultValue={user.email}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label
                            htmlFor="phone"
                            className="text-sm font-medium"
                          >
                            Телефон
                          </label>
                          <Input id="phone" defaultValue={user.phone} />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="join-date"
                            className="text-sm font-medium"
                          >
                            Дата регистрации
                          </label>
                          <Input
                            id="join-date"
                            defaultValue={user.joinDate}
                            disabled
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="bio" className="text-sm font-medium">
                          О себе
                        </label>
                        <Textarea
                          id="bio"
                          placeholder="Расскажите немного о себе..."
                          rows={4}
                        />
                      </div>

                      <Button className="bg-primary text-white hover:bg-primary/90">
                        Сохранить изменения
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="favorites" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6">
                      Избранные квартиры
                    </h2>
                    {favoriteApartments.length > 0 ? (
                      <ApartmentGrid
                        apartments={favoriteApartments}
                        onApartmentClick={handleApartmentClick}
                        onFavoriteToggle={handleFavoriteToggle}
                      />
                    ) : (
                      <div className="text-center py-12">
                        <Heart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-700 mb-2">
                          У вас пока нет избранных квартир
                        </h3>
                        <p className="text-gray-500 mb-4">
                          Добавляйте понравившиеся квартиры в избранное, чтобы
                          не потерять их
                        </p>
                        <Button className="bg-primary text-white hover:bg-primary/90">
                          Найти квартиры
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6">
                      История просмотров
                    </h2>
                    {viewingHistory.length > 0 ? (
                      <ApartmentGrid
                        apartments={viewingHistory}
                        onApartmentClick={handleApartmentClick}
                        onFavoriteToggle={handleFavoriteToggle}
                      />
                    ) : (
                      <div className="text-center py-12">
                        <Clock className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-700 mb-2">
                          История просмотров пуста
                        </h3>
                        <p className="text-gray-500 mb-4">
                          Здесь будут отображаться квартиры, которые вы
                          просматривали
                        </p>
                        <Button className="bg-primary text-white hover:bg-primary/90">
                          Найти квартиры
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6">
                      Настройки аккаунта
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">
                          Изменить пароль
                        </h3>
                        <form className="space-y-4">
                          <div className="space-y-2">
                            <label
                              htmlFor="current-password"
                              className="text-sm font-medium"
                            >
                              Текущий пароль
                            </label>
                            <Input id="current-password" type="password" />
                          </div>
                          <div className="space-y-2">
                            <label
                              htmlFor="new-password"
                              className="text-sm font-medium"
                            >
                              Новый пароль
                            </label>
                            <Input id="new-password" type="password" />
                          </div>
                          <div className="space-y-2">
                            <label
                              htmlFor="confirm-password"
                              className="text-sm font-medium"
                            >
                              Подтвердите пароль
                            </label>
                            <Input id="confirm-password" type="password" />
                          </div>
                          <Button className="bg-primary text-white hover:bg-primary/90">
                            Обновить пароль
                          </Button>
                        </form>
                      </div>

                      <div className="pt-6 border-t border-gray-200">
                        <h3 className="text-lg font-medium mb-4">
                          Уведомления
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Email-уведомления</p>
                              <p className="text-sm text-gray-500">
                                Получать уведомления о новых квартирах по email
                              </p>
                            </div>
                            <Button variant="outline">Включено</Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">SMS-уведомления</p>
                              <p className="text-sm text-gray-500">
                                Получать уведомления о новых квартирах по SMS
                              </p>
                            </div>
                            <Button variant="outline">Выключено</Button>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-gray-200">
                        <h3 className="text-lg font-medium mb-4 text-red-500">
                          Удаление аккаунта
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">
                          После удаления аккаунта все ваши данные будут
                          безвозвратно удалены. Это действие нельзя отменить.
                        </p>
                        <Button variant="destructive">Удалить аккаунт</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold text-gray-900">Квартира</h2>
              <p className="text-sm text-gray-500">
                Найдите идеальную квартиру для жизни
              </p>
            </div>
            <div className="flex space-x-6">
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

export default ProfilePage;
