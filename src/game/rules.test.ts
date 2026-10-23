import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateHazardScore,
  checkHazardHuntComplete,
  evaluateBagSelection,
  evaluatePlan,
  calculateFinalSummary,
  HAZARDS_DATA,
  BAG_ITEMS_DATA,
} from './rules.ts';

test('calculateHazardScore returns full score when all hazards are fixed', () => {
  const score = calculateHazardScore(6, 6);
  assert.equal(score, 35);
});

test('calculateHazardScore scales correctly for partial fixes', () => {
  const score = calculateHazardScore(3, 6);
  assert.equal(score, 18);
});

test('checkHazardHuntComplete checks required count', () => {
  assert.equal(checkHazardHuntComplete(['1', '2', '3', '4', '5', '6'], 6), true);
  assert.equal(checkHazardHuntComplete(['1', '2'], 6), false);
});

test('evaluateBagSelection awards high score for all 6 essentials with no junk items', () => {
  const allEssentials = BAG_ITEMS_DATA.filter((i) => i.isEssential).map((i) => i.id);
  assert.equal(allEssentials.length, 6);

  const result = evaluateBagSelection(allEssentials);
  assert.equal(result.essentialCount, 6);
  assert.equal(result.wrongCount, 0);
  assert.equal(result.isPassing, true);
  assert.equal(result.score, 35);
  assert.equal(result.missingEssentials.length, 0);
});

test('evaluateBagSelection penalizes wrong items like iron and encyclopedia', () => {
  const badSelection = ['iron', 'encyclopedia'];
  const result = evaluateBagSelection(badSelection);
  assert.equal(result.essentialCount, 0);
  assert.equal(result.wrongCount, 2);
  assert.equal(result.isPassing, false);
  assert.equal(result.score, 0);
});

test('evaluatePlan scores 30 when all three critical choices are correct', () => {
  const result = evaluatePlan('table_crouch', 'park_open', 'out_of_city_contact');
  assert.equal(result.safeZoneCorrect, true);
  assert.equal(result.meetingPointCorrect, true);
  assert.equal(result.commPlanCorrect, true);
  assert.equal(result.score, 30);
});

test('evaluatePlan detects dangerous choices like elevator and narrow street', () => {
  const result = evaluatePlan('elevator', 'narrow_street', 'call_everyone');
  assert.equal(result.safeZoneCorrect, false);
  assert.equal(result.meetingPointCorrect, false);
  assert.equal(result.commPlanCorrect, false);
  assert.equal(result.score, 0);
  assert.match(result.feedback[0], /asla asansör/);
});

test('calculateFinalSummary computes grade and badges appropriately', () => {
  const summary = calculateFinalSummary(35, 35, 30, 20, 'challenge');
  assert.equal(summary.totalScore, 100);
  assert.equal(summary.grade, 'Uzman Hazırlık Lideri');
  assert.equal(summary.badges.length, 3);
});
