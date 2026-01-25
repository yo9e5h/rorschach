import { useState } from "react";
import type { RorschachResponse, CalculationResults } from "./types/rorschach";
import { calculateRorschach } from "./lib/rorschach-calculator";
import { RorschachInputForm } from "./components/rorschach-input-form";
import { RorschachResults } from "./components/rorschach-results";
import { Button } from "./components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { ModeToggle } from "./components/theme/mode-toggle";
import { sampleResponses } from "./lib/sample-data";
import { toast } from "sonner";

function App() {
  const [responses, setResponses] = useState<RorschachResponse[]>(
    ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"].map(
      (card) => ({
        response_index: 1,
        card,
        location: "",
        dq: "",
        determinants: [],
        fq: "",
        pair: false,
        FrScore: false,
        rFScore: false,
        contents: [],
        popular: false,
        z: "",
        special_scores: [],
        zscore: undefined,
      }),
    ),
  );

  const [results, setResults] = useState<CalculationResults | null>(null);
  const [activeTab, setActiveTab] = useState<"input" | "results">("input");
  const [clearingAll, setClearingAll] = useState(false);

  const handleCalculate = () => {
    try {
      const validResponses = responses.filter((r) => r.card && r.card !== "");

      if (validResponses.length === 0) {
        toast.error("Please enter at least one response with a card number.", {
          position: "top-center",
        });
        return;
      }

      const allCards = [
        "I",
        "II",
        "III",
        "IV",
        "V",
        "VI",
        "VII",
        "VIII",
        "IX",
        "X",
      ];
      const cardsPresent = new Set(validResponses.map((r) => r.card));
      const missingCards = allCards.filter((card) => !cardsPresent.has(card));

      if (missingCards.length > 0) {
        toast.error(
          `Missing responses for cards: ${missingCards.join(", ")}. At least one response per card is required.`,
          {
            position: "top-center",
          },
        );
        return;
      }

      if (validResponses.length < 14) {
        toast.warning(
          `Note: You have ${validResponses.length} responses. While valid (minimum 1 per card), 14 or more responses are recommended for comprehensive assessment.`,
          {
            position: "top-center",
          },
        );
      }

      const calculatedResults = calculateRorschach(validResponses);
      setResults(calculatedResults);
      setActiveTab("results");

      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 5);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred during calculation";
      toast.error(errorMessage, {
        position: "top-center",
      });
      console.error("Calculation error:", err);
    }
  };

  const confirmClearAll = () => {
    setClearingAll(true);
  };

  const handleReset = () => {
    setResponses([]);
    setResults(null);
    setActiveTab("input");
    setClearingAll(false);
  };

  const loadSampleData = () => {
    setResponses(sampleResponses);
  };

  return (
    <div className="h-screen">
      <div className="mx-auto p-6">
        <header className="flex justify-between items-start mb-4">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              Rorschach Structural Summary
            </h1>
          </div>
          <ModeToggle />
        </header>

        <Tabs
          value={activeTab}
          onValueChange={(v: string) => setActiveTab(v as "input" | "results")}
        >
          <TabsList className="mb-2">
            <TabsTrigger value="input">Input Table</TabsTrigger>
            <TabsTrigger
              value="results"
              disabled={!results}
              title={results ? "" : "Calculate scores to view results"}
            >
              Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="input" className="space-y-4">
            <RorschachInputForm responses={responses} onChange={setResponses} />

            <div className="flex md:justify-end items-center mt-4">
              <div className="flex gap-2">
                <Button variant="outline" onClick={loadSampleData}>
                  Load Sample Data
                </Button>
                <Button variant="destructive" onClick={confirmClearAll}>
                  Clear All
                </Button>
                <Button onClick={handleCalculate}>Calculate</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="results" className="space-y-4">
            {results && (
              <>
                <RorschachResults results={results} />
              </>
            )}
          </TabsContent>
        </Tabs>

        <AlertDialog
          open={clearingAll}
          onOpenChange={(open) => !open && setClearingAll(false)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear All Responses?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete all responses from all cards?
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleReset} variant="destructive">
                Clear All
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default App;
