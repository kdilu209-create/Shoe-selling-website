import { useState, useMemo, useEffect } from "react";
import { Search as SearchIcon, Filter, X } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { products, Product } from "../data/products";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Slider } from "../components/ui/slider";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router";

export function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [selectedHeight, setSelectedHeight] = useState<string>("all");
  const [selectedCollection, setSelectedCollection] = useState<string>("all");
  const [selectedSport, setSelectedSport] = useState<string>("all");
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [showFilters, setShowFilters] = useState(false);
  const [comparisonList, setComparisonList] = useState<Product[]>([]);

  // Apply filters from navigation state
  useEffect(() => {
    if (location.state) {
      if (location.state.gender) setSelectedGender(location.state.gender);
      if (location.state.height) setSelectedHeight(location.state.height);
      if (location.state.collection) setSelectedCollection(location.state.collection);
      if (location.state.sport) setSelectedSport(location.state.sport);
      
      // Clear the state after applying
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]);

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))];
  const collections = ["all", ...Array.from(new Set(products.map((p) => p.collection).filter(Boolean)))];
  const sports = ["all", ...Array.from(new Set(products.map((p) => p.sport).filter(Boolean)))];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      
      const matchesGender =
        selectedGender === "all" || product.gender === selectedGender;
      
      const matchesHeight =
        selectedHeight === "all" || product.height === selectedHeight;
      
      const matchesCollection =
        selectedCollection === "all" || product.collection === selectedCollection;
      
      const matchesSport =
        selectedSport === "all" || product.sport === selectedSport;
      
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesGender && matchesHeight && 
             matchesCollection && matchesSport && matchesPrice;
    });
  }, [searchQuery, selectedCategory, selectedGender, selectedHeight, selectedCollection, selectedSport, priceRange]);

  const handleAddToCompare = (product: Product) => {
    if (comparisonList.length >= 4) {
      toast.error("You can only compare up to 4 products at a time");
      return;
    }
    
    if (!comparisonList.find(p => p.id === product.id)) {
      setComparisonList([...comparisonList, product]);
      toast.success(`${product.name} added to comparison`);
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedGender("all");
    setSelectedHeight("all");
    setSelectedCollection("all");
    setSelectedSport("all");
    setPriceRange([0, 300]);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Search Products</h1>
          <p className="text-muted-foreground">
            Find your perfect pair from our collection
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4 mb-8">
          {/* Search Bar */}
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for shoes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-white"
            />
          </div>

          {/* Filter Toggle Button (Mobile) */}
          <div className="flex items-center justify-between md:hidden">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            {(searchQuery || selectedCategory !== "all" || selectedGender !== "all" || selectedHeight !== "all" || selectedCollection !== "all" || selectedSport !== "all" || priceRange[0] !== 0 || priceRange[1] !== 300) && (
              <Button variant="ghost" onClick={clearFilters} className="gap-2">
                <X className="h-4 w-4" />
                Clear
              </Button>
            )}
          </div>

          {/* Filters */}
          <div className={`grid md:grid md:grid-cols-3 gap-4 ${showFilters ? "grid" : "hidden md:grid"}`}>
            <div className="space-y-2">
              <label className="text-sm">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm">Gender</label>
              <Select value={selectedGender} onValueChange={setSelectedGender}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="men">Men</SelectItem>
                  <SelectItem value="women">Women</SelectItem>
                  <SelectItem value="children">Children</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm">Height</label>
              <Select value={selectedHeight} onValueChange={setSelectedHeight}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select height" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="mid">Mid</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm">Collection</label>
              <Select value={selectedCollection} onValueChange={setSelectedCollection}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select collection" />
                </SelectTrigger>
                <SelectContent>
                  {collections.map((collection) => (
                    <SelectItem key={collection} value={collection}>
                      {collection.charAt(0).toUpperCase() + collection.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm">Sport</label>
              <Select value={selectedSport} onValueChange={setSelectedSport}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select sport" />
                </SelectTrigger>
                <SelectContent>
                  {sports.map((sport) => (
                    <SelectItem key={sport} value={sport}>
                      {sport.charAt(0).toUpperCase() + sport.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 col-span-2">
              <label className="text-sm">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <div className="pt-2">
                <Slider
                  min={0}
                  max={300}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(searchQuery || selectedCategory !== "all" || selectedGender !== "all" || selectedHeight !== "all" || selectedCollection !== "all" || selectedSport !== "all" || priceRange[0] !== 0 || priceRange[1] !== 300) && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Search: {searchQuery}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setSearchQuery("")}
                  />
                </Badge>
              )}
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {selectedCategory}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setSelectedCategory("all")}
                  />
                </Badge>
              )}
              {selectedGender !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {selectedGender}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setSelectedGender("all")}
                  />
                </Badge>
              )}
              {selectedHeight !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {selectedHeight}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setSelectedHeight("all")}
                  />
                </Badge>
              )}
              {selectedCollection !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {selectedCollection}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setSelectedCollection("all")}
                  />
                </Badge>
              )}
              {selectedSport !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {selectedSport}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setSelectedSport("all")}
                  />
                </Badge>
              )}
              {(priceRange[0] !== 0 || priceRange[1] !== 300) && (
                <Badge variant="secondary" className="gap-1">
                  ${priceRange[0]} - ${priceRange[1]}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setPriceRange([0, 300])}
                  />
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-7 text-xs"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-muted-foreground">
            {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
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
            <SearchIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters
            </p>
            <Button onClick={clearFilters}>Clear Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
}