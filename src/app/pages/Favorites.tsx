import { Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import { ProductCard } from "../components/ProductCard";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Product } from "../data/products";
import { toast } from "sonner";

export function Favorites() {
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const [comparisonList, setComparisonList] = useState<Product[]>([]);

  const handleAddToCompare = (product: Product) => {
    if (comparisonList.length >= 4) {
      toast.error("You can only compare up to 4 products at a time");
      return;
    }
    
    if (!comparisonList.find(p => p.id === product.id)) {
      const newList = [...comparisonList, product];
      setComparisonList(newList);
      toast.success(`${product.name} added to comparison`);
      
      if (newList.length >= 2) {
        setTimeout(() => {
          toast.info("Ready to compare! Click here to view comparison", {
            action: {
              label: "View",
              onClick: () => navigate("/compare", { state: { products: newList } })
            }
          });
        }, 300);
      }
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <h1>My Favorites</h1>
          </div>
          <p className="text-muted-foreground">
            {favorites.length} {favorites.length === 1 ? "item" : "items"} saved
          </p>
        </div>

        {/* Products Grid */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCompare={handleAddToCompare}
                isInComparison={!!comparisonList.find(p => p.id === product.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-primary/10 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Heart className="h-10 w-10 text-primary" />
            </div>
            <h3 className="mb-2">No favorites yet</h3>
            <p className="text-muted-foreground mb-6">
              Start adding products to your favorites to see them here
            </p>
            <Button onClick={() => navigate("/search")}>
              Browse Products
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
