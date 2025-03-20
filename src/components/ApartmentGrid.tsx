import React, { useState, useEffect } from "react";
import ApartmentCard from "./ApartmentCard";

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

interface ApartmentGridProps {
  apartments?: Apartment[];
  isLoading?: boolean;
  onApartmentClick?: (id: string) => void;
  onFavoriteToggle?: (id: string) => void;
}

const ApartmentGrid: React.FC<ApartmentGridProps> = ({
  apartments = [
    {
      id: "1",
      imageUrl:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      title: "Modern Apartment with City View",
      location: "Downtown, City Center",
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
      title: "Luxury Penthouse Suite",
      location: "Harbor District",
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
      title: "Cozy Studio Apartment",
      location: "University Area",
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
      title: "Spacious Family Home",
      location: "Suburban Heights",
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
      title: "Modern Loft with Terrace",
      location: "Arts District",
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
      title: "Elegant Townhouse",
      location: "Historic Center",
      price: 2100,
      bedrooms: 3,
      bathrooms: 2.5,
      area: 135,
      isFavorite: false,
    },
  ],
  isLoading = false,
  onApartmentClick = () => {},
  onFavoriteToggle = () => {},
}) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Initialize favorites from the apartments data
  useEffect(() => {
    const initialFavorites = apartments
      .filter((apt) => apt.isFavorite)
      .map((apt) => apt.id);
    setFavorites(initialFavorites);
  }, [apartments]);

  const handleFavoriteToggle = (id: string) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((favId) => favId !== id);
      } else {
        return [...prev, id];
      }
    });
    onFavoriteToggle(id);
  };

  if (isLoading) {
    return (
      <div className="w-full bg-gray-50 p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="h-[380px] w-full animate-pulse rounded-lg bg-gray-200"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 p-6">
      {apartments.length === 0 ? (
        <div className="flex h-[400px] w-full flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center">
          <h3 className="mb-2 text-lg font-medium text-gray-700">
            No apartments found
          </h3>
          <p className="text-gray-500">
            Try adjusting your filters or search criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {apartments.map((apartment) => (
            <div key={apartment.id} className="flex justify-center">
              <ApartmentCard
                id={apartment.id}
                imageUrl={apartment.imageUrl}
                title={apartment.title}
                location={apartment.location}
                price={apartment.price}
                bedrooms={apartment.bedrooms}
                bathrooms={apartment.bathrooms}
                area={apartment.area}
                isFavorite={favorites.includes(apartment.id)}
                onFavoriteToggle={handleFavoriteToggle}
                onClick={() => onApartmentClick(apartment.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApartmentGrid;
