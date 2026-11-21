import { Hammer } from "lucide-react";
import { EmptyState } from "./empty-state";

/** Placeholder for pages whose UI is not built yet. Lists the API it will use. */
export function ComingSoon({ endpoints }: { endpoints: string[] }) {
  return (
    <EmptyState
      icon={Hammer}
      title="This page is next on the build list"
      description={`Wire it to: ${endpoints.join(" · ")}`}
    />
  );
}
