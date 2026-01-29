import type { CalculationResults } from "@/types/rorschach";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import {
  getKeyVariableStrategies,
  getTertiaryVariableStrategies,
} from "@/lib/rorschach-calculator";

interface SpecialIndicesProps {
  results: CalculationResults;
}

export function SpecialIndices({ results }: SpecialIndicesProps) {
  const keyStrategies = getKeyVariableStrategies(results);
  const tertiaryStrategies = getTertiaryVariableStrategies(results);

  const copyToClipboard = (text: string, sectionName: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success(`${sectionName} copied to clipboard!`, {
          position: "top-center",
        });
      },
      () => {
        toast.error("Failed to copy to clipboard", {
          position: "top-center",
        });
      },
    );
  };

  const copyAllIndices = () => {
    const text = `Special Indices
Coping Style: ${results.CopingStyle}
PTI (Perceptual Thinking Index): ${results.PTI} ${Number(results.PTI) >= 3 ? "(Score ≥ 3 suggests perceptual-thinking problems)" : ""}
DEPI (Depression Index): ${results.DEPI} ${results.DEPI.includes("Positive") ? "(Positive)" : ""}
CDI (Coping Deficit Index): ${results.CDI} ${results.CDI.includes("Positive") ? "(Positive)" : ""}
S-CON (Suicide Constellation): ${results.SCON} ${results.SCON.includes("Positive") ? "(Positive)" : ""}
HVI (Hypervigilance Index): ${results.HVI}
OBS (Obsessive Style Index): ${results.OBS}`;
    copyToClipboard(text, "Special Indices");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Special Indices</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={copyAllIndices}
          className="gap-2"
        >
          <Copy className="h-4 w-4" />
          Copy
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Coping Style</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{results.CopingStyle}</div>
            <div className="text-sm text-muted-foreground">
              Based on EB (Erlebnistypus) and Lambda
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>PTI (Perceptual Thinking Index)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{results.PTI}</div>
            <div className="text-sm text-muted-foreground">
              Score ≥ 3 suggests perceptual-thinking problems
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>DEPI (Depression Index)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{results.DEPI}</div>
            <div className="text-sm text-muted-foreground">
              Score ≥ 5 suggests depression
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>CDI (Coping Deficit Index)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{results.CDI}</div>
            <div className="text-sm text-muted-foreground">
              Score ≥ 4 suggests coping deficits
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>S-CON (Suicide Constellation)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{results.SCON}</div>
            <div className="text-sm text-muted-foreground">
              Score ≥ 8 suggests suicide risk
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>HVI (Hypervigilance Index)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{results.HVI}</div>
            <div className="text-sm text-muted-foreground">
              Positive indicates hypervigilance
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>OBS (Obsessive Style Index)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{results.OBS}</div>
            <div className="text-sm text-muted-foreground">
              Score &gt; 0 suggests obsessive style
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Strategies */}
      {(keyStrategies.length > 0 || tertiaryStrategies.length > 0) && (
        <div className="mt-8 space-y-6">
          {keyStrategies.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    Interpretive Search Strategies Based on Key Variables
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const text = `Interpretive Search Strategies Based on Key Variables\n\n${keyStrategies.map((s) => `${s.variable}:\n${s.routine}`).join("\n\n")}`;
                      copyToClipboard(text, "Key Variables Strategies");
                    }}
                    className="gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold bg-muted/50">
                          Positive Variable
                        </th>
                        <th className="text-left p-3 font-semibold bg-muted/50">
                          Typical Cluster Search Routine
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {keyStrategies.map((strategy, index) => (
                        <tr key={index} className="border-b hover:bg-muted/30">
                          <td className="p-3 font-medium align-top">
                            {strategy.variable}
                          </td>
                          <td className="p-3 text-sm">{strategy.routine}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {tertiaryStrategies.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    Search Strategies Based on Tertiary Variables
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const text = `Search Strategies Based on Tertiary Variables\n\n${tertiaryStrategies.map((s) => `${s.variable}:\n${s.routine}`).join("\n\n")}`;
                      copyToClipboard(text, "Tertiary Variables Strategies");
                    }}
                    className="gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold bg-muted/50">
                          Positive Variable
                        </th>
                        <th className="text-left p-3 font-semibold bg-muted/50">
                          Typical Cluster Search Routine
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tertiaryStrategies.map((strategy, index) => (
                        <tr key={index} className="border-b hover:bg-muted/30">
                          <td className="p-3 font-medium align-top">
                            {strategy.variable}
                          </td>
                          <td className="p-3 text-sm">{strategy.routine}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
