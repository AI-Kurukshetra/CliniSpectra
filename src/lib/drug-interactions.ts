type Severity = "low" | "moderate" | "high";

export type MedicationInput = {
  medication_name: string;
  dosage?: string | null;
  route?: string | null;
  frequency?: string | null;
  is_active?: boolean | null;
};

type InteractionRule = {
  id: string;
  severity: Severity;
  title: string;
  message: string;
  recommendation: string;
  medications: string[];
};

type MedicationGroup = {
  aliases: string[];
  label: string;
};

type GroupRule = {
  id: string;
  severity: Severity;
  left: MedicationGroup;
  right: MedicationGroup;
  title: string;
  message: string;
  recommendation: string;
};

type DuplicateGroupRule = {
  id: string;
  severity: Severity;
  group: MedicationGroup;
  title: string;
  message: string;
  recommendation: string;
};

export type DrugInteractionAlert = {
  id: string;
  severity: Severity;
  type: "interaction" | "duplicate-therapy";
  title: string;
  message: string;
  medications: string[];
  recommendation: string;
};

const group = (label: string, aliases: string[]): MedicationGroup => ({
  label,
  aliases,
});

const nsaidGroup = group("NSAIDs", [
  "ibuprofen",
  "naproxen",
  "diclofenac",
  "indomethacin",
  "ketorolac",
  "meloxicam",
  "celecoxib",
  "aspirin",
]);

const anticoagulantGroup = group("Anticoagulants", [
  "warfarin",
  "apixaban",
  "rivaroxaban",
  "dabigatran",
  "edoxaban",
  "enoxaparin",
  "heparin",
]);

const opioidGroup = group("Opioids", [
  "morphine",
  "oxycodone",
  "hydrocodone",
  "hydromorphone",
  "fentanyl",
  "tramadol",
  "codeine",
]);

const benzodiazepineGroup = group("Benzodiazepines", [
  "alprazolam",
  "lorazepam",
  "diazepam",
  "clonazepam",
  "temazepam",
]);

const ssriGroup = group("SSRIs", [
  "sertraline",
  "fluoxetine",
  "escitalopram",
  "citalopram",
  "paroxetine",
]);

const aceInhibitorGroup = group("ACE inhibitors", [
  "lisinopril",
  "enalapril",
  "ramipril",
  "benazepril",
]);

const arbGroup = group("ARBs", [
  "losartan",
  "valsartan",
  "olmesartan",
  "irbesartan",
]);

const nitrateGroup = group("Nitrates", [
  "nitroglycerin",
  "isosorbide mononitrate",
  "isosorbide dinitrate",
]);

const pde5Group = group("PDE5 inhibitors", [
  "sildenafil",
  "tadalafil",
  "vardenafil",
]);

const potassiumGroup = group("Potassium supplements", [
  "potassium chloride",
  "potassium bicarbonate",
  "potassium citrate",
]);

const potassiumSparingGroup = group("Potassium-sparing diuretics", [
  "spironolactone",
  "eplerenone",
  "amiloride",
  "triamterene",
]);

const macrolideGroup = group("Macrolides", [
  "clarithromycin",
  "erythromycin",
]);

const statinGroup = group("Statins", [
  "simvastatin",
  "atorvastatin",
  "lovastatin",
]);

const explicitRules: InteractionRule[] = [
  {
    id: "warfarin-nsaid",
    severity: "high",
    title: "Elevated bleeding risk",
    message:
      "Warfarin combined with an NSAID may increase gastrointestinal and systemic bleeding risk.",
    recommendation:
      "Review the indication, consider an alternative analgesic, and monitor closely for bleeding.",
    medications: ["warfarin", ...nsaidGroup.aliases],
  },
  {
    id: "tramadol-ssri",
    severity: "moderate",
    title: "Possible serotonin toxicity risk",
    message:
      "Tramadol with an SSRI may increase serotonin toxicity and seizure risk.",
    recommendation:
      "Review symptom history, consider safer pain control options, and counsel on warning signs.",
    medications: ["tramadol", ...ssriGroup.aliases],
  },
  {
    id: "statin-macrolide",
    severity: "moderate",
    title: "Increased statin exposure",
    message:
      "Certain macrolides may raise statin concentrations and increase muscle toxicity risk.",
    recommendation:
      "Consider temporarily holding the statin or selecting a non-interacting antibiotic when appropriate.",
    medications: [...statinGroup.aliases, ...macrolideGroup.aliases],
  },
];

const groupRules: GroupRule[] = [
  {
    id: "opioid-benzodiazepine",
    severity: "high",
    left: opioidGroup,
    right: benzodiazepineGroup,
    title: "Additive CNS and respiratory depression",
    message:
      "Concurrent opioid and benzodiazepine therapy may increase sedation and respiratory depression risk.",
    recommendation:
      "Verify both therapies are necessary, use the lowest effective doses, and monitor closely.",
  },
  {
    id: "nitrate-pde5",
    severity: "high",
    left: nitrateGroup,
    right: pde5Group,
    title: "Severe hypotension risk",
    message:
      "Nitrates and PDE5 inhibitors together may cause profound hypotension.",
    recommendation:
      "Avoid co-administration unless a clinician has reviewed timing and risk explicitly.",
  },
  {
    id: "raas-potassium",
    severity: "moderate",
    left: {
      label: "RAAS blockers",
      aliases: [...aceInhibitorGroup.aliases, ...arbGroup.aliases],
    },
    right: {
      label: "Potassium-raising therapy",
      aliases: [...potassiumGroup.aliases, ...potassiumSparingGroup.aliases],
    },
    title: "Hyperkalemia risk",
    message:
      "RAAS blockers with potassium-raising therapy may increase potassium and renal risk.",
    recommendation:
      "Check renal function and potassium trends, and confirm the combination is intended.",
  },
  {
    id: "ace-arb",
    severity: "moderate",
    left: aceInhibitorGroup,
    right: arbGroup,
    title: "Dual RAAS blockade",
    message:
      "Using an ACE inhibitor with an ARB may increase renal dysfunction and hyperkalemia risk.",
    recommendation:
      "Confirm there is a specific indication for dual blockade; otherwise simplify the regimen.",
  },
];

const duplicateRules: DuplicateGroupRule[] = [
  {
    id: "duplicate-nsaid",
    severity: "moderate",
    group: nsaidGroup,
    title: "Duplicate NSAID therapy",
    message:
      "Multiple NSAIDs in the same regimen may increase bleeding, renal, and gastrointestinal toxicity.",
    recommendation:
      "Consolidate to a single anti-inflammatory agent if clinically appropriate.",
  },
  {
    id: "duplicate-anticoagulant",
    severity: "high",
    group: anticoagulantGroup,
    title: "Multiple anticoagulants detected",
    message:
      "More than one anticoagulant may reflect a transition plan, but it can also increase major bleeding risk.",
    recommendation:
      "Verify whether this is intentional bridging therapy and confirm timing.",
  },
];

function normalizeMedicationName(name: string) {
  return name.trim().toLowerCase();
}

function includesAlias(name: string, alias: string) {
  return name === alias || name.includes(alias);
}

function findMatches(
  medications: MedicationInput[],
  aliases: string[],
) {
  return medications.filter((medication) =>
    aliases.some((alias) =>
      includesAlias(normalizeMedicationName(medication.medication_name), alias),
    ),
  );
}

function dedupeMedicationNames(medications: MedicationInput[]) {
  return [...new Set(medications.map((item) => item.medication_name.trim()))];
}

export function checkDrugInteractions(medications: MedicationInput[]) {
  const activeMedications = medications.filter(
    (medication) => medication.is_active !== false,
  );
  const alerts: DrugInteractionAlert[] = [];

  for (const rule of explicitRules) {
    const matched = findMatches(activeMedications, rule.medications);
    const normalized = matched.map((item) =>
      normalizeMedicationName(item.medication_name),
    );

    const distinctTargets = new Set(
      rule.medications.filter((alias) =>
        normalized.some((name) => includesAlias(name, alias)),
      ),
    );

    if (matched.length >= 2 && distinctTargets.size >= 2) {
      alerts.push({
        id: rule.id,
        severity: rule.severity,
        type: "interaction",
        title: rule.title,
        message: rule.message,
        medications: dedupeMedicationNames(matched),
        recommendation: rule.recommendation,
      });
    }
  }

  for (const rule of groupRules) {
    const leftMatches = findMatches(activeMedications, rule.left.aliases);
    const rightMatches = findMatches(activeMedications, rule.right.aliases);

    if (leftMatches.length > 0 && rightMatches.length > 0) {
      alerts.push({
        id: rule.id,
        severity: rule.severity,
        type: "interaction",
        title: rule.title,
        message: rule.message,
        medications: dedupeMedicationNames([...leftMatches, ...rightMatches]),
        recommendation: rule.recommendation,
      });
    }
  }

  for (const rule of duplicateRules) {
    const matches = findMatches(activeMedications, rule.group.aliases);

    if (matches.length > 1) {
      alerts.push({
        id: rule.id,
        severity: rule.severity,
        type: "duplicate-therapy",
        title: rule.title,
        message: rule.message,
        medications: dedupeMedicationNames(matches),
        recommendation: rule.recommendation,
      });
    }
  }

  const dedupedAlerts = alerts.filter(
    (alert, index, collection) =>
      collection.findIndex((candidate) => candidate.id === alert.id) === index,
  );

  const highestSeverity =
    dedupedAlerts.find((alert) => alert.severity === "high")?.severity ??
    dedupedAlerts.find((alert) => alert.severity === "moderate")?.severity ??
    dedupedAlerts.find((alert) => alert.severity === "low")?.severity ??
    null;

  return {
    medicationCount: activeMedications.length,
    highestSeverity,
    alerts: dedupedAlerts,
  };
}
