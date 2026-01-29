import type { CalculationResults } from "@/types/rorschach";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface SpecialIndicesProps {
  results: CalculationResults;
}

export function SpecialIndices({ results }: SpecialIndicesProps) {
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
          Copy All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
    </div>
  );
}
