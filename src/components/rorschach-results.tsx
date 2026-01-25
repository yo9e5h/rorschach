import type { CalculationResults } from "@/types/rorschach";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UpperSection } from "./results/upper-section";
import { LowerSection } from "./results/lower-section";
import { SpecialIndices } from "./results/special-indices";

interface RorschachResultsProps {
  results: CalculationResults;
}

export function RorschachResults({ results }: RorschachResultsProps) {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-2">Results</h1>

      <Tabs defaultValue="upper" className="w-full">
        <TabsList className="w-full justify-start mb-2">
          <TabsTrigger value="upper">Upper Section</TabsTrigger>
          <TabsTrigger value="lower">Lower Section</TabsTrigger>
          <TabsTrigger value="indices">Special Indices</TabsTrigger>
        </TabsList>

        <TabsContent value="upper" className="space-y-4">
          <UpperSection results={results} />
        </TabsContent>

        <TabsContent value="lower" className="space-y-4">
          <LowerSection results={results} />
        </TabsContent>

        <TabsContent value="indices" className="space-y-4">
          <SpecialIndices results={results} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
