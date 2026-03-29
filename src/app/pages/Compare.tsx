import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { GitCompare, X, Plus, Star, Check } from "lucide-react";
import { products, Product } from "../data/products";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Badge } from "../components/ui/badge";

export function Compare() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState<(Product | null)[]>([null, null, null, null]);

  useEffect(() => {
    if (location.state?.products) {
      const stateProducts = location.state.products as Product[];
      const newSelected = [...selectedProducts];
      stateProducts.forEach((product, index) => {
        if (index < 4) {
          newSelected[index] = product;
        }
      });
      setSelectedProducts(newSelected);
    }
  }, [location.state]);

  const handleSelectProduct = (index: number, productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      const newSelected = [...selectedProducts];
      newSelected[index] = product;
      setSelectedProducts(newSelected);
    }
  };

  const handleRemoveProduct = (index: number) => {
    const newSelected = [...selectedProducts];
    newSelected[index] = null;
    setSelectedProducts(newSelected);
  };

  const selectedCount = selectedProducts.filter(p => p !== null).length;
  const availableProducts = products.filter(
    (p) => !selectedProducts.find((sp) => sp?.id === p.id)
  );

  const compareAttributes = [
    { label: "Price", key: "price", format: (val: any) => `$${val}` },
    { label: "Rating", key: "rating", format: (val: any) => val },
    { label: "Category", key: "category", format: (val: any) => val },
    { 
      label: "Available Sizes", 
      key: "sizes", 
      format: (val: any) => Array.isArray(val) ? val.join(", ") : val 
    },
    { 
      label: "Color Options", 
      key: "colors", 
      format: (val: any) => Array.isArray(val) ? val.join(", ") : val 
    },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary/10 p-3 rounded-lg">
              <GitCompare className="h-6 w-6 text-primary" />
            </div>
            <h1>Compare Products</h1>
          </div>
          <p className="text-muted-foreground">
            Select up to 4 products to compare side by side
          </p>
        </div>

        {/* Selection Info */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant={selectedCount >= 2 ? "default" : "secondary"}>
              {selectedCount} of 4 products selected
            </Badge>
            {selectedCount >= 2 && (
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Check className="h-4 w-4 text-primary" />
                Ready to compare
              </span>
            )}
          </div>
          {selectedCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedProducts([null, null, null, null])}
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {selectedProducts.map((product, index) => (
            <Card key={index} className="overflow-hidden">
              {product ? (
                <div className="relative">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 z-10 h-8 w-8 p-0 rounded-full"
                    onClick={() => handleRemoveProduct(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="aspect-square bg-secondary">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h4 className="mb-1">{product.name}</h4>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </CardContent>
                </div>
              ) : (
                <CardContent className="p-6 h-full flex flex-col items-center justify-center min-h-[300px]">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <Plus className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 text-center">
                    Select a product to compare
                  </p>
                  <Select onValueChange={(value) => handleSelectProduct(index, value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose product" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableProducts.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Comparison Table */}
        {selectedCount >= 2 && (
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-6">Detailed Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-muted-foreground">
                        Attribute
                      </th>
                      {selectedProducts.map((product, index) => (
                        product && (
                          <th key={index} className="text-left py-3 px-4">
                            <span className="text-sm">Product {index + 1}</span>
                          </th>
                        )
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {compareAttributes.map((attr) => (
                      <tr key={attr.key} className="border-b border-border/50">
                        <td className="py-4 px-4 font-medium">{attr.label}</td>
                        {selectedProducts.map((product, index) => (
                          product && (
                            <td key={index} className="py-4 px-4">
                              {attr.key === "rating" ? (
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-primary text-primary" />
                                  <span>{attr.format(product[attr.key as keyof Product])}</span>
                                </div>
                              ) : (
                                <span className={attr.key === "price" ? "text-primary" : ""}>
                                  {attr.format(product[attr.key as keyof Product])}
                                </span>
                              )}
                            </td>
                          )
                        ))}
                      </tr>
                    ))}
                    <tr>
                      <td className="py-4 px-4 font-medium">Description</td>
                      {selectedProducts.map((product, index) => (
                        product && (
                          <td key={index} className="py-4 px-4 text-sm text-muted-foreground">
                            {product.description}
                          </td>
                        )
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {selectedCount === 0 && (
          <Card className="mt-8">
            <CardContent className="p-12 text-center">
              <div className="bg-primary/10 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <GitCompare className="h-10 w-10 text-primary" />
              </div>
              <h3 className="mb-2">Start Comparing Products</h3>
              <p className="text-muted-foreground mb-6">
                Select at least 2 products above to see a detailed comparison
              </p>
              <Button onClick={() => navigate("/search")}>
                Browse Products
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
