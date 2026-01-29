import type { CalculationResults } from "@/types/rorschach";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { useRef } from "react";
import { copyTableToClipboard, copyGridToClipboard } from "@/lib/copy-utils";

interface UpperSectionProps {
  results: CalculationResults;
}

export function UpperSection({ results }: UpperSectionProps) {
  const locationFeaturesRef = useRef<HTMLTableElement>(null);
  const dqTableRef = useRef<HTMLTableElement>(null);
  const formQualityTableRef = useRef<HTMLTableElement>(null);
  const mQualityTableRef = useRef<HTMLTableElement>(null);
  const singleDeterminantsRef = useRef<HTMLDivElement>(null);
  const contentsRef = useRef<HTMLDivElement>(null);
  const approachTableRef = useRef<HTMLTableElement>(null);
  const specialScoresRef = useRef<HTMLDivElement>(null);
  const blendsRef = useRef<HTMLDivElement>(null);

  const handleCopy = async (
    ref: React.RefObject<
      HTMLElement | HTMLTableElement | HTMLDivElement | null
    >,
    sectionName: string,
    isGrid = false,
  ) => {
    if (!ref.current) return;

    try {
      let success = false;
      if (isGrid) {
        success = await copyGridToClipboard(
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {/* Location Features */}
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary flex items-center justify-between">
            <span>Location Features</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                handleCopy(locationFeaturesRef, "Location Features")
              }
              className="h-8 w-8 p-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table ref={locationFeaturesRef} className="w-full">
            <tbody className="divide-y divide-border/50">
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">Zf</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.Zf}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">ZSum</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.ZSum.toFixed(1)}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">ZEst</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.ZEst}
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
                <td className="py-2 font-semibold">Dd</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.Dd}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">S</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.S}
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* DQ */}
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary flex items-center justify-between">
            <span>Developmental Quality</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(dqTableRef, "Developmental Quality")}
              className="h-8 w-8 p-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table ref={dqTableRef} className="w-full">
            <tbody className="divide-y divide-border/50">
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">DQ+</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.DQ_plus}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">DQo</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.DQ_o}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">DQv/+</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.DQ_v_plus}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">DQv</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.DQ_v}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">(2)</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.Pairs}
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Form Quality */}
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary flex items-center justify-between">
            <span>Form Quality</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(formQualityTableRef, "Form Quality")}
              className="h-8 w-8 p-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table ref={formQualityTableRef} className="w-full">
            <tbody className="divide-y divide-border/50">
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">FQ+</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.FQx_plus}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">FQo</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.FQx_o}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">FQu</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.FQx_u}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">FQ-</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.FQx_minus}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">FQnone</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.FQx_none}
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* M Quality */}
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary flex items-center justify-between">
            <span>M Quality</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(mQualityTableRef, "M Quality")}
              className="h-8 w-8 p-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table ref={mQualityTableRef} className="w-full">
            <tbody className="divide-y divide-border/50">
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">MQ+</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.MQual_plus}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">MQo</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.MQual_o}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">MQu</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.MQual_u}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">MQ-</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.MQual_minus}
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="py-2 font-semibold">MQnone</td>
                <td className="py-2 text-right font-mono tabular-nums">
                  {results.MQual_none}
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Single Determinants */}
      <Card className="md:col-span-2 shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary flex items-center justify-between">
            <span>Single Determinants</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                handleCopy(singleDeterminantsRef, "Single Determinants", true)
              }
              className="h-8 w-8 p-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            ref={singleDeterminantsRef}
            className="grid grid-cols-2 divide-y divide-border/50 gap-x-6"
          >
            {Object.entries(results.single_determinants).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2"
              >
                <span className="font-semibold">{key}</span>
                <span className="font-mono tabular-nums">{value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contents */}
      <Card className="md:col-span-2 shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary flex items-center justify-between">
            <span>Contents</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(contentsRef, "Contents", true)}
              className="h-8 w-8 p-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            ref={contentsRef}
            className="grid grid-cols-2 divide-y divide-border/50 gap-x-6"
          >
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">H</span>
              <span className="font-mono tabular-nums">{results.H}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">(H)</span>
              <span className="font-mono tabular-nums">{results.H_paren}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">Hd</span>
              <span className="font-mono tabular-nums">{results.Hd}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">(Hd)</span>
              <span className="font-mono tabular-nums">{results.Hd_paren}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">Hx</span>
              <span className="font-mono tabular-nums">{results.Hx}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">A</span>
              <span className="font-mono tabular-nums">{results.A}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">(A)</span>
              <span className="font-mono tabular-nums">{results.A_paren}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">Ad</span>
              <span className="font-mono tabular-nums">{results.Ad}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">(Ad)</span>
              <span className="font-mono tabular-nums">{results.Ad_paren}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">An</span>
              <span className="font-mono tabular-nums">{results.An}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">Art</span>
              <span className="font-mono tabular-nums">{results.Art}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">Ay</span>
              <span className="font-mono tabular-nums">{results.Ay}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">Bl</span>
              <span className="font-mono tabular-nums">{results.Bl}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">Bt</span>
              <span className="font-mono tabular-nums">{results.Bt}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">Cg</span>
              <span className="font-mono tabular-nums">{results.Cg}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">Cl</span>
              <span className="font-mono tabular-nums">{results.Cl}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">Ex</span>
              <span className="font-mono tabular-nums">{results.Ex}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">Fd</span>
              <span className="font-mono tabular-nums">{results.Fd}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">Fi</span>
              <span className="font-mono tabular-nums">{results.Fi}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">Ge</span>
              <span className="font-mono tabular-nums">{results.Ge}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">Hh</span>
              <span className="font-mono tabular-nums">{results.Hh}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">Ls</span>
              <span className="font-mono tabular-nums">{results.Ls}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">Na</span>
              <span className="font-mono tabular-nums">{results.Na}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">Sc</span>
              <span className="font-mono tabular-nums">{results.Sc}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">Sx</span>
              <span className="font-mono tabular-nums">{results.Sx}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">Xy</span>
              <span className="font-mono tabular-nums">{results.Xy}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">Id</span>
              <span className="font-mono tabular-nums">{results.Id}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Approach */}
      <Card className="md:col-span-1 shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary flex items-center justify-between">
            <span>Approach (Location Sequence)</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(approachTableRef, "Approach")}
              className="h-8 w-8 p-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table ref={approachTableRef} className="w-full">
            <tbody className="divide-y divide-border/50">
              {Object.entries(results.approach).map(([card, locations]) => (
                <tr key={card} className="hover:bg-muted/30 transition-colors">
                  <td className="py-2 font-semibold w-16">{card}</td>
                  <td className="py-2 font-mono">
                    {locations.join(", ") || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Special Scores */}
      <Card className="md:col-span-2 shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary flex items-center justify-between">
            <span>Special Scores</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                handleCopy(specialScoresRef, "Special Scores", true)
              }
              className="h-8 w-8 p-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent ref={specialScoresRef}>
          <div className="grid grid-cols-2 divide-y divide-border/50 gap-x-6">
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">DV1</span>
              <span className="font-mono tabular-nums">{results.DV1}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">DV2</span>
              <span className="font-mono tabular-nums">{results.DV2}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">INCOM1</span>
              <span className="font-mono tabular-nums">{results.INCOM1}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">INCOM2</span>
              <span className="font-mono tabular-nums">{results.INCOM2}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">DR1</span>
              <span className="font-mono tabular-nums">{results.DR1}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">DR2</span>
              <span className="font-mono tabular-nums">{results.DR2}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">FABCOM1</span>
              <span className="font-mono tabular-nums">{results.FABCOM1}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">FABCOM2</span>
              <span className="font-mono tabular-nums">{results.FABCOM2}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">ALOG</span>
              <span className="font-mono tabular-nums">{results.ALOG}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2">
              <span className="font-semibold">CONTAM</span>
              <span className="font-mono tabular-nums">{results.CONTAM}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2 border-b border-border/50">
              <span className="font-semibold">Sum6</span>
              <span className="font-mono tabular-nums">{results.Sum6}</span>
            </div>
            <div className="flex justify-between py-2 hover:bg-muted/30 transition-colors mx-2 border-b border-border/50">
              <span className="font-semibold">WSum6</span>
              <span className="font-mono tabular-nums">{results.WSum6}</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            <div className="flex flex-col items-center p-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors">
              <span className="text-base uppercase font-medium text-foreground mb-2">
                AB
              </span>
              <span className="text-xl font-mono tabular-nums">
                {results.AB}
              </span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors">
              <span className="text-base uppercase font-medium text-foreground mb-2">
                AG
              </span>
              <span className="text-xl font-mono tabular-nums">
                {results.AG}
              </span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors">
              <span className="text-base uppercase font-medium text-foreground mb-2">
                COP
              </span>
              <span className="text-xl font-mono tabular-nums">
                {results.COP}
              </span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors">
              <span className="text-base uppercase font-medium text-foreground mb-2">
                CP
              </span>
              <span className="text-xl font-mono tabular-nums">
                {results.CP}
              </span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors">
              <span className="text-base uppercase font-medium text-foreground mb-2">
                GHR
              </span>
              <span className="text-xl font-mono tabular-nums">
                {results.GHR}
              </span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors">
              <span className="text-base uppercase font-medium text-foreground mb-2">
                PHR
              </span>
              <span className="text-xl font-mono tabular-nums">
                {results.PHR}
              </span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors">
              <span className="text-base uppercase font-medium text-foreground mb-2">
                MOR
              </span>
              <span className="text-xl font-mono tabular-nums">
                {results.MOR}
              </span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors">
              <span className="text-base uppercase font-medium text-foreground mb-2">
                PER
              </span>
              <span className="text-xl font-mono tabular-nums">
                {results.PER}
              </span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors">
              <span className="text-base uppercase font-medium text-foreground mb-2">
                PSV
              </span>
              <span className="text-xl font-mono tabular-nums">
                {results.PSV}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Blends */}
      <Card className="md:col-span-1 shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary flex items-center justify-between">
            <span>
              Blends{" "}
              <span className="text-muted-foreground">
                ({results.blends_list.length})
              </span>
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(blendsRef, "Blends", true)}
              className="h-8 w-8 p-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent ref={blendsRef}>
          {results.blends_list.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {results.blends_list.map((blend, idx) => (
                <div
                  key={idx}
                  className="py-3 rounded-md border border-border bg-muted/30 hover:bg-muted/50 transition-colors font-mono tabular-nums text-center"
                >
                  {blend.join(".")}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-sm text-muted-foreground py-8">
              No blends found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
