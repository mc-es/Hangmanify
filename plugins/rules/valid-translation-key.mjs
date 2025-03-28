import { readFileSync } from 'fs';
import { resolve } from 'path';

function parseTranslationKeys(content) {
  const match = content.match(/export\s+type\s+TranslationKeys\s*=\s*{([\s\S]*)};?/);
  if (!match) return {};
  const body = match[1].trim();
  return parseObject(body);
}

function parseObject(text) {
  const obj = {};
  const regex = /(?:['"]?(\w+)['"]?\s*:\s*)(\{)?/g; // NOSONAR
  let match;
  while ((match = regex.exec(text))) {
    const key = match[1];
    if (match[2] === '{') {
      let startIndex = regex.lastIndex;
      let braceCount = 1;
      let i = startIndex;
      while (braceCount && i < text.length) {
        if (text[i] === '{') braceCount++;
        else if (text[i] === '}') braceCount--;
        i++;
      }
      const block = text.slice(startIndex, i - 1);
      obj[key] = parseObject(block);
      regex.lastIndex = i;
    } else {
      obj[key] = true;
    }
  }
  return obj;
}

function isValidTranslationKey(key, structure) {
  return key
    .split('.')
    .every((segment) => (structure = structure?.[segment]) !== undefined);
}

export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Checks that the translation key passed to the t() function is valid according to the nested structure defined in the TranslationKeys type file.',
      category: 'Best Practices',
      recommended: false,
    },
    schema: [],
    messages: {
      invalidKey: 'The translation key "{{ key }}" is not defined in TranslationKeys.',
    },
  },

  create(context) {
    let translationKeysStructure = {};
    try {
      const fileContent = readFileSync(
        resolve('src/constants/localization/translation-keys.d.ts'),
        'utf-8'
      );
      translationKeysStructure = parseTranslationKeys(fileContent);
    } catch (error) {
      console.error('Could not read translation keys file:', error);
    }

    return {
      CallExpression(node) {
        if (
          node.callee.type === 'Identifier' &&
          node.callee.name === 't' &&
          node.arguments[0]?.type === 'Literal' &&
          typeof node.arguments[0].value === 'string'
        ) {
          const key = node.arguments[0].value;
          if (!isValidTranslationKey(key, translationKeysStructure)) {
            context.report({
              node: node.arguments[0],
              messageId: 'invalidKey',
              data: { key },
            });
          }
        }
      },
    };
  },
};
