'use strict';

import path from 'path';

export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'useNavigation/useRoute generic must match screen filename under src/screens',
    },
    messages: {
      mismatch:
        'Generic "{{used}}" does not match expected "RouteNames.{{expected}}" based on filename.',
      missing:
        'You must specify a generic like {{hook}}<RouteNames.{{expected}}> in this file.',
    },
    schema: [],
  },

  create(context) {
    const filename = context.getFilename().replace(/\\/g, '/');

    if (!filename.includes('/src/screens/')) return {};

    const baseName = path.basename(filename);
    const screenName = baseName.replace(/\.tsx$/, '').toUpperCase();
    const expectedGeneric = `RouteNames.${screenName}`;

    return {
      CallExpression(node) {
        const callee = node.callee?.type === 'Identifier' ? node.callee.name : null;
        if (!['useNavigation', 'useRoute'].includes(callee)) return;

        const genericNode = node.typeArguments?.params?.[0];
        if (!genericNode) {
          context.report({
            node,
            messageId: 'missing',
            data: {
              hook: callee,
              expected: screenName,
            },
          });
          return;
        }

        const usedGeneric = context.getSourceCode().getText(genericNode);
        if (usedGeneric !== expectedGeneric) {
          context.report({
            node: genericNode,
            messageId: 'mismatch',
            data: {
              used: usedGeneric,
              expected: screenName,
            },
          });
        }
      },
    };
  },
};
