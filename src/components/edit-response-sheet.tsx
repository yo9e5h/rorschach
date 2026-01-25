import type { RorschachResponse } from "@/types/rorschach";
import { SCORING_OPTIONS } from "@/lib/rorschach-constants";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Trash2 } from "lucide-react";

interface EditResponseSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (editedData: RorschachResponse) => void;
  response: RorschachResponse | null;
  cardName: string;
}

export function EditResponseSheet({
  isOpen,
  onClose,
  onSave,
  response,
  cardName,
}: EditResponseSheetProps) {
  const [localEditedData, setLocalEditedData] =
    useState<RorschachResponse | null>(response ? { ...response } : null);

  const updateEditedField = (
    field: keyof RorschachResponse,
    value: unknown,
  ) => {
    if (!localEditedData) return;
    setLocalEditedData({ ...localEditedData, [field]: value });
  };

  const updateEditedArrayField = (
    field: "determinants" | "contents" | "special_scores",
    index: number,
    value: string,
  ) => {
    if (!localEditedData) return;
    const currentArray = [...(localEditedData[field] || [])];

    if (value === "") {
      currentArray.splice(index, 1);
    } else {
      currentArray[index] = value;
    }

    setLocalEditedData({ ...localEditedData, [field]: currentArray });
  };

  const handleSave = () => {
    if (localEditedData) {
      onSave(localEditedData);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-lg flex flex-col p-0">
        <SheetHeader className="px-6 pt-6 pb-4">
          <SheetTitle>
            Edit Response - Card {cardName} - Response{" "}
            {response?.response_index}
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-1 px-6">
          {localEditedData && (
            <div className="space-y-6 pb-6">
              {/* Location */}
              <div className="space-y-2">
                <Label>Location</Label>
                <RadioGroup
                  value={localEditedData.location || ""}
                  onValueChange={(value) => {
                    updateEditedField("location", value);
                  }}
                >
                  <div className="flex flex-wrap gap-4">
                    {["W", "WS", "D", "DS", "Dd", "DdS"].map((loc) => (
                      <div key={loc} className="flex items-center space-x-2">
                        <RadioGroupItem value={loc} id={`loc-${loc}`} />
                        <Label htmlFor={`loc-${loc}`}>{loc}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* DQ */}
              <div className="space-y-2">
                <Label>DQ (Developmental Quality)</Label>
                <RadioGroup
                  value={localEditedData.dq || ""}
                  onValueChange={(value) => updateEditedField("dq", value)}
                >
                  <div className="flex flex-wrap gap-4">
                    {["+", "o", "v/+", "v"].map((dq) => (
                      <div key={dq} className="flex items-center space-x-2">
                        <RadioGroupItem value={dq} id={`dq-${dq}`} />
                        <Label htmlFor={`dq-${dq}`}>{dq}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Determinants */}
              <div className="space-y-2">
                <Label>Determinants</Label>
                {(localEditedData.determinants || []).length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {(localEditedData.determinants || []).map((det, idx) => (
                      <div
                        key={idx}
                        className="flex items-center bg-background border rounded-md text-sm h-8"
                      >
                        <span className="px-2 py-1">{det}</span>
                        <Button
                          variant="outline"
                          className="hover:text-red-500 rounded-md border-0 h-full w-4 p-0"
                          onClick={() =>
                            updateEditedArrayField("determinants", idx, "")
                          }
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                <Select
                  value=""
                  onValueChange={(value) => {
                    if (value && localEditedData) {
                      const currentDets = [
                        ...(localEditedData.determinants || []),
                      ];
                      if (!currentDets.includes(value)) {
                        currentDets.push(value);
                        setLocalEditedData({
                          ...localEditedData,
                          determinants: currentDets,
                        });
                      }
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a determinant to add" />
                  </SelectTrigger>
                  <SelectContent>
                    {SCORING_OPTIONS.determinants
                      .filter((d) => d !== "")
                      .map((d) => (
                        <SelectItem
                          key={d}
                          value={d}
                          disabled={localEditedData.determinants?.includes(d)}
                        >
                          {d}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {/* FQ */}
              <div className="space-y-2">
                <Label>FQ (Form Quality)</Label>
                <RadioGroup
                  value={localEditedData.fq || ""}
                  onValueChange={(value) => updateEditedField("fq", value)}
                >
                  <div className="flex flex-wrap gap-4">
                    {["+", "o", "u", "-", "none"].map((fq) => (
                      <div key={fq} className="flex items-center space-x-2">
                        <RadioGroupItem value={fq} id={`fq-${fq}`} />
                        <Label htmlFor={`fq-${fq}`}>{fq}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Pair */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pair"
                  checked={localEditedData.pair === true}
                  onCheckedChange={(checked) =>
                    updateEditedField("pair", checked === true)
                  }
                />
                <Label htmlFor="pair">Pair (2)</Label>
              </div>

              {/* Reflection Scores */}
              <div className="space-y-2">
                <Label>Reflection Responses</Label>
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="frScore"
                      checked={localEditedData.FrScore === true}
                      onCheckedChange={(checked) =>
                        updateEditedField("FrScore", checked === true)
                      }
                    />
                    <Label htmlFor="frScore">Fr (Form-Reflection)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rFScore"
                      checked={localEditedData.rFScore === true}
                      onCheckedChange={(checked) =>
                        updateEditedField("rFScore", checked === true)
                      }
                    />
                    <Label htmlFor="rFScore">rF (Reflection-Form)</Label>
                  </div>
                </div>
              </div>

              {/* Contents */}
              <div className="space-y-2">
                <Label>Contents</Label>
                {(localEditedData.contents || []).length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {(localEditedData.contents || []).map((cont, idx) => (
                      <div
                        key={idx}
                        className="flex items-center bg-background border rounded-md text-sm h-8"
                      >
                        <span className="px-2 py-1">{cont}</span>
                        <Button
                          variant="outline"
                          className="hover:text-red-500 rounded-md border-0 h-full w-4 p-0"
                          onClick={() =>
                            updateEditedArrayField("contents", idx, "")
                          }
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                <Select
                  value=""
                  onValueChange={(value) => {
                    if (value && localEditedData) {
                      const currentContents = [
                        ...(localEditedData.contents || []),
                      ];
                      if (!currentContents.includes(value)) {
                        currentContents.push(value);
                        setLocalEditedData({
                          ...localEditedData,
                          contents: currentContents,
                        });
                      }
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a content to add" />
                  </SelectTrigger>
                  <SelectContent>
                    {SCORING_OPTIONS.contents
                      .filter((c) => c !== "")
                      .map((c) => (
                        <SelectItem
                          key={c}
                          value={c}
                          disabled={localEditedData.contents?.includes(c)}
                        >
                          {c}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Popular */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="popular"
                  checked={localEditedData.popular || false}
                  onCheckedChange={(checked) =>
                    updateEditedField("popular", checked === true)
                  }
                />
                <Label htmlFor="popular">Popular</Label>
              </div>

              {/* Z-Score */}
              <div className="space-y-2">
                <Label>Z-Score</Label>
                <RadioGroup
                  value={localEditedData.z || ""}
                  onValueChange={(value) => updateEditedField("z", value)}
                >
                  <div className="flex flex-wrap gap-4">
                    {SCORING_OPTIONS.zScores.map((z) => (
                      <div key={z} className="flex items-center space-x-2">
                        <RadioGroupItem value={z} id={`z-${z}`} />
                        <Label htmlFor={`z-${z}`}>{z}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Special Scores</Label>
                {(localEditedData.special_scores || []).length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {(localEditedData.special_scores || []).map((ss, idx) => (
                      <div
                        key={idx}
                        className="flex items-center bg-background border rounded-md text-sm h-8"
                      >
                        <span className="px-2 py-1">{ss}</span>
                        <Button
                          variant="outline"
                          className="hover:text-red-500 rounded-md border-0 h-full w-4 p-0"
                          onClick={() =>
                            updateEditedArrayField("special_scores", idx, "")
                          }
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <Select
                  value=""
                  onValueChange={(value) => {
                    if (value && localEditedData) {
                      const currentScores = [
                        ...(localEditedData.special_scores || []),
                      ];
                      if (!currentScores.includes(value)) {
                        currentScores.push(value);
                        setLocalEditedData({
                          ...localEditedData,
                          special_scores: currentScores,
                        });
                      }
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a special score to add" />
                  </SelectTrigger>
                  <SelectContent>
                    {SCORING_OPTIONS.specialScores.map((s) => (
                      <SelectItem
                        key={s}
                        value={s}
                        disabled={localEditedData.special_scores?.includes(s)}
                      >
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </ScrollArea>
        <div className="flex justify-end gap-2 px-6 py-4 border-t bg-background">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
