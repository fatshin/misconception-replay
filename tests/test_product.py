import unittest
import json
from pathlib import Path

import product
from runtime.server import page, result_markup


class ProductTests(unittest.TestCase):
    def test_fixed_acceptance(self):
        result = product.analyze({field.name: field.value for field in product.PRODUCT.fields})
        passed, checks = product.acceptance(result)
        self.assertTrue(passed, checks)

    def test_page_is_product_specific_and_escapes_output(self):
        self.assertIn(product.PRODUCT.name, page())
        self.assertNotIn("<script>", result_markup({"status": "<script>", "headline": "safe", "metrics": {}, "items": [], "evidence": [], "artifact": {}}))

    def test_public_fixture_matches_engine_fixture(self):
        site = Path("site/app/product-data.ts").read_text()
        result = product.analyze({field.name: field.value for field in product.PRODUCT.fields})
        self.assertIn("Array.from({ length: 20 }", site)
        self.assertIn("index % 4 === 0", site)
        self.assertIn("I added both numerators and both denominators", site)
        self.assertIn("The common denominator is 6", site)
        self.assertIn(result["status"], site)
        self.assertIn('value: "20", label: "labeled cases"', site)
        self.assertIn('value: "5", label: "hidden misconceptions"', site)
        self.assertIn("Fixed-set F1 is 1.00", site)

    def test_mislabeled_reasoning_fails_acceptance(self):
        cases = json.loads(product.CASE_DATA)
        cases[0]["reasoning"] = "I guessed."
        result = product.analyze({"cases": json.dumps(cases)})
        passed, checks = product.acceptance(result)
        self.assertFalse(passed)
        self.assertFalse(checks["correct_answer_wrong_reasoning"])


if __name__ == "__main__":
    unittest.main()
