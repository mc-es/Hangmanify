'use strict';

import path from 'path';

export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforces that hooks can only be imported from modules specified in the allowedImports list.',
      category: 'Best Practices',
    },
    messages: {
      invalidImport:
        '"{{hookName}}" cannot be imported directly from "{{importSource}}". Please import from the "src/hooks" module.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          allowedImports: {
            type: 'array',
            items: { type: 'string' },
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const options = context.options[0] || {};
    const allowedImportsSet = new Set(options.allowedImports || []);
    const cwd = process.cwd();

    return {
      ImportDeclaration(node) {
        const importSource = node.source.value;

        if (allowedImportsSet.has(importSource)) return;

        try {
          const resolvedImportPath = importSource.startsWith('src/')
            ? path.resolve(cwd, importSource)
            : path.resolve(cwd, 'src', importSource);

          const normalizedResolvedPath = path.normalize(resolvedImportPath);
          const hooksDirPath = path.normalize(path.resolve(cwd, 'src', 'hooks'));

          if (normalizedResolvedPath.startsWith(hooksDirPath)) return;
        } catch (error) {
          console.error(error);
          return;
        }

        node.specifiers.forEach((specifier) => {
          let importedName = '';

          if (specifier.type === 'ImportDefaultSpecifier') {
            importedName = specifier.local.name;
          } else if (specifier.type === 'ImportSpecifier' && specifier?.imported?.name) {
            importedName = specifier.imported.name;
          }

          if (importedName?.startsWith('use')) {
            context.report({
              node,
              messageId: 'invalidImport',
              data: {
                importSource,
                hookName: importedName,
              },
            });
          }
        });
      },
    };
  },
};
