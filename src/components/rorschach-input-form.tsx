import type { RorschachResponse } from "@/types/rorschach";
import { Z_SCORE_TABLE } from "@/lib/rorschach-constants";
import { classifyGPHR } from "@/lib/rorschach-calculator";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Trash2, Pencil } from "lucide-react";
import { useState } from "react";
import { EditResponseSheet } from "./edit-response-sheet";

interface RorschachInputFormProps {
  responses: RorschachResponse[];
  onChange: (responses: RorschachResponse[]) => void;
}

export function RorschachInputForm({
  responses,
  onChange,
}: RorschachInputFormProps) {
  const CARDS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
  const [editingResponse, setEditingResponse] = useState<{
    card: string;
    cardIndex: number;
    response: RorschachResponse;
  } | null>(null);
  const [deletingResponse, setDeletingResponse] = useState<{
    card: string;
    cardIndex: number;
  } | null>(null);

  const responsesByCard = CARDS.reduce(
    (acc, card) => {
      acc[card] = responses.filter((r) => r.card === card);
      return acc;
    },
    {} as Record<string, RorschachResponse[]>,
  );

  const addResponseForCard = (card: string) => {
    const cardResponses = responsesByCard[card];
    const nextResponseNumber = cardResponses.length + 1;

    const newResponse: RorschachResponse = {
      card,
      response_index: nextResponseNumber,
      location: "",
      location_number: undefined,
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
      gphr: "",
      zscore: undefined,
    };
    onChange([...responses, newResponse]);
  };

  const removeResponse = (card: string, cardResponseIndex: number) => {
    const cardResponses = responsesByCard[card];
    const responseToRemove = cardResponses[cardResponseIndex];
    const globalIndex = responses.indexOf(responseToRemove);
    const newResponses = responses.filter((_, i) => i !== globalIndex);
    onChange(newResponses);
    setDeletingResponse(null);
  };

  const confirmDelete = (card: string, cardResponseIndex: number) => {
    setDeletingResponse({ card, cardIndex: cardResponseIndex });
  };

  const openEditDialog = (card: string, cardResponseIndex: number) => {
    const cardResponses = responsesByCard[card];
    const response = cardResponses[cardResponseIndex];
    setEditingResponse({ card, cardIndex: cardResponseIndex, response });
  };

  const closeEditDialog = () => {
    setEditingResponse(null);
  };

  const handleSaveEdit = (editedData: RorschachResponse) => {
    if (!editingResponse) return;

    const { card, cardIndex } = editingResponse;
    const cardResponses = responsesByCard[card];
    const responseToUpdate = cardResponses[cardIndex];
    const globalIndex = responses.indexOf(responseToUpdate);

    const newResponses = [...responses];

    const gphr = classifyGPHR(editedData);
    const zType = editedData.z;
    let zscore = editedData.zscore;
    if (card && zType && Z_SCORE_TABLE[card]) {
      zscore =
        Z_SCORE_TABLE[card][zType as keyof (typeof Z_SCORE_TABLE)[typeof card]];
    }

    newResponses[globalIndex] = {
      ...editedData,
      response_index: responseToUpdate.response_index,
      gphr,
      zscore,
    };

    onChange(newResponses);
    closeEditDialog();
  };

  console.log("Rendering RorschachInputForm with responses:", responses);

  return (
    <>
      <h1 className="text-2xl font-bold mb-2">Input Table</h1>
      <div className="relative text-sm text-muted-foreground bg-accent p-4 rounded-lg border">
        <h3 className="font-semibold mb-2 text-accent-foreground">
          Instructions:
        </h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Responses are organized by card (I through X)</li>
          <li>
            Use the <strong>+ Add Response</strong> button on each card to add
            responses for that card
          </li>
          <li>Click "Calculate Scores" to view the structural summary</li>
        </ul>
      </div>
      <div className="space-y-6">
        {CARDS.map((card) => {
          const cardResponses = responsesByCard[card];
          return (
            <div key={card} className="border rounded-lg overflow-hidden">
              <div className="bg-background text-foreground px-4 py-3 flex justify-between items-center">
                <h3 className="text-lg font-bold">Card {card}</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addResponseForCard(card)}
                >
                  + Add Response
                </Button>
              </div>

              {cardResponses.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground bg-muted">
                  No responses yet. Click "Add Response" to add one.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-250 text-sm">
                    <thead>
                      <tr className="bg-muted border-y">
                        <th className="border-r p-2 font-semibold">#</th>
                        <th className="border-r p-2 font-semibold">Location</th>
                        <th className="border-r p-2 font-semibold">DQ</th>
                        <th className="border-r p-2 font-semibold">
                          Determinants
                        </th>
                        <th className="border-r p-2 font-semibold">FQ</th>
                        <th className="border-r p-2 font-semibold">(2)/r</th>
                        <th className="border-r p-2 font-semibold">Contents</th>
                        <th className="border-r p-2 font-semibold">P</th>
                        <th className="border-r p-2 font-semibold">Z</th>
                        <th className="border-r p-2 font-semibold">
                          Special Scores
                        </th>
                        <th className="p-2 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="[&>tr:last-child>td]:border-b-0">
                      {cardResponses.map((response, cardIndex) => (
                        <tr
                          key={response.response_index}
                          className={`hover:bg-muted/50 ${
                            editingResponse?.card === card &&
                            editingResponse?.cardIndex === cardIndex
                              ? "bg-blue-400/30"
                              : deletingResponse?.card === card &&
                                  deletingResponse?.cardIndex === cardIndex
                                ? "bg-red-400/20"
                                : ""
                          }`}
                        >
                          <td className="border-b border-r p-2 text-center font-medium">
                            {response.response_index}
                          </td>
                          <td className="border-b border-r p-2">
                            {response.location || ""}
                            {response.location_number
                              ? ` (${response.location_number})`
                              : ""}
                          </td>
                          <td className="border-b border-r p-2">
                            {response.dq || ""}
                          </td>
                          <td className="border-b border-r p-2">
                            {response.determinants?.join(", ") || ""}
                          </td>
                          <td className="border-b border-r p-2">
                            {response.fq || ""}
                          </td>
                          <td className="border-b border-r p-2">
                            {response.pair ? "(2)" : ""}
                            {response.rFScore
                              ? "/rF"
                              : response.FrScore
                                ? "/fR"
                                : ""}
                          </td>
                          <td className="border-b border-r p-2">
                            {response.contents?.join(", ") || ""}
                          </td>
                          <td className="border-b border-r p-2 text-center">
                            {response.popular ? "P" : ""}
                          </td>
                          <td className="border-b border-r p-2">
                            {response.z || ""}
                          </td>
                          <td className="border-b border-r p-2">
                            {response.special_scores?.join(", ") || ""}
                          </td>
                          <td className="border-b p-2 text-center">
                            <div className="flex gap-1 justify-center">
                              <Button
                                variant="outline"
                                size="icon-sm"
                                onClick={() => openEditDialog(card, cardIndex)}
                                title="Edit this response"
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="icon-sm"
                                onClick={() => confirmDelete(card, cardIndex)}
                                title="Remove this response"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <EditResponseSheet
        key={
          editingResponse
            ? `${editingResponse.card}-${editingResponse.cardIndex}`
            : "closed"
        }
        isOpen={editingResponse !== null}
        onClose={closeEditDialog}
        onSave={handleSaveEdit}
        response={editingResponse?.response || null}
        cardName={editingResponse?.card || ""}
      />

      <AlertDialog
        open={deletingResponse !== null}
        onOpenChange={(open) => !open && setDeletingResponse(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Response?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this response from Card{" "}
              {deletingResponse?.card}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deletingResponse) {
                  removeResponse(
                    deletingResponse.card,
                    deletingResponse.cardIndex,
                  );
                }
              }}
              variant="destructive"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
