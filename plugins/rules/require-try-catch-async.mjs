'use strict';

export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforces that async functions include error handling with try/catch, unless marked with @safe.',
      category: 'Error Handling',
      recommended: false,
    },
    schema: [],
  },

  create(context) {
    function getChildNodes(node) {
      const children = [];
      for (const key of Object.keys(node)) {
        const child = node[key];
        if (Array.isArray(child))
          children.push(...child.filter((item) => item && typeof item.type === 'string'));
        else if (child && typeof child === 'object' && typeof child.type === 'string')
          children.push(child);
      }
      return children;
    }

    function containsTryStatement(node) {
      const stack = [node];
      const visited = new WeakSet();
      while (stack.length) {
        const current = stack.pop();
        if (visited.has(current)) continue;
        visited.add(current);
        if (current && current.type === 'TryStatement') return true;

        stack.push(...getChildNodes(current));
      }
      return false;
    }

    function checkAsyncFunction(node) {
      if (!node.async || node.body?.type !== 'BlockStatement') return;

      const sourceCode = context.getSourceCode();
      const parentNode =
        node.parent?.type === 'VariableDeclarator' ? node.parent.parent : node;
      const comments = sourceCode.getCommentsBefore(parentNode);
      const isSafe = comments.some((comment) => comment.value.trim().startsWith('@safe'));
      const hasTry = containsTryStatement(node.body);

      if (!hasTry && !isSafe) {
        context.report({
          node,
          message:
            'Async functions must include try/catch or be marked with @safe above the function.',
        });
      }
    }

    return {
      FunctionDeclaration: checkAsyncFunction,
      FunctionExpression: checkAsyncFunction,
      ArrowFunctionExpression: checkAsyncFunction,
    };
  },
};
