import React from "react";
import { ArrowLeft, Heart, Share2, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface ApartmentDetailProps {
  id?: string;
  title?: string;
  location?: string;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  description?: string;
  features?: string[];
  images?: string[];
  floorPlan?: string;
  isFavorite?: boolean;
  onBack?: () => void;
  onFavoriteToggle?: (id: string) => void;
}

const ApartmentDetail: React.FC<ApartmentDetailProps> = ({
  id = "1",
  title = "Современная квартира с видом на город",
  location = "Центр города",
  price = 1200,
  bedrooms = 2,
  bathrooms = 1,
  area = 75,
  description = "Просторная современная квартира с панорамными окнами и прекрасным видом на город. Полностью меблирована и оборудована всей необходимой техникой. Расположена в тихом районе с развитой инфраструктурой.",
  features = [
    "Кондиционер",
    "Балкон",
    "Встроенная кухня",
    "Лифт",
    "Парковка",
    "Охрана",
  ],
  images = [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
  ],
  floorPlan = "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=800&q=80",
  isFavorite = false,
  onBack = () => {},
  onFavoriteToggle = () => {},
}) => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold truncate max-w-[60%]">
            {title}
          </h1>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => onFavoriteToggle(id)}
            >
              <Heart
                className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`}
              />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="aspect-ratio-[4/3] overflow-hidden rounded-lg">
            <img
              src={images[0]}
              alt={title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {images.slice(1, 3).map((image, index) => (
              <div
                key={index}
                className="aspect-ratio-[4/3] overflow-hidden rounded-lg"
              >
                <img
                  src={image}
                  alt={`${title} - ${index + 2}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Apartment Info */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <div className="flex items-center text-gray-500 mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{location}</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <Badge className="text-lg py-2 px-4 bg-primary text-white">
              ${price.toLocaleString()}/месяц
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8 border-y border-gray-200 py-6">
          <div className="text-center">
            <p className="text-gray-500 text-sm">Спальни</p>
            <p className="font-semibold text-lg">{bedrooms}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-sm">Ванные</p>
            <p className="font-semibold text-lg">{bathrooms}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-sm">Площадь</p>
            <p className="font-semibold text-lg">{area} м²</p>
          </div>
        </div>

        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start mb-6">
            <TabsTrigger value="description">Описание</TabsTrigger>
            <TabsTrigger value="features">Особенности</TabsTrigger>
            <TabsTrigger value="floorplan">Планировка</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-0">
            <h3 className="text-xl font-semibold mb-4">О квартире</h3>
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </TabsContent>

          <TabsContent value="features" className="mt-0">
            <h3 className="text-xl font-semibold mb-4">
              Особенности и удобства
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="floorplan" className="mt-0">
            <h3 className="text-xl font-semibold mb-4">Планировка квартиры</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <img
                src={floorPlan}
                alt="Floor Plan"
                className="w-full h-auto max-h-[400px] object-contain"
              />
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <span className="font-medium mr-2">Общая площадь:</span>
              <span>{area} м²</span>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 py-6 border-t border-gray-200">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">
            Заинтересовались этой квартирой?
          </h3>
          <Button className="w-full bg-primary text-white hover:bg-primary/90">
            Связаться с владельцем
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApartmentDetail;
