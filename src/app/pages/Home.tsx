import { useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { products, Product } from "../data/products";
import { Sparkles, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function Home() {
  const navigate = useNavigate();
  const [comparisonList, setComparisonList] = useState<Product[]>([]);

  const hotProducts = products.filter(p => p.isHot);

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/20 via-accent/30 to-secondary/20 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm">Welcome to SoleStyle</span>
            </div>
            <h1 className="text-4xl md:text-6xl">
              Step Into Style & Comfort
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our curated collection of premium footwear designed for every occasion. 
              From casual sneakers to elegant dress shoes.
            </p>
          </div>
        </div>
      </section>

      {/* Hot Products Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-primary/10 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2>Hot Products</h2>
              <p className="text-muted-foreground">
                Our most popular shoes this season
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {hotProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCompare={handleAddToCompare}
                isInComparison={!!comparisonList.find(p => p.id === product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3>Quality Guaranteed</h3>
              <p className="text-muted-foreground">
                All our shoes are made from premium materials with excellent craftsmanship
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3>Best Prices</h3>
              <p className="text-muted-foreground">
                Competitive pricing with frequent deals and special offers
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3>Secure Payment</h3>
              <p className="text-muted-foreground">
                Safe and secure checkout with multiple payment options
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
