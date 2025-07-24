import { Switch, Route } from "wouter";
// @ts-ignore
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Universities from "@/pages/universities";
import Faculties from "@/pages/faculties";
import Teachers from "@/pages/teachers";
import NotFound from "@/pages/not-found";

function Router() {
    return (
        <Switch>
            <Route path="/" component={Home} />
            <Route path="/universities" component={Universities} />
            <Route path="/faculties/:id" component={Faculties} />
            <Route path="/teachers/:id" component={Teachers} />
            <Route component={NotFound} />
        </Switch>
    );
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Toaster />
                <Router />
            </TooltipProvider>
        </QueryClientProvider>
    );
}

export default App;
