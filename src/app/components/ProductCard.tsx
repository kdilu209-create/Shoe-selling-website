import { Star, Plus, Heart, ShoppingCart } from "lucide-react";
import { Product } from "../data/products";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ProductCardProps {
  product: Product;
  onAddToCompare?: (product: Product) => void;
  isInComparison?: boolean;
}

export function ProductCard({ product, onAddToCompare, isInComparison }: ProductCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addItem } = useCart();
  const [showAddToCart, setShowAddToCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product);
    toast.success(
      isFavorite(product.id) 
        ? `${product.name} removed from favorites` 
        : `${product.name} added to favorites`
    );
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color");
      return;
    }

    addItem(product, selectedSize, selectedColor);
    toast.success(`${product.name} added to cart`);
    setShowAddToCart(false);
    setSelectedSize("");
    setSelectedColor("");
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
        <div className="relative aspect-square overflow-hidden bg-secondary">
          {product.isHot && (
            <Badge className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground">
              Hot
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-3 right-3 z-10 h-9 w-9 p-0 bg-white/90 hover:bg-white"
            onClick={handleToggleFavorite}
          >
            <Heart
              className={`h-5 w-5 ${
                isFavorite(product.id)
                  ? "fill-red-500 text-red-500"
                  : "text-muted-foreground"
              }`}
            />
          </Button>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardContent className="p-4 space-y-3">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              {product.category}
            </p>
            <h3 className="mt-1">{product.name}</h3>
          </div>
          
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm">{product.rating}</span>
            <span className="text-xs text-muted-foreground ml-1">
              ({Math.floor(Math.random() * 100) + 20} reviews)
            </span>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>

          <div className="flex flex-wrap gap-1">
            {product.characteristics.slice(0, 2).map((char) => (
              <Badge key={char} variant="secondary" className="text-xs">
                {char}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-2xl text-primary">${product.price}</span>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => setShowAddToCart(true)}
              className="flex-1 gap-2"
              size="sm"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
            {onAddToCompare && (
              <Button
                onClick={() => onAddToCompare(product)}
                variant={isInComparison ? "secondary" : "outline"}
                size="sm"
                className="gap-1"
                disabled={isInComparison}
              >
                <Plus className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add to Cart Dialog */}
      <Dialog open={showAddToCart} onOpenChange={setShowAddToCart}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add to Cart</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-24 h-24 bg-secondary rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4>{product.name}</h4>
                <p className="text-sm text-muted-foreground">{product.category}</p>
                <p className="text-xl text-primary mt-1">${product.price}</p>
              </div>
            </div>

            <div className="space-y-2">
              <label>Select Size</label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      Size {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label>Select Color</label>
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a color" />
                </SelectTrigger>
                <SelectContent>
                  {product.colors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleAddToCart} className="w-full gap-2">
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
