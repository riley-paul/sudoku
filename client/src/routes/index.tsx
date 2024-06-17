import { Button } from "@/components/ui/button.tsx";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

const component: React.FC = () => {
  return (
    <Button variant="secondary" onClick={() => toast.success("World")}>
      Hello
    </Button>
  );
};

export const Route = createFileRoute("/")({
  component,
});
