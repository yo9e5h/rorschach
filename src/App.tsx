import { useState, useRef } from "react";
import type { RorschachResponse, CalculationResults } from "./types/rorschach";
import { calculateRorschach } from "./lib/rorschach-calculator";
import { RorschachInputForm } from "./components/rorschach-input-form";
import { RorschachResults } from "./components/rorschach-results";
import { Button } from "./components/ui/button";
import { Alert, AlertDescription } from "./components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { ModeToggle } from "./components/theme/mode-toggle";
import { ScrollArea } from "./components/ui/scroll-area";
import { sampleResponses } from "./lib/sample-data";

function App() {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
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
  const [error, setError] = useState<string>("");
  const [warning, setWarning] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"input" | "results">("input");

  const handleCalculate = () => {
    try {
      setError("");
      setWarning("");
      const validResponses = responses.filter((r) => r.card && r.card !== "");

      if (validResponses.length === 0) {
        setError("Please enter at least one response with a card number.");
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
        setError(
          `Missing responses for cards: ${missingCards.join(", ")}. At least one response per card is required.`,
        );
        return;
      }

      if (validResponses.length < 14) {
        setWarning(
          `Note: You have ${validResponses.length} responses. While valid (minimum 1 per card), 14 or more responses are recommended for comprehensive assessment.`,
        );
      }

      const calculatedResults = calculateRorschach(validResponses);
      setResults(calculatedResults);
      setActiveTab("results");

      setTimeout(() => {
        const viewport = scrollAreaRef.current?.querySelector(
          '[data-slot="scroll-area-viewport"]',
        );
        if (viewport) {
          viewport.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      }, 10);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred during calculation",
      );
      console.error("Calculation error:", err);
    }
  };

  const handleReset = () => {
    setResponses(
      ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"].map(
        (card) => ({
          card,
          response_index: 1,
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
    setResults(null);
    setError("");
    setWarning("");
    setActiveTab("input");
  };

  const loadSampleData = () => {
    setResponses(sampleResponses);
    setError("");
    setWarning("");
  };

  return (
    <div className="h-screen">
      <ScrollArea ref={scrollAreaRef} className="h-full">
        <div className="mx-auto p-6">
          <header className="flex justify-between items-start mb-4">
            <div className="flex flex-col space-y-2">
              <h1 className="text-3xl font-bold text-foreground">
                Rorschach Structural Summary
              </h1>
            </div>
            <ModeToggle />
          </header>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {warning && !error && (
            <Alert className="mb-4 border-amber-500 bg-amber-50 dark:bg-amber-950 dark:border-amber-700">
              <AlertDescription className="text-amber-900 dark:text-amber-200">
                {warning}
              </AlertDescription>
            </Alert>
          )}

          <Tabs
            value={activeTab}
            onValueChange={(v: string) =>
              setActiveTab(v as "input" | "results")
            }
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
              <RorschachInputForm
                responses={responses}
                onChange={setResponses}
              />

              <div className="flex justify-end items-center mt-4">
                <div className="flex gap-2">
                  <Button variant="outline" onClick={loadSampleData}>
                    Load Sample Data
                  </Button>
                  <Button variant="destructive" onClick={handleReset}>
                    Clear All
                  </Button>
                  <Button onClick={handleCalculate}>Calculate Scores</Button>
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
        </div>
      </ScrollArea>
    </div>
  );
}

export default App;
