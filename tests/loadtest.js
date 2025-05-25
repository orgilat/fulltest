import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

export let loadTrend = new Trend('load_duration');
export let spikeTrend = new Trend('spike_duration');
export let soakTrend = new Trend('soak_duration');

export let options = {
  scenarios: {
    load_test: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '10s', target: 50 },
        { duration: '20s', target: 50 },
        { duration: '10s', target: 0 },
      ],
      exec: 'loadTest',
    },

    spike_test: {
      executor: 'constant-vus',
      vus: 100,
      duration: '10s',
      exec: 'spikeTest',
      startTime: '45s',
    },

    soak_test: {
      executor: 'constant-vus',
      vus: 10,
      duration: '1m',
      exec: 'soakTest',
      startTime: '60s',
    },
  },
};

export function loadTest() {
  let res = http.get('https://www.saucedemo.com/');
  loadTrend.add(res.timings.duration);
  check(res, {
    'load: status is 200': (r) => r.status === 200,
  });
  sleep(1);
}

export function spikeTest() {
  let res = http.get('https://www.saucedemo.com/inventory.html');
  spikeTrend.add(res.timings.duration);
  check(res, {
    'spike: status is 200': (r) => r.status === 200,
  });
  sleep(1);
}

export function soakTest() {
  let res = http.get('https://www.saucedemo.com/cart.html');
  soakTrend.add(res.timings.duration);
  check(res, {
    'soak: status is 200': (r) => r.status === 200,
  });
  sleep(2);
}

// פונקציה לסיכום
export function handleSummary(data) {
  return {
    stdout: `\n=== Custom Summary ===\n
Load Test - p(95): ${loadTrend.percentile(0.95).toFixed(2)} ms
Spike Test - p(95): ${spikeTrend.percentile(0.95).toFixed(2)} ms
Soak Test - p(95): ${soakTrend.percentile(0.95).toFixed(2)} ms\n`,
  };
}
