import type { CalculationResults } from "@/types/rorschach";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SpecialIndicesProps {
  results: CalculationResults;
}

export function SpecialIndices({ results }: SpecialIndicesProps) {
  return (
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
  );
}
