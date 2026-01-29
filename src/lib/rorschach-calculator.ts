import type {
  RorschachResponse,
  CalculationResults,
  SearchStrategy,
} from "@/types/rorschach";
import {
  Z_SCORE_TABLE,
  ZEST_TABLE,
  WSUM6_WEIGHTS,
} from "./rorschach-constants";

/**
 * Get search strategies based on key variables
 */
export function getKeyVariableStrategies(
  results: CalculationResults,
): SearchStrategy[] {
  const strategies: SearchStrategy[] = [];

  // PTI > 3
  const ptiValue =
    typeof results.PTI === "string" ? parseInt(results.PTI) : results.PTI;
  if (ptiValue > 3) {
    strategies.push({
      variable: "PTI > 3",
      routine:
        "Processing > Mediation > Ideation > Controls > Affect > Self-Perception > Interpersonal Perception",
      isPrimary: true,
    });
  }

  // DEPI > 5 and CDI > 3
  const depiValue =
    typeof results.DEPI === "string" ? parseInt(results.DEPI) : results.DEPI;
  const cdiValue =
    typeof results.CDI === "string" ? parseInt(results.CDI) : results.CDI;
  if (depiValue > 5 && cdiValue > 3) {
    strategies.push({
      variable: "DEPI > 5 and CDI > 3",
      routine:
        "Interpersonal Perception > Self-Perception > Controls > Affect > Processing > Mediation > Ideation",
      isPrimary: true,
    });
  }

  // DEPI > 5
  if (depiValue > 5) {
    strategies.push({
      variable: "DEPI > 5",
      routine:
        "Affect > Controls > Self-Perception > Interpersonal Perception > Processing > Mediation > Ideation",
      isPrimary: true,
    });
  }

  // D < ADJ D
  const dScore = typeof results.D_score === "number" ? results.D_score : 0;
  const adjD = typeof results.AdjD === "number" ? results.AdjD : 0;
  if (dScore < adjD) {
    strategies.push({
      variable: "D < ADJ D",
      routine:
        "Controls > Situation Stress > (The remaining search routine should be that identified for the next positive key variable or the list of tertiary variables.)",
      isPrimary: true,
    });
  }

  // CDI > 3
  if (cdiValue > 3) {
    strategies.push({
      variable: "CDI > 3",
      routine:
        "Controls > Interpersonal Perception > Self-Perception > Affect > Processing > Mediation > Ideation",
      isPrimary: true,
    });
  }

  // ADJ D is Minus
  if (adjD < 0) {
    strategies.push({
      variable: "ADJ D is Minus",
      routine:
        "Controls > (The remaining search routine should be that identified for the next positive key variable or the list of tertiary variables.)",
      isPrimary: true,
    });
  }

  // Lambda > 0.99
  if (results.Lambda > 0.99) {
    strategies.push({
      variable: "Lambda > 0.99",
      routine:
        "Processing > Mediation > Ideation > Controls > Affect > Self-Perception > Interpersonal Perception",
      isPrimary: true,
    });
  }

  // FR+RF > 0
  if (results.Fr + results.rF > 0) {
    strategies.push({
      variable: "FR+RF > 0",
      routine:
        "Self-Perception > Interpersonal Perception > Controls (The remaining search routine should be selected from that identified for the next positive key variable or the list of tertiary variables.)",
      isPrimary: true,
    });
  }

  // EB IS Introversive
  if (results.CopingStyle === "Introversive") {
    strategies.push({
      variable: "EB IS Introversive",
      routine:
        "Ideation > Processing > Mediation > Controls > Affect > Self-Perception > Interpersonal Perception",
      isPrimary: true,
    });
  }

  // EB IS Extratensive
  if (results.CopingStyle === "Extratensive") {
    strategies.push({
      variable: "EB IS Extratensive",
      routine:
        "Affect > Self-Perception > Interpersonal Perception > Controls > Processing > Mediation > Ideation",
      isPrimary: true,
    });
  }

  // p > a+1
  if (results.passive_movement > results.active_movement + 1) {
    strategies.push({
      variable: "p > a+1",
      routine:
        "Ideation > Processing > Mediation > Controls > Self-Perception > Interpersonal Perception > Affect",
      isPrimary: true,
    });
  }

  // HVI Positive
  if (results.HVI.toLowerCase().includes("positive")) {
    strategies.push({
      variable: "HVI Positive",
      routine:
        "Ideation > Processing > Mediation > Controls > Self-Perception > Interpersonal Perception > Affect",
      isPrimary: true,
    });
  }

  return strategies;
}

/**
 * Get search strategies based on tertiary variables
 */
export function getTertiaryVariableStrategies(
  results: CalculationResults,
): SearchStrategy[] {
  const strategies: SearchStrategy[] = [];

  // OBS Positive
  if (results.OBS.toLowerCase().includes("positive")) {
    strategies.push({
      variable: "OBS Positive",
      routine:
        "Processing > Mediation > Ideation > Controls > Affect > Self-Perception > Interpersonal Perception",
      isPrimary: false,
    });
  }

  // DEPI = 5
  const depiValue =
    typeof results.DEPI === "string" ? parseInt(results.DEPI) : results.DEPI;
  if (depiValue === 5) {
    strategies.push({
      variable: "DEPI = 5",
      routine:
        "Affect > Controls > Self-Perception > Interpersonal Perception > Processing > Mediation > Ideation",
      isPrimary: false,
    });
  }

  // EA > 12
  if (results.EA > 12) {
    strategies.push({
      variable: "EA > 12",
      routine:
        "Controls > Ideation > Processing > Mediation > Affect > Self-Perception > Interpersonal Perception",
      isPrimary: false,
    });
  }

  // M- > 0 or Mp > Ma or Sum6 Sp Sc > 5
  if (results.MQual_minus > 0 || results.Mp > results.Ma || results.Sum6 > 5) {
    strategies.push({
      variable: "M- > 0 or Mp > Ma or Sum6 Sp Sc > 5",
      routine:
        "Ideation > Mediation > Processing > Controls > Affect > Self-Perception > Interpersonal Perception",
      isPrimary: false,
    });
  }

  // Sum Shad > FM+m or CP+C > FC+1 or Afr < 0.46
  if (
    results.SumShading > results.FM + results.m ||
    results.CP + results.C > results.FC + 1 ||
    results.Afr < 0.46
  ) {
    strategies.push({
      variable: "Sum Shad > FM+m or CP+C > FC+1 or Afr < 0.46",
      routine:
        "Affect > Controls > Self-Perception > Interpersonal Perception > Processing > Mediation > Ideation",
      isPrimary: false,
    });
  }

  // X-% > 20% or Zd > +3.0 or < -3.0
  const zdValue = typeof results.Zd === "number" ? results.Zd : 0;
  if (results.X_minus_percent > 0.2 || zdValue > 3.0 || zdValue < -3.0) {
    strategies.push({
      variable: "X-% > 20% or Zd > +3.0 or < -3.0",
      routine:
        "Processing > Mediation > Ideation > Controls > Affect > Self-Perception > Interpersonal Perception",
      isPrimary: false,
    });
  }

  // 3r+(2)/R < .33
  if (results.EgocentricityIndex < 0.33) {
    strategies.push({
      variable: "3r+(2)/R < .33",
      routine:
        "Self-Perception > Interpersonal Perception > Affect > Controls > Processing > Mediation > Ideation",
      isPrimary: false,
    });
  }

  // MOR > 2 or AG > 2
  if (results.MOR > 2 || results.AG > 2) {
    strategies.push({
      variable: "MOR > 2 or AG > 2",
      routine:
        "Self-Perception > Interpersonal Perception > Controls > Ideation > Processing > Mediation > Affect",
      isPrimary: false,
    });
  }

  // T = 0 or > 1
  if (results.SumT === 0 || results.SumT > 1) {
    strategies.push({
      variable: "T = 0 or > 1",
      routine:
        "Self-Perception > Interpersonal Perception > Affect > Controls > Processing > Mediation > Ideation",
      isPrimary: false,
    });
  }

  return strategies;
}

/**
 * Get ZEst value from Zf (number of Z-scored responses)
 */
export function zestFromZf(zf: number): number | null {
  if (!Number.isFinite(zf) || zf < 1 || zf > 50) return null;
  return ZEST_TABLE[zf - 1];
}

/**
 * D-Score lookup table
 * Input: EA - es (or EA - Adj es), range: -15 to +15
 */
export function dTable(x: number): number | string {
  if (!Number.isFinite(x)) return "-";
  const absX = Math.abs(x);
  let d: number;

  if (absX < 2.5) d = 0;
  else if (absX < 5.0) d = 1;
  else if (absX < 7.5) d = 2;
  else if (absX < 10.0) d = 3;
  else if (absX < 12.5) d = 4;
  else d = 5;

  return x < 0 ? -d : d;
}

/**
 * Determine coping style based on EB (Experience Balance) and Lambda
 *
 * Rules:
 * 1. If EA < 4.0 and Lambda > 0.99 → Avoidant
 * 2. Introversive: M > WSumC by 2+ (EA ≤ 10) or more than 2 (EA > 10)
 * 3. Extratensive: WSumC > M by 2+ (EA ≤ 10) or more than 2 (EA > 10)
 * 4. Ambitent: Neither side markedly different
 *
 * Special cases (should be evaluated carefully):
 * - If M = 0 and WSumC > 3.5: May indicate being overwhelmed rather than true extratensive
 * - If WSumC = 0 and M ≥ 3: May indicate being overwhelmed rather than true introversive
 */
export function determineCopingStyle(
  M: number,
  WSumC: number,
  EA: number,
  Lambda: number,
): string {
  // Exception 1: Avoidant style if EA < 4.0 and Lambda > 0.99
  if (EA < 4.0 && Lambda > 0.99) {
    return "Avoidant";
  }

  // Calculate the difference between M and WSumC
  const diff = Math.abs(M - WSumC);

  // Determine threshold based on EA
  const threshold = EA <= 10 ? 2 : 2;
  const needsMoreThan2 = EA > 10;

  // Check for coping style
  if (needsMoreThan2 ? diff > threshold : diff >= threshold) {
    if (M > WSumC) {
      // Exception 2: Check if being overwhelmed (WSumC = 0 and M ≥ 3)
      if (WSumC === 0 && M >= 3) {
        return "Introversive (verify not overwhelmed)";
      }
      return "Introversive";
    } else {
      // Exception 2: Check if being overwhelmed (M = 0 and WSumC > 3.5)
      if (M === 0 && WSumC > 3.5) {
        return "Extratensive (verify not overwhelmed)";
      }
      return "Extratensive";
    }
  }

  // No distinctive style
  return "Ambitent";
}

/**
 * Classify response as GHR (Good Human Representation) or PHR (Poor Human Representation)
 */
export function classifyGPHR(r: RorschachResponse): string {
  const hasAnyContent = (arr: string[]) =>
    Array.isArray(r.contents) && r.contents.some((c) => arr.includes(c));
  const hasAnySS = (arr: string[]) =>
    Array.isArray(r.special_scores) &&
    r.special_scores.some((s) => arr.includes(s));
  const hasAnyDet = (arr: string[]) =>
    Array.isArray(r.determinants) &&
    r.determinants.some((d) => arr.includes(d));

  const hasHumanContent = hasAnyContent(["H", "(H)", "Hd", "(Hd)", "Hx"]);
  const hasHumanMovement = hasAnyDet(["M", "Ma", "Mp", "Ma-p"]);
  const hasAnimalMovement = hasAnyDet(["FMa", "FMp", "FMa-p"]);
  const hasCopOrAg = hasAnySS(["COP", "AG"]);

  const isEligible =
    hasHumanContent || hasHumanMovement || (hasAnimalMovement && hasCopOrAg);
  if (!isEligible) return "";

  const FQ = r.fq;
  const popular = r.popular;
  const card = r.card;
  const isPureH = hasAnyContent(["H"]);
  const isGoodFQ = ["+", "o", "u"].includes(FQ);
  const hasBadCognitiveSS = hasAnySS([
    "DR1",
    "DR2",
    "INCOM1",
    "INCOM2",
    "FABCOM1",
    "FABCOM2",
    "ALOG",
    "CONTAM",
  ]);
  const hasAgOrMor = hasAnySS(["AG", "MOR"]);

  if (isPureH && isGoodFQ && !hasBadCognitiveSS && !hasAgOrMor) return "GHR";

  const isBadFQ = FQ === "-" || FQ === "none";
  const hasLevel2SS = hasAnySS([
    "ALOG",
    "CONTAM",
    "DV2",
    "INCOM2",
    "DR2",
    "FABCOM2",
  ]);
  if (isBadFQ || hasLevel2SS) return "PHR";

  if (hasAnySS(["COP"]) && !hasAnySS(["AG"])) return "GHR";

  if (hasAnySS(["FABCOM1", "MOR"]) || hasAnyContent(["An"])) return "PHR";

  if (popular && ["III", "IV", "VII", "IX"].includes(card)) return "GHR";

  if (hasAnySS(["AG", "INCOM1", "DR1"]) || hasAnyContent(["Hd"])) return "PHR";

  return "GHR";
}

/**
 * Main Rorschach calculation function
 */
export function calculateRorschach(
  responses: RorschachResponse[],
): CalculationResults {
  const validResponses = responses.filter((r) => r.card && r.card !== "");
  const R = validResponses.length;

  const exactCount = (
    tok: string,
    field: keyof RorschachResponse = "determinants",
  ) =>
    validResponses.reduce((acc, r) => {
      const arr = r[field];
      if (!Array.isArray(arr)) return acc;
      return acc + arr.filter((x) => x === tok).length;
    }, 0);

  const countContainsAny = (
    subs: string[],
    field: keyof RorschachResponse = "determinants",
  ) =>
    validResponses.reduce((acc, r) => {
      const arr = r[field];
      if (!Array.isArray(arr)) return acc;
      return (
        acc + arr.filter((x) => subs.some((s) => String(x).includes(s))).length
      );
    }, 0);

  const countLoc = (vals: string[]) =>
    validResponses.filter((r) => vals.includes(r.location)).length;

  // ===== Z-SCORES =====
  const Zf = validResponses.filter((r) => r.z).length;
  const ZSum = validResponses.reduce((acc, r) => {
    if (
      r.card &&
      r.z &&
      Z_SCORE_TABLE[r.card] &&
      Z_SCORE_TABLE[r.card][r.z as keyof typeof Z_SCORE_TABLE.I]
    ) {
      return acc + Z_SCORE_TABLE[r.card][r.z as keyof typeof Z_SCORE_TABLE.I];
    }
    return acc;
  }, 0);

  const _ZEst = zestFromZf(Zf);
  const ZEst = _ZEst === null ? "-" : _ZEst;
  const Zd = typeof ZEst === "number" ? ZSum - ZEst : "-";

  // ===== LOCATION =====
  const W = countLoc(["W", "WS"]);
  const D = countLoc(["D", "DS"]);
  const Dd = countLoc(["Dd", "DdS"]);
  const S = countLoc(["S", "WS", "DS", "DdS"]);

  // ===== DQ =====
  const DQ_plus = validResponses.filter((r) => r.dq === "+").length;
  const DQ_o = validResponses.filter((r) => r.dq === "o").length;
  const DQ_v_plus = validResponses.filter((r) => r.dq === "v/+").length;
  const DQ_v = validResponses.filter((r) => r.dq === "v").length;

  // ===== DETERMINANTS =====
  const M =
    exactCount("M") + exactCount("Ma") + exactCount("Mp") + exactCount("Ma-p");
  const FM =
    exactCount("FM") +
    exactCount("FMa") +
    exactCount("FMp") +
    exactCount("FMa-p");
  const m =
    exactCount("m") + exactCount("ma") + exactCount("mp") + exactCount("ma-p");

  const FC = exactCount("FC");
  const CF = exactCount("CF");
  const C = exactCount("C");
  const Cn = exactCount("Cn");
  const WSumC = 0.5 * FC + 1.0 * CF + 1.5 * C;

  const SumC_prime = countContainsAny(["C'"]);
  const SumT = countContainsAny(["T"]);
  const SumV = countContainsAny(["V"]);
  const SumY = countContainsAny(["Y"]);
  const SumShading = SumC_prime + SumT + SumV + SumY;

  const Fr = validResponses.filter((r) => r.FrScore === true).length;
  const rF = validResponses.filter((r) => r.rFScore === true).length;
  const FD = exactCount("FD");

  const F_pure = validResponses.filter(
    (r) => r.determinants.length === 1 && r.determinants[0] === "F",
  ).length;

  // ===== BLENDS =====
  const Blends = validResponses.filter((r) => r.determinants.length > 1).length;
  const blends_list = validResponses
    .filter((r) => r.determinants.length > 1)
    .map((r) => r.determinants);

  const isColorDet = (d: string) => ["FC", "CF", "C"].includes(d);
  const isShadingDet = (d: string) =>
    d.includes("C'") || d.includes("T") || d.includes("V") || d.includes("Y");
  const ColorShadingBlends = validResponses.filter(
    (r) =>
      r.determinants.length > 1 &&
      r.determinants.some(isColorDet) &&
      r.determinants.some(isShadingDet),
  ).length;

  // ===== EA / es / D / Adj D =====
  const EA = M + WSumC;
  const es_left = FM + m;
  const es = es_left + SumShading;
  const AdjEs = es - Math.max(0, m - 1) - Math.max(0, SumY - 1);

  const D_score = dTable(EA - es);
  const AdjD = dTable(EA - AdjEs);

  // ===== EB Per =====
  let EBPer: number | string = "-";
  if (M > 0 || WSumC > 0) {
    if (M / (WSumC || 1) > 2.5 && EA >= 4.0) {
      EBPer = M / (WSumC || 0.0001);
    } else if (WSumC / (M || 1) > 2.5 && EA >= 4.0) {
      EBPer = WSumC / (M || 0.0001);
    }
    if (typeof EBPer === "number") {
      EBPer = Number(EBPer.toFixed(2));
    }
  }

  // ===== LAMBDA =====
  const Lambda = R - F_pure !== 0 ? F_pure / (R - F_pure) : 0;

  // ===== COPING STYLE =====
  const CopingStyle = determineCopingStyle(M, WSumC, EA, Lambda);

  // ===== FORM QUALITY =====
  const FQx_plus = validResponses.filter((r) => r.fq === "+").length;
  const FQx_o = validResponses.filter((r) => r.fq === "o").length;
  const FQx_u = validResponses.filter((r) => r.fq === "u").length;
  const FQx_minus = validResponses.filter((r) => r.fq === "-").length;
  const FQx_none = validResponses.filter((r) => r.fq === "none").length;

  const XA_percent = R > 0 ? (FQx_plus + FQx_o + FQx_u) / R : 0;
  const X_plus_percent = R > 0 ? (FQx_plus + FQx_o) / R : 0;
  const Xu_percent = R > 0 ? FQx_u / R : 0;
  const X_minus_percent = R > 0 ? FQx_minus / R : 0;

  // WDA%
  const WD_resps = validResponses.filter((r) =>
    ["W", "WS", "D", "DS"].includes(r.location),
  );
  const W_plus_D = WD_resps.length;
  const W_plus_D_good_fq = WD_resps.filter((r) =>
    ["+", "o", "u"].includes(r.fq),
  ).length;
  const WDA_percent = W_plus_D > 0 ? W_plus_D_good_fq / W_plus_D : 0;

  // S-
  const S_locations = validResponses.filter((r) =>
    ["S", "WS", "DS", "DdS"].includes(r.location),
  );
  const S_minus = S_locations.filter((r) => r.fq === "-").length;

  // M Quality
  const MQual_minus = validResponses.filter(
    (r) =>
      r.fq === "-" &&
      r.determinants.some((d) => ["M", "Ma", "Mp", "Ma-p"].includes(d)),
  ).length;
  const MQual_plus = validResponses.filter(
    (r) =>
      r.fq === "+" &&
      r.determinants.some((d) => ["M", "Ma", "Mp", "Ma-p"].includes(d)),
  ).length;
  const MQual_o = validResponses.filter(
    (r) =>
      r.fq === "o" &&
      r.determinants.some((d) => ["M", "Ma", "Mp", "Ma-p"].includes(d)),
  ).length;
  const MQual_u = validResponses.filter(
    (r) =>
      r.fq === "u" &&
      r.determinants.some((d) => ["M", "Ma", "Mp", "Ma-p"].includes(d)),
  ).length;
  const MQual_none = validResponses.filter(
    (r) =>
      r.fq === "none" &&
      r.determinants.some((d) => ["M", "Ma", "Mp", "Ma-p"].includes(d)),
  ).length;

  // ===== POPULARS & AFR =====
  const Populars = validResponses.filter((r) => r.popular).length;
  const lastThreeCardsCount = validResponses.filter((r) =>
    ["VIII", "IX", "X"].includes(r.card),
  ).length;
  const firstSevenCardsCount = R - lastThreeCardsCount;
  const Afr =
    firstSevenCardsCount > 0 ? lastThreeCardsCount / firstSevenCardsCount : 0;

  // ===== GHR / PHR =====
  const GHR = validResponses.filter((r) => classifyGPHR(r) === "GHR").length;
  const PHR = validResponses.filter((r) => classifyGPHR(r) === "PHR").length;

  // ===== CONTENTS =====
  const H = exactCount("H", "contents");
  const H_paren = exactCount("(H)", "contents");
  const Hd = exactCount("Hd", "contents");
  const Hd_paren = exactCount("(Hd)", "contents");
  const Hx = exactCount("Hx", "contents");
  const A = exactCount("A", "contents");
  const A_paren = exactCount("(A)", "contents");
  const Ad = exactCount("Ad", "contents");
  const Ad_paren = exactCount("(Ad)", "contents");
  const An = exactCount("An", "contents");
  const Art = exactCount("Art", "contents");
  const Ay = exactCount("Ay", "contents");
  const Bl = exactCount("Bl", "contents");
  const Bt = exactCount("Bt", "contents");
  const Cg = exactCount("Cg", "contents");
  const Cl = exactCount("Cl", "contents");
  const Ex = exactCount("Ex", "contents");
  const Fd = exactCount("Fd", "contents");
  const Fi = exactCount("Fi", "contents");
  const Ge = exactCount("Ge", "contents");
  const Hh = exactCount("Hh", "contents");
  const Ls = exactCount("Ls", "contents");
  const Na = exactCount("Na", "contents");
  const Sc = exactCount("Sc", "contents");
  const Sx = exactCount("Sx", "contents");
  const Xy = exactCount("Xy", "contents");
  const Id = exactCount("Id", "contents");

  const H_total = H + H_paren + Hd + Hd_paren;

  // ===== SPECIAL SCORES =====
  const DV1 = exactCount("DV1", "special_scores");
  const DV2 = exactCount("DV2", "special_scores");
  const INCOM1 = exactCount("INCOM1", "special_scores");
  const INCOM2 = exactCount("INCOM2", "special_scores");
  const DR1 = exactCount("DR1", "special_scores");
  const DR2 = exactCount("DR2", "special_scores");
  const FABCOM1 = exactCount("FABCOM1", "special_scores");
  const FABCOM2 = exactCount("FABCOM2", "special_scores");
  const ALOG = exactCount("ALOG", "special_scores");
  const CONTAM = exactCount("CONTAM", "special_scores");

  const Sum6 =
    DV1 + DV2 + INCOM1 + INCOM2 + DR1 + DR2 + FABCOM1 + FABCOM2 + ALOG + CONTAM;
  const WSum6 = validResponses.reduce((acc, r) => {
    if (!Array.isArray(r.special_scores)) return acc;
    return (
      acc + r.special_scores.reduce((s, ss) => s + (WSUM6_WEIGHTS[ss] || 0), 0)
    );
  }, 0);

  const AB = exactCount("AB", "special_scores");
  const AG = exactCount("AG", "special_scores");
  const COP = exactCount("COP", "special_scores");
  const CP = exactCount("CP", "special_scores");
  const MOR = exactCount("MOR", "special_scores");
  const PER = exactCount("PER", "special_scores");
  const PSV = exactCount("PSV", "special_scores");

  // ===== ADDITIONAL CALCULATIONS =====
  const Ma = exactCount("Ma") + exactCount("Ma-p");
  const Mp = exactCount("Mp") + exactCount("Ma-p");
  const active_movement = countContainsAny(["Ma", "FMa", "ma"]);
  const passive_movement = countContainsAny(["Mp", "FMp", "mp"]);

  const F_pairs = validResponses.filter((r) => r.pair === true).length;
  const EgocentricityIndex = R > 0 ? ((Fr + rF) * 3 + F_pairs) / R : 0;
  const IsolateIndex = R > 0 ? (Bt + 2 * Cl + Ge + Ls + 2 * Na) / R : 0;

  const Level2_count = DV2 + INCOM2 + DR2 + FABCOM2;
  const Lv2 = Level2_count;

  // ===== SPECIAL INDICES =====

  // PTI
  const pti_criteria = {
    c1: XA_percent < 0.7 && WDA_percent < 0.75,
    c2: X_minus_percent > 0.29,
    c3: Level2_count > 2 && FABCOM2 > 0,
    c4: (R < 17 && WSum6 > 12) || (R > 16 && WSum6 > 17),
    c5: MQual_minus > 1 || X_minus_percent > 0.4,
  };
  const pti_score = Object.values(pti_criteria).filter(
    (v) => v === true,
  ).length;
  const PTI = `${pti_score}`;

  // DEPI
  const depi_criteria = {
    c1: SumV > 0 || FD > 2,
    c2: ColorShadingBlends > 0 || S > 2,
    c3:
      (EgocentricityIndex > 0.44 && Fr + rF === 0) || EgocentricityIndex < 0.33,
    c4: Afr < 0.46 || Blends < 4,
    c5: SumShading > FM + m || SumC_prime > 2,
    c6: MOR > 2 || 2 * AB + Art + Ay > 3,
    c7: COP < 2 || IsolateIndex > 0.24,
  };
  const depi_score = Object.values(depi_criteria).filter(
    (v) => v === true,
  ).length;
  const DEPI = `${depi_score}, ${depi_score >= 5 ? "Positive" : "NO"}`;

  // CDI
  const cdi_criteria = {
    c1: EA < 6 || (typeof AdjD === "number" && AdjD < 0),
    c2: COP < 2 && AG < 2,
    c3: WSumC < 2.5 || Afr < 0.46,
    c4: passive_movement > active_movement + 1 || H < 2,
    c5: SumT > 1 || IsolateIndex > 0.24 || Fd > 0,
  };
  const cdi_score = Object.values(cdi_criteria).filter(
    (v) => v === true,
  ).length;
  const CDI = `${cdi_score}, ${cdi_score >= 4 ? "Positive" : "NO"}`;

  // S-CON
  const scon_criteria = {
    c1: SumV + SumV + SumV + FD > 2,
    c2: ColorShadingBlends > 0,
    c3: EgocentricityIndex < 0.31 || EgocentricityIndex > 0.44,
    c4: MOR > 3,
    c5: typeof Zd === "number" && (Zd < -3.5 || Zd > 3.5),
    c6: es > EA,
    c7: CF + C > FC,
    c8: X_plus_percent < 0.7,
    c9: S > 3,
    c10: Populars < 3 || Populars > 8,
    c11: H < 2,
    c12: R < 17,
  };
  const scon_score = Object.values(scon_criteria).filter(
    (v) => v === true,
  ).length;
  const SCON = `${scon_score}, ${scon_score >= 8 ? "Positive" : "NO"}`;

  // HVI
  const hvi_criteria = {
    c1: SumT === 0,
    c2: Zf > 12,
    c3: typeof Zd === "number" && Zd > 3.0,
    c4: S > 3,
    c5: H_total > 6,
  };
  const hvi_sub_score = Object.keys(hvi_criteria)
    .slice(1)
    .reduce(
      (acc, key) =>
        acc + (hvi_criteria[key as keyof typeof hvi_criteria] ? 1 : 0),
      0,
    );
  const is_hvi_positive = hvi_criteria.c1 && hvi_sub_score >= 4;
  const HVI = `${hvi_sub_score}, ${is_hvi_positive ? "Positive" : "NO"}`;

  // OBS
  const obs_criteria = {
    c1: Dd > 3,
    c2: Zf > 12,
    c3: typeof Zd === "number" && Zd > 3.0,
    c4: Populars > 7,
    c5: FQx_plus > 1,
  };

  const criteria_1_to_4_count = [
    obs_criteria.c1,
    obs_criteria.c2,
    obs_criteria.c3,
    obs_criteria.c4,
  ].filter((v) => v).length;

  const criteria_1_to_5_count = [
    obs_criteria.c1,
    obs_criteria.c2,
    obs_criteria.c3,
    obs_criteria.c4,
    obs_criteria.c5,
  ].filter((v) => v).length;

  const obs_rules = {
    r1: criteria_1_to_5_count === 5,
    r2: criteria_1_to_4_count >= 2 && FQx_plus > 3,
    r3: criteria_1_to_5_count >= 3 && X_plus_percent > 0.89,
    r4: FQx_plus > 3 && X_plus_percent > 0.89,
  };

  const obs_score = Object.values(obs_rules).filter((v) => v).length;
  const is_obs_positive = obs_score > 0;
  const OBS = `${obs_score}, ${is_obs_positive ? "Positive" : "NO"}`;

  // ===== APPROACH & SINGLE DETERMINANTS =====
  const approach: Record<string, string[]> = {
    I: [],
    II: [],
    III: [],
    IV: [],
    V: [],
    VI: [],
    VII: [],
    VIII: [],
    IX: [],
    X: [],
  };
  validResponses.forEach((r) => {
    if (r.card && approach[r.card]) {
      approach[r.card].push(r.location);
    }
  });

  const single_determinants: Record<string, number> = {};
  const singleDeterminantTypes = [
    "M",
    "FM",
    "m",
    "FC",
    "CF",
    "C",
    "Cn",
    "FC'",
    "C'F",
    "C'",
    "FT",
    "TF",
    "T",
    "FV",
    "VF",
    "V",
    "FY",
    "YF",
    "Y",
    "Fr",
    "rF",
    "FD",
    "F",
  ];
  singleDeterminantTypes.forEach((d) => (single_determinants[d] = 0));

  validResponses
    .filter((r) => r.determinants.length === 1)
    .forEach((r) => {
      const det = r.determinants[0];
      if (det === "M" || det === "Ma" || det === "Mp" || det === "Ma-p") {
        single_determinants.M++;
      } else if (
        det === "FM" ||
        det === "FMa" ||
        det === "FMp" ||
        det === "FMa-p"
      ) {
        single_determinants.FM++;
      } else if (
        det === "m" ||
        det === "ma" ||
        det === "mp" ||
        det === "ma-p"
      ) {
        single_determinants.m++;
      } else if (
        Object.prototype.hasOwnProperty.call(single_determinants, det)
      ) {
        single_determinants[det]++;
      }
    });

  // ===== FORM QUALITY DETAILS =====
  const form_quality_details = {
    FQx_plus_locations: { W: 0, D: 0, Dd: 0, S: 0 },
    FQx_o_locations: { W: 0, D: 0, Dd: 0, S: 0 },
    FQx_u_locations: { W: 0, D: 0, Dd: 0, S: 0 },
    FQx_minus_locations: { W: 0, D: 0, Dd: 0, S: 0 },
    FQx_none_locations: { W: 0, D: 0, Dd: 0, S: 0 },
  };

  validResponses.forEach((r) => {
    const loc = r.location.includes("W")
      ? "W"
      : r.location.includes("D") && !r.location.includes("Dd")
        ? "D"
        : r.location.includes("Dd")
          ? "Dd"
          : r.location.includes("S")
            ? "S"
            : null;

    if (!loc) return;

    if (r.fq === "+") form_quality_details.FQx_plus_locations[loc]++;
    else if (r.fq === "o") form_quality_details.FQx_o_locations[loc]++;
    else if (r.fq === "u") form_quality_details.FQx_u_locations[loc]++;
    else if (r.fq === "-") form_quality_details.FQx_minus_locations[loc]++;
    else if (r.fq === "none") form_quality_details.FQx_none_locations[loc]++;
  });

  return {
    R,
    W,
    D,
    Dd,
    S,
    W_plus_D: W + D,
    DQ_plus,
    DQ_o,
    DQ_v_plus,
    DQ_v,
    Zf,
    ZSum,
    ZEst,
    Zd,
    M,
    FM,
    m,
    FC,
    CF,
    C,
    Cn,
    WSumC,
    SumC_prime,
    SumT,
    SumV,
    SumY,
    SumShading,
    Fr,
    rF,
    FD,
    F: F_pure,
    Blends,
    Pairs: F_pairs,
    FQx_plus,
    FQx_o,
    FQx_u,
    FQx_minus,
    FQx_none,
    MQual_plus,
    MQual_o,
    MQual_u,
    MQual_minus,
    MQual_none,
    Lambda,
    EA,
    es,
    D_score,
    AdjEs,
    AdjD,
    EBPer,
    eb: `${FM + m} : ${SumShading}`,
    CopingStyle,
    XA_percent,
    WDA_percent,
    X_plus_percent,
    Xu_percent,
    X_minus_percent,
    S_minus,
    Afr,
    Populars,
    GHR,
    PHR,
    H,
    H_paren,
    Hd,
    Hd_paren,
    Hx,
    A,
    A_paren,
    Ad,
    Ad_paren,
    An,
    Art,
    Ay,
    Bl,
    Bt,
    Cg,
    Cl,
    Ex,
    Fd,
    Fi,
    Ge,
    Hh,
    Ls,
    Na,
    Sc,
    Sx,
    Xy,
    Id,
    DV1,
    DV2,
    INCOM1,
    INCOM2,
    DR1,
    DR2,
    FABCOM1,
    FABCOM2,
    ALOG,
    CONTAM,
    Sum6,
    WSum6,
    Lv2,
    AB,
    AG,
    COP,
    CP,
    MOR,
    PER,
    PSV,
    PTI,
    DEPI,
    CDI,
    SCON,
    HVI,
    OBS,
    Ma,
    Mp,
    active_movement,
    passive_movement,
    ColorShadingBlends,
    EgocentricityIndex,
    IsolateIndex,
    H_total,
    blends_list,
    approach,
    single_determinants,
    form_quality_details,
  };
}
