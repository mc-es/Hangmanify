/**
 * @fileoverview Tests for require-try-catch-async rule.
 * @see https://github.com/mces58/Hangmanify/blob/master/guides/rules/require-try-catch-async.md
 */
import rule from 'plugins/rules/require-try-catch-async.mjs';

import { runTest } from './utils.js';

const validCases = [
  {
    name: 'Async function with try/catch block',
    filename: 'src/utils/safeFetch.ts',
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
    name: 'Arrow async function with try/catch block',
    filename: 'src/utils/arrow.ts',
    code: `
      const doSomething = async () => {
        try {
          await something();
        } catch (e) {}
      };
    `,
  },
  {
    name: 'Function marked with @safe comment',
    filename: 'src/utils/safeComment.ts',
    code: `
      // @safe
      const getData = async () => {
        return await fetch('/api');
      };
    `,
  },
  {
    name: 'Async function inside another function with @safe',
    filename: 'src/utils/nestedSafe.ts',
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
    name: 'Non-async function is allowed',
    filename: 'src/utils/nonAsync.ts',
    code: `
      function logSomething() {
        console.log('not async');
      }
    `,
  },
  {
    name: '@safe comment with extra space is still valid',
    filename: 'src/utils/extraSpaceSafe.ts',
    code: `
    //     @safe
    const getData = async () => {
      return await fetch('/api');
    };
  `,
  },
  {
    name: '@safe inside wrapper block (should not apply to inner async)',
    filename: 'src/utils/safeNestedInner.ts',
    code: `
    function wrapper() {
      const fn = async () => {
        try {
          await doSomething();
        } catch (e) {}
      };
      return fn;
    }
  `,
  },
  {
    name: 'Async IIFE with try/catch',
    filename: 'src/utils/iifeValid.ts',
    code: `
    (async () => {
      try {
        await doSomething();
      } catch (err) {}
    })();
  `,
  },
];

const invalidCases = [
  {
    name: 'Async function without try/catch or @safe',
    filename: 'src/utils/unsafeFetch.ts',
    code: `
      async function fetchData() {
        const res = await fetch('https://example.com');
      }
    `,
    expectedErrors: 1,
  },
  {
    name: 'Async arrow function without try/catch or @safe',
    filename: 'src/utils/unsafeArrow.ts',
    code: `
      const getData = async () => {
        const res = await fetch('/api');
      };
    `,
    expectedErrors: 1,
  },
  {
    name: 'Async function with unrelated comment',
    filename: 'src/utils/withComment.ts',
    code: `
      // some comment
      async function test() {
        const x = await doSomething();
      }
    `,
    expectedErrors: 1,
  },
  {
    name: 'Async function inside class method without try/catch',
    filename: 'src/utils/classMethod.ts',
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
    name: 'Misspelled @safe comment is ignored',
    filename: 'src/utils/misspelledSafe.ts',
    code: `
    // @safee
    async function test() {
      await fetch('/api');
    }
  `,
    expectedErrors: 1,
  },
  {
    name: 'Non-leading @safe comment is ignored',
    filename: 'src/utils/safeInsideFunction.ts',
    code: `
    async function test() {
      // @safe
      await fetch('/api');
    }
  `,
    expectedErrors: 1,
  },
  {
    name: 'Async IIFE without try/catch or @safe',
    filename: 'src/utils/iifeInvalid.ts',
    code: `
    (async () => {
      await fetch('/data');
    })();
  `,
    expectedErrors: 1,
  },
];

runTest('require-try-catch-async', rule, validCases, invalidCases);
