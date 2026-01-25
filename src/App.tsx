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
import { RorschachHeader } from "./components/rorschach-header";
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
    setResponses(
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
    setResults(null);
    setActiveTab("input");
    setClearingAll(false);
  };

  const exportResponses = () => {
    const validResponses = responses.filter((r) => r.card && r.card !== "");

    if (validResponses.length === 0) {
      toast.error("No responses to export.", {
        position: "top-center",
      });
      return;
    }

    const dataStr = JSON.stringify(validResponses, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `rorschach-responses-${new Date().toISOString().replace(/:/g, "-").replace(/\..+/, "")}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success("Responses exported successfully!", {
      position: "top-center",
    });
  };

  const validateResponse = (obj: unknown): obj is RorschachResponse => {
    if (typeof obj !== "object" || obj === null) return false;

    const response = obj as Record<string, unknown>;

    const validCards = [
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
    if (!validCards.includes(response.card as string)) return false;

    if (typeof response.response_index !== "number") return false;
    if (typeof response.location !== "string") return false;
    if (typeof response.dq !== "string") return false;
    if (!Array.isArray(response.determinants)) return false;
    if (typeof response.fq !== "string") return false;
    if (typeof response.pair !== "boolean") return false;
    if (typeof response.FrScore !== "boolean") return false;
    if (typeof response.rFScore !== "boolean") return false;
    if (!Array.isArray(response.contents)) return false;
    if (typeof response.popular !== "boolean") return false;
    if (typeof response.z !== "string") return false;
    if (!Array.isArray(response.special_scores)) return false;

    return true;
  };

  const importResponses = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);

        if (!Array.isArray(parsed)) {
          toast.error("Invalid JSON format: Expected an array of responses.", {
            position: "top-center",
          });
          return;
        }

        if (parsed.length === 0) {
          toast.error("JSON file contains no responses.", {
            position: "top-center",
          });
          return;
        }

        for (let i = 0; i < parsed.length; i++) {
          if (!validateResponse(parsed[i])) {
            toast.error(
              `Invalid response format at index ${i}. Please check the JSON structure.`,
              {
                position: "top-center",
              },
            );
            return;
          }
        }

        setResponses(parsed);
        setResults(null);
        setActiveTab("input");
        toast.success(`Successfully imported ${parsed.length} responses!`, {
          position: "top-center",
        });
      } catch (err) {
        toast.error(
          err instanceof Error
            ? `Failed to parse JSON: ${err.message}`
            : "Invalid JSON file format.",
          {
            position: "top-center",
          },
        );
      }
    };

    reader.onerror = () => {
      toast.error("Failed to read file.", {
        position: "top-center",
      });
    };

    reader.readAsText(file);
    event.target.value = "";
  };

  return (
    <div className="h-screen">
      <div className="mx-auto p-6">
        <RorschachHeader onImport={importResponses} />

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
                <Button variant="outline" onClick={exportResponses}>
                  Export as JSON
                </Button>
                <Button variant="destructive" onClick={confirmClearAll}>
                  Clear All
                </Button>
                <Button onClick={handleCalculate}>Calculate</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="results" className="space-y-4">
            {results && <RorschachResults results={results} />}
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
