import { useNavigate } from "react-router";
import { Home, Search } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-12 text-center">
          <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">404</span>
          </div>
          <h1 className="mb-2">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => navigate("/")} className="gap-2">
              <Home className="h-4 w-4" />
              Go Home
            </Button>
            <Button onClick={() => navigate("/search")} variant="outline" className="gap-2">
              <Search className="h-4 w-4" />
              Browse Products
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
