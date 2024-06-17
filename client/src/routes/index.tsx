import Grid from "@/components/grid.tsx";
import Options from "@/components/options.tsx";
import { createFileRoute } from "@tanstack/react-router";

const component: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <Grid />
      <Options />
    </div>
  );
};

export const Route = createFileRoute("/")({
  component,
});
