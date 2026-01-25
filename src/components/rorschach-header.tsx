import { Button } from "./ui/button";
import { ModeToggle } from "./theme/mode-toggle";

interface RorschachHeaderProps {
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onExport: () => void;
}

export function RorschachHeader({ onImport, onExport }: RorschachHeaderProps) {
  return (
    <header className="flex justify-between items-start mb-4">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Rorschach Structural Summary
        </h1>
      </div>
      <div className="flex flex-col-reverse items-end sm:flex-row sm:items-center gap-2">
        <label htmlFor="import-json">
          <Button variant="outline" asChild>
            <span>Import JSON</span>
          </Button>
        </label>
        <input
          id="import-json"
          type="file"
          accept=".json,application/json"
          onChange={onImport}
          className="hidden"
        />
        <Button variant="outline" onClick={onExport}>
          Export JSON
        </Button>

        <ModeToggle />
      </div>
    </header>
  );
}
