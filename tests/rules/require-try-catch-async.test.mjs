/**
 * @fileoverview Tests for require-try-catch-async rule.
 * @see https://github.com/mces58/Hangmanify/blob/master/guides/rules/require-try-catch-async.md
 */
import rule from 'plugins/rules/require-try-catch-async.mjs';

import { TEST_FILENAME_PATH } from './Test';
import { runTest } from './utils.js';

const validCases = [
  {
    name: 'async function with try/catch block',
    filename: TEST_FILENAME_PATH,
    code: `
      async function fetchData() {
        try {
          await fetch('https://example.com');
        } catch (err) {
          console.error(err);
        }
      }
    `,
  },
  {
    name: 'arrow async function with try/catch block',
    filename: TEST_FILENAME_PATH,
    code: `
      const doSomething = async () => {
        try {
          await something();
        } catch (err) {}
      };
    `,
  },
  {
    name: 'function marked with @safe comment',
    filename: TEST_FILENAME_PATH,
    code: `
      // @safe
      const getData = async () => await fetch('/api');
    `,
  },
  {
    name: 'async function inside another function with @safe',
    filename: TEST_FILENAME_PATH,
    code: `
      function wrapper() {
        // @safe
        return async function() {
          await something();
        };
      }
    `,
  },
  {
    name: 'non-async function is allowed',
    filename: TEST_FILENAME_PATH,
    code: `
      function logSomething() {
        console.info('not async');
      }
    `,
  },
  {
    name: '@safe comment with extra space is still valid',
    filename: TEST_FILENAME_PATH,
    code: `
      //     @safe
      const getData = async () => await fetch('/api');
    `,
    expectedErrors: 1,
  },
  {
    name: 'async IIFE with try/catch',
    filename: TEST_FILENAME_PATH,
    code: `
      (async () => {
        try {
          await doSomething();
        } catch (err) {}
      })();
    `,
  },
  {
    name: '@safe inside wrapper block (should not apply to inner async)',
    filename: TEST_FILENAME_PATH,
    code: `
      function wrapper() {
        const fn = async () => {
          try {
            await doSomething();
          } catch (err) {}
        };
        return fn;
      }
    `,
  },
];

const invalidCases = [
  {
    name: 'async function without try/catch or @safe',
    filename: TEST_FILENAME_PATH,
    code: `
      async function fetchData() {
        const res = await fetch('https://example.com');
      }
    `,
    expectedErrors: 1,
  },
  {
    name: 'async arrow function without try/catch or @safe',
    filename: TEST_FILENAME_PATH,
    code: `
      const getData = async () => {
        const res = await fetch('/api');
      };
    `,
    expectedErrors: 1,
  },
  {
    name: 'async function with unrelated comment',
    filename: TEST_FILENAME_PATH,
    code: `
      // some comment
      async function test() {
        const x = await doSomething();
      }
    `,
    expectedErrors: 1,
  },
  {
    name: 'async function inside class method without try/catch',
    filename: TEST_FILENAME_PATH,
    code: `
      class Service {
        async fetchData() {
          return await fetch('/data');
        }
      }
    `,
    expectedErrors: 1,
  },
  {
    name: 'misspelled @safe comment is ignored',
    filename: TEST_FILENAME_PATH,
    code: `
      // @safee
      async function test() {
        await fetch('/api');
      }
    `,
    expectedErrors: 1,
  },
  {
    name: 'non-leading @safe comment is ignored',
    filename: TEST_FILENAME_PATH,
    code: `
      async function test() {
        // @safe
        await fetch('/api');
      }
    `,
    expectedErrors: 1,
  },
  {
    name: 'async IIFE without try/catch or @safe',
    filename: TEST_FILENAME_PATH,
    code: `
      (async () => {
        await fetch('/data');
      })();
    `,
    expectedErrors: 1,
  },
];

runTest('require-try-catch-async', rule, validCases, invalidCases);
