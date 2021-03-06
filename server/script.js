// import http from 'k6/http';
// import { sleep } from 'k6';

// export default function() {
//   http.get('http://localhost:3000/1/list');
//   sleep(1);
// }


// STRESS TESTING

import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 }, // below normal load
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 }, // normal load
    { duration: '5m', target: 200 },
    { duration: '2m', target: 300 }, // around the breaking point
    { duration: '5m', target: 300 },
    { duration: '2m', target: 400 }, // beyond the breaking point
    { duration: '5m', target: 400 },
    { duration: '10m', target: 0 }, // scale down. Recovery stage.
  ],
};

export default function() {
  const BASE_URL = 'http://localhost:3000'; // make sure this is not production

  let responses = http.batch([
    [
      'GET',
      `${BASE_URL}/1/list`,
      null,
      { tags: { name: 'PublicCrocs' } },
    ],
    [
      'GET',
      `${BASE_URL}/2/list`,
      null,
      { tags: { name: 'PublicCrocs' } },
    ],
    [
      'GET',
      `${BASE_URL}/3/list`,
      null,
      { tags: { name: 'PublicCrocs' } },
    ],
    [
      'GET',
      `${BASE_URL}/4/list`,
      null,
      { tags: { name: 'PublicCrocs' } },
    ],
  ]);

  sleep(1);
}