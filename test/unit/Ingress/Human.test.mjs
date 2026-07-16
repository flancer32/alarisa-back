import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import Human from "../../../src/Ingress/Human.mjs";

test("durably accepts a contribution and makes retry idempotent", async () => {
  const dataRoot = await fs.mkdtemp(path.join(os.tmpdir(), "alarisa-back-"));
  const ingress = new Human({fs, path, config: {dataRoot}});
  const input = {contributionId: "test-contribution-0001", text: "Hello", channel: "mob"};

  const first = await ingress.accept(input);
  const retry = await ingress.accept(input);
  const stored = JSON.parse(await fs.readFile(path.join(dataRoot, "principal-contributions", `${input.contributionId}.json`), "utf8"));

  assert.deepEqual(first, {accepted: true, contributionId: input.contributionId});
  assert.deepEqual(retry, first);
  assert.equal(stored.text, input.text);
  assert.equal(stored.channel, input.channel);
});

test("rejects reuse of an identifier for different content", async () => {
  const dataRoot = await fs.mkdtemp(path.join(os.tmpdir(), "alarisa-back-"));
  const ingress = new Human({fs, path, config: {dataRoot}});
  const contributionId = "test-contribution-0002";
  await ingress.accept({contributionId, text: "First", channel: "mob"});

  await assert.rejects(
    ingress.accept({contributionId, text: "Different", channel: "mob"}),
    (error) => error.code === "CONTRIBUTION_CONFLICT",
  );
});
