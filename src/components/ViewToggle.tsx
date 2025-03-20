import React from "react";
import { Button } from "./ui/button";
import { Grid, List } from "lucide-react";

interface ViewToggleProps {
  currentView: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({
  currentView = "grid",
  onViewChange,
}) => {
  return (
    <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-200 p-1">
      <Button
        variant={currentView === "grid" ? "default" : "ghost"}
        size="sm"
        className="rounded-md"
        onClick={() => onViewChange("grid")}
      >
        <Grid size={16} className="mr-2" />
        Сетка
      </Button>
      <Button
        variant={currentView === "list" ? "default" : "ghost"}
        size="sm"
        className="rounded-md"
        onClick={() => onViewChange("list")}
      >
        <List size={16} className="mr-2" />
        Список
      </Button>
    </div>
  );
};

export default ViewToggle;
