import { Outlet } from "react-router";
import { Header } from "./Header";
import { Toaster } from "./ui/sonner";
import { ConsultationButton } from "./ConsultationButton";
import { CartProvider } from "../context/CartContext";
import { FavoritesProvider } from "../context/FavoritesContext";

export function Layout() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <footer className="bg-card border-t border-primary/20 py-8 mt-auto">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h4 className="mb-3">About SoleStyle</h4>
                  <p className="text-sm text-muted-foreground">
                    Your premier destination for quality footwear. We bring style and comfort together.
                  </p>
                </div>
                <div>
                  <h4 className="mb-3">Quick Links</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="/" className="text-muted-foreground hover:text-primary">Home</a></li>
                    <li><a href="/search" className="text-muted-foreground hover:text-primary">Search</a></li>
                    <li><a href="/compare" className="text-muted-foreground hover:text-primary">Compare</a></li>
                    <li><a href="/contact" className="text-muted-foreground hover:text-primary">Contact</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3">Customer Service</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="text-muted-foreground hover:text-primary">Shipping Info</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-primary">Returns</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-primary">Size Guide</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-primary">FAQ</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3">Connect With Us</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="text-muted-foreground hover:text-primary">Facebook</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-primary">Instagram</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-primary">Twitter</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-primary">Pinterest</a></li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-primary/20 text-center text-sm text-muted-foreground">
                <p>&copy; 2026 SoleStyle. All rights reserved.</p>
              </div>
            </div>
          </footer>
          <Toaster position="top-right" />
          <ConsultationButton />
        </div>
      </FavoritesProvider>
    </CartProvider>
  );
}