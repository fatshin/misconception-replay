import type { Product } from "./product-types";

export const product: Product = {
  number: "08",
  name: "Misconception Replay",
  eyebrow: "Correct answer, wrong reason",
  tagline: "Find the misconception hidden behind a correct answer.",
  description: "Compare a learner’s answer and explanation, distinguish knowledge from lucky guessing, and generate a targeted replay that corrects the underlying mental model.",
  accent: "#ff9f1c",
  inputLabel: "Learner response set",
  inputHint: "The same twenty labeled fraction cases are evaluated by product.py.",
  inputValue: "Problem: 1/2 + 1/3\nAnswer: 5/6 (correct)\nReasoning in five cases: “I added both numerators and both denominators, then changed it to 5/6.”\nExpected label: ADD_BOTH_PARTS.",
  actionLabel: "Reveal verified result",
  status: "EVAL_PASS",
  statusTone: "good",
  metrics: [{ value: "20", label: "labeled cases" }, { value: "5", label: "hidden misconceptions" }, { value: "1.00", label: "fixture F1" }],
  findings: [
    { title: "Correct answer, incorrect rule", detail: "Five learners reach 5/6 while claiming numerators and denominators were added directly.", badge: "MISCONCEPTION", tone: "bad" },
    { title: "Fixed-set F1 is 1.00", detail: "All five ADD_BOTH_PARTS labels are recovered in the twenty-case fixture.", badge: "EVAL", tone: "good" },
    { title: "Counterexample tests the rule", detail: "1/2 + 1/2 exposes why adding denominators cannot be correct.", badge: "REPLAY", tone: "warn" },
  ],
  method: [
    { step: "01", title: "Separate", detail: "Score the final answer independently from the learner’s causal explanation." },
    { step: "02", title: "Diagnose", detail: "Map the explanation to a specific misconception, not a generic wrong label." },
    { step: "03", title: "Replay", detail: "Generate one contrastive example that tests the corrected mental model." },
  ],
  proof: ["Answer/reason split", "20-case labeled eval", "Targeted replay"],
  note: "The learner responses are synthetic. The fixture F1 measures only the included evaluation set.",
};
