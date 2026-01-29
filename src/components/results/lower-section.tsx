import type { CalculationResults } from "@/types/rorschach";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { useRef } from "react";
import {
  copyTableToClipboard,
  copyCoreDataToClipboard,
} from "@/lib/copy-utils";

interface LowerSectionProps {
  results: CalculationResults;
}

export function LowerSection({ results }: LowerSectionProps) {
  const coreSectionRef = useRef<HTMLDivElement>(null);
  const affectTableRef = useRef<HTMLTableElement>(null);
  const interpersonalTableRef = useRef<HTMLTableElement>(null);
  const selfPerceptionTableRef = useRef<HTMLTableElement>(null);
  const ideationTableRef = useRef<HTMLTableElement>(null);
  const processingTableRef = useRef<HTMLTableElement>(null);
  const mediationTableRef = useRef<HTMLTableElement>(null);

  const handleCopy = async (
    ref: React.RefObject<
      HTMLElement | HTMLTableElement | HTMLDivElement | null
    >,
    sectionName: string,
    isCore = false,
  ) => {
    if (!ref.current) return;

    try {
      let success = false;
      if (isCore) {
        success = await copyCoreDataToClipboard(
          ref.current as HTMLElement,
          sectionName,
        );
      } else {
        success = await copyTableToClipboard(ref.current as HTMLTableElement);
      }

      if (success) {
        toast.success(`${sectionName} copied to clipboard!`, {
          position: "top-center",
        });
      } else {
        toast.error("Failed to copy to clipboard", {
          position: "top-center",
        });
      }
    } catch {
      toast.error("Failed to copy to clipboard", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Core Section */}
      <Card className="md:col-span-3 shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary flex items-center justify-between">
            <span>Core Section</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(coreSectionRef, "Core Section", true)}
              className="h-8 w-8 p-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            ref={coreSectionRef}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            <div>
              <div className="text-base text-muted-foreground mb-1">R</div>
              <div className="text-xl font-mono tabular-nums">{results.R}</div>
            </div>
            <div>
              <div className="text-base text-muted-foreground mb-1">Lambda</div>
              <div className="text-xl font-mono tabular-nums">
                {results.Lambda.toFixed(2)}
              </div>
            </div>
            <div>
              <div className="text-base text-muted-foreground mb-1">EB</div>
              <div className="text-xl font-bold font-mono tabular-nums">
                {results.M} : {results.WSumC.toFixed(1)}
              </div>
            </div>
            <div>
              <div className="text-base text-muted-foreground mb-1">eb</div>
              <div className="text-xl font-bold font-mono tabular-nums">
                {results.eb}
              </div>
            </div>
            <div>
              <div className="text-base text-muted-foreground mb-1">EA</div>
              <div className="text-xl font-mono tabular-nums">
                {results.EA.toFixed(1)}
              </div>
            </div>
            <div>
              <div className="text-base text-muted-foreground mb-1">es</div>
              <div className="text-xl font-mono tabular-nums">{results.es}</div>
            </div>
            <div>
              <div className="text-base text-muted-foreground mb-1">D</div>
              <div className="text-xl font-mono tabular-nums">
                {results.D_score}
              </div>
            </div>
            <div>
              <div className="text-base text-muted-foreground mb-1">Adj es</div>
              <div className="text-xl font-mono tabular-nums">
                {results.AdjEs}
              </div>
            </div>
            <div>
              <div className="text-base text-muted-foreground mb-1">Adj D</div>
              <div className="text-xl font-mono tabular-nums">
                {results.AdjD}
              </div>
            </div>
            <div>
              <div className="text-base text-muted-foreground mb-1">EB Per</div>
              <div className="text-xl font-mono tabular-nums">
                {results.EBPer}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Affect */}
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary flex items-center justify-between">
            <span>Affect</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(affectTableRef, "Affect")}
              className="h-8 w-8 p-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table ref={affectTableRef} className="w-full">
            <tbody className="divide-y divide-border/50">
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">FC</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.FC}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">CF</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.CF}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">C</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.C}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">FC:CF+C</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.FC}:{results.CF + results.C}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">Cn</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.Cn}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">Fm</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.FM}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">m</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.m}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">WSumC</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.WSumC.toFixed(1)}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">SumC'</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.SumC_prime}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">SumT</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.SumT}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">SumV</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.SumV}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">SumY</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.SumY}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">Afr</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.Afr.toFixed(2)}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">Blends</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.Blends}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">CP</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.CP}
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Interpersonal */}
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary flex items-center justify-between">
            <span>Interpersonal</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(interpersonalTableRef, "Interpersonal")}
              className="h-8 w-8 p-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table ref={interpersonalTableRef} className="w-full">
            <tbody className="divide-y divide-border/50">
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">COP</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.COP}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">AG</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.AG}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">GHR</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.GHR}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">PHR</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.PHR}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">a:p</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.active_movement}:{results.passive_movement}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">Food</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.Fd}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">SumT</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.SumT}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">PER</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.PER}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">Isolate/R</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.IsolateIndex.toFixed(2)}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">Pure H</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.H}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">H Total</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.H_total}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">Human Cont</td>
                <td className="py-2.5 text-right font-mono tabular-nums text-sm">
                  {results.H}:({results.H_paren})+{results.Hd}+(
                  {results.Hd_paren})
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Self-Perception */}
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary flex items-center justify-between">
            <span>Self-Perception</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                handleCopy(selfPerceptionTableRef, "Self-Perception")
              }
              className="h-8 w-8 p-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table ref={selfPerceptionTableRef} className="w-full">
            <tbody className="divide-y divide-border/50">
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">3r+(2)/R</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.EgocentricityIndex.toFixed(2)}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">Fr+rF</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.Fr + results.rF}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">FD</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.FD}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">An+Xy</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.An + results.Xy}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">MOR</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.MOR}
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Ideation */}
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary flex items-center justify-between">
            <span>Ideation</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(ideationTableRef, "Ideation")}
              className="h-8 w-8 p-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table ref={ideationTableRef} className="w-full">
            <tbody className="divide-y divide-border/50">
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">M</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.M}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">Ma</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.Ma}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">Mp</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.Mp}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">Ma:Mp</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.Ma}:{results.Mp}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">2:AB+Art+Ay</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.H + results.H_paren + results.Hd + results.Hd_paren}:
                  {results.AB + results.Art + results.Ay}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">M-</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.MQual_minus}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">M none</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.MQual_none}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">Sum6</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.Sum6}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">Lv2</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.Lv2}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">WSum6</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.WSum6}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">MOR</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.MOR}
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Processing */}
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary flex items-center justify-between">
            <span>Processing</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(processingTableRef, "Processing")}
              className="h-8 w-8 p-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table ref={processingTableRef} className="w-full">
            <tbody className="divide-y divide-border/50">
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">Zf</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.Zf}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">W</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.W}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">D</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.D}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">W+D</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.W_plus_D}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">Dd</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.Dd}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">W:D:Dd</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.W}:{results.D}:{results.Dd}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">W:M</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.W}:{results.M}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">Zd</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {typeof results.Zd === "number"
                    ? results.Zd.toFixed(1)
                    : results.Zd}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">PSV</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.PSV}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">DQ+</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.DQ_plus}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">DQv</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.DQ_v}
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Mediation */}
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary flex items-center justify-between">
            <span>Mediation</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(mediationTableRef, "Mediation")}
              className="h-8 w-8 p-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table ref={mediationTableRef} className="w-full">
            <tbody className="divide-y divide-border/50">
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">XA%</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {(results.XA_percent * 100).toFixed(1)}%
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">WDA%</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {(results.WDA_percent * 100).toFixed(1)}%
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">X+%</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {(results.X_plus_percent * 100).toFixed(1)}%
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">Xu%</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {(results.Xu_percent * 100).toFixed(1)}%
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">X-%</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {(results.X_minus_percent * 100).toFixed(1)}%
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">S-</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.S_minus}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">P</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.Populars}
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
