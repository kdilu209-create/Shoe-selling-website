import { Link, useLocation, useNavigate } from "react-router";
import { ShoppingBag, Search, GitCompare, Mail, Heart, ShoppingCart, Menu, ChevronDown } from "lucide-react";
import { CartDrawer } from "./CartDrawer";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet";
import { useState } from "react";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { favorites } = useFavorites();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navigateWithFilter = (filterType: string, value: string) => {
    navigate("/search", { state: { [filterType]: value } });
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-primary/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="bg-primary p-2 rounded-lg group-hover:bg-accent transition-colors">
              <ShoppingBag className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-semibold text-foreground hidden sm:inline">SoleStyle</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            <Link
              to="/"
              className={`transition-colors ${
                isActive("/") ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Home
            </Link>

            {/* Gender Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors outline-none">
                Gender <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => navigateWithFilter("gender", "men")}>
                  Men's Shoes
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigateWithFilter("gender", "women")}>
                  Women's Shoes
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigateWithFilter("gender", "children")}>
                  Children's Shoes
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Collections Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors outline-none">
                Collections <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => navigateWithFilter("collection", "Classic")}>
                  Classic
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigateWithFilter("collection", "Premium")}>
                  Premium
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigateWithFilter("collection", "Urban")}>
                  Urban
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigateWithFilter("collection", "Minimalist")}>
                  Minimalist
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigateWithFilter("collection", "Luxury")}>
                  Luxury
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigateWithFilter("collection", "Summer")}>
                  Summer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sports Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors outline-none">
                Sports <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => navigateWithFilter("sport", "Running")}>
                  Running
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigateWithFilter("sport", "Basketball")}>
                  Basketball
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigateWithFilter("sport", "Training")}>
                  Training
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Height Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors outline-none">
                Height <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => navigateWithFilter("height", "low")}>
                  Low-Top
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigateWithFilter("height", "mid")}>
                  Mid-Top
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigateWithFilter("height", "high")}>
                  High-Top
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              to="/compare"
              className={`transition-colors ${
                isActive("/compare") ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Compare
            </Link>

            <Link
              to="/contact"
              className={`transition-colors ${
                isActive("/contact") ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex gap-2"
              onClick={() => navigate("/search")}
            >
              <Search className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="relative"
              onClick={() => navigate("/favorites")}
            >
              <Heart className="h-5 w-5" />
              {favorites.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 rounded-full text-xs">
                  {favorites.length}
                </Badge>
              )}
            </Button>

            <CartDrawer>
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 rounded-full text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </CartDrawer>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px]">
                <div className="flex flex-col gap-6 mt-8">
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg"
                  >
                    Home
                  </Link>

                  <div>
                    <h4 className="mb-3 text-muted-foreground text-sm">Gender</h4>
                    <div className="flex flex-col gap-2 pl-4">
                      <button
                        onClick={() => navigateWithFilter("gender", "men")}
                        className="text-left hover:text-primary transition-colors"
                      >
                        Men's Shoes
                      </button>
                      <button
                        onClick={() => navigateWithFilter("gender", "women")}
                        className="text-left hover:text-primary transition-colors"
                      >
                        Women's Shoes
                      </button>
                      <button
                        onClick={() => navigateWithFilter("gender", "children")}
                        className="text-left hover:text-primary transition-colors"
                      >
                        Children's Shoes
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-3 text-muted-foreground text-sm">Collections</h4>
                    <div className="flex flex-col gap-2 pl-4">
                      <button
                        onClick={() => navigateWithFilter("collection", "Classic")}
                        className="text-left hover:text-primary transition-colors"
                      >
                        Classic
                      </button>
                      <button
                        onClick={() => navigateWithFilter("collection", "Premium")}
                        className="text-left hover:text-primary transition-colors"
                      >
                        Premium
                      </button>
                      <button
                        onClick={() => navigateWithFilter("collection", "Urban")}
                        className="text-left hover:text-primary transition-colors"
                      >
                        Urban
                      </button>
                      <button
                        onClick={() => navigateWithFilter("collection", "Luxury")}
                        className="text-left hover:text-primary transition-colors"
                      >
                        Luxury
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-3 text-muted-foreground text-sm">Sports</h4>
                    <div className="flex flex-col gap-2 pl-4">
                      <button
                        onClick={() => navigateWithFilter("sport", "Running")}
                        className="text-left hover:text-primary transition-colors"
                      >
                        Running
                      </button>
                      <button
                        onClick={() => navigateWithFilter("sport", "Basketball")}
                        className="text-left hover:text-primary transition-colors"
                      >
                        Basketball
                      </button>
                      <button
                        onClick={() => navigateWithFilter("sport", "Training")}
                        className="text-left hover:text-primary transition-colors"
                      >
                        Training
                      </button>
                    </div>
                  </div>

                  <Link
                    to="/compare"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg"
                  >
                    Compare
                  </Link>

                  <Link
                    to="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg"
                  >
                    Contact
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
