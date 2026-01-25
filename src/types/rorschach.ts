// Rorschach Scoring Types

export interface RorschachResponse {
  card: string;
  response_index: number;
  location: string;
  location_number?: number;
  dq: string;
  determinants: string[];
  fq: string;
  pair: boolean;
  FrScore?: boolean;
  rFScore?: boolean;
  contents: string[];
  popular: boolean;
  z: string;
  special_scores: string[];
  gphr?: string;
  zscore?: number;
}

export interface RorschachFormData {
  responses: RorschachResponse[];
}

export interface CalculationResults {
  // Basic
  R: number;

  // Location & DQ
  W: number;
  D: number;
  Dd: number;
  S: number;
  W_plus_D: number;
  DQ_plus: number;
  DQ_o: number;
  DQ_v_plus: number;
  DQ_v: number;

  // Z-Scores
  Zf: number;
  ZSum: number;
  ZEst: number | string;
  Zd: number | string;

  // Determinants & Blends
  M: number;
  FM: number;
  m: number;
  FC: number;
  CF: number;
  C: number;
  Cn: number;
  WSumC: number;
  SumC_prime: number;
  SumT: number;
  SumV: number;
  SumY: number;
  SumShading: number;
  Fr: number;
  rF: number;
  FD: number;
  F: number;
  Blends: number;
  Pairs: number;

  // Form Quality
  FQx_plus: number;
  FQx_o: number;
  FQx_u: number;
  FQx_minus: number;
  FQx_none: number;
  MQual_plus: number;
  MQual_o: number;
  MQual_u: number;
  MQual_minus: number;
  MQual_none: number;

  // Ratios & Percentages
  Lambda: number;
  EA: number;
  es: number;
  D_score: number | string;
  AdjEs: number;
  AdjD: number | string;

  EBPer: number | string;
  eb: string;

  XA_percent: number;
  WDA_percent: number;
  X_plus_percent: number;
  Xu_percent: number;
  X_minus_percent: number;
  S_minus: number;

  Afr: number;
  Populars: number;

  // Human Responses
  GHR: number;
  PHR: number;

  // Contents
  H: number;
  H_paren: number;
  Hd: number;
  Hd_paren: number;
  Hx: number;
  A: number;
  A_paren: number;
  Ad: number;
  Ad_paren: number;
  An: number;
  Art: number;
  Ay: number;
  Bl: number;
  Bt: number;
  Cg: number;
  Cl: number;
  Ex: number;
  Fd: number;
  Fi: number;
  Ge: number;
  Hh: number;
  Ls: number;
  Na: number;
  Sc: number;
  Sx: number;
  Xy: number;
  Id: number;

  // Special Scores
  DV1: number;
  DV2: number;
  INCOM1: number;
  INCOM2: number;
  DR1: number;
  DR2: number;
  FABCOM1: number;
  FABCOM2: number;
  ALOG: number;
  CONTAM: number;
  Sum6: number;
  WSum6: number;
  Lv2: number;

  AB: number;
  AG: number;
  COP: number;
  CP: number;
  MOR: number;
  PER: number;
  PSV: number;

  // Special Indices
  PTI: string;
  DEPI: string;
  CDI: string;
  SCON: string;
  HVI: string;
  OBS: string;

  // Additional calculations
  Ma: number;
  Mp: number;
  active_movement: number;
  passive_movement: number;
  ColorShadingBlends: number;
  EgocentricityIndex: number;
  IsolateIndex: number;
  H_total: number;

  // Blends data
  blends_list: string[][];

  // Approach data (per card)
  approach: Record<string, string[]>;

  // Single determinants
  single_determinants: Record<string, number>;

  // Form Quality details
  form_quality_details: {
    FQx_plus_locations: Record<string, number>;
    FQx_o_locations: Record<string, number>;
    FQx_u_locations: Record<string, number>;
    FQx_minus_locations: Record<string, number>;
    FQx_none_locations: Record<string, number>;
  };
}

export interface ZScoreEntry {
  ZW: number;
  ZA: number;
  ZD: number;
  ZS: number;
}

export type ZScoreTable = Record<string, ZScoreEntry>;
