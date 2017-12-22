/**
 * Inlined version of innerself (for easier closure compiler integration)
 *

ISC License

Copyright 2017, Staś Małolepszy

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

 */

type InterpolatedValue = string | boolean | number | void;
type Interpolations = Array<InterpolatedValue | InterpolatedValue[]>;
type ComponentNoArgs = () => string;

export default function html([first, ...strings], ...values: Interpolations) {
  // Weave the literal strings and the interpolations.
  // We don't have to explicitly handle array-typed values
  // because concat will spread them flat for us.
  return (
    values
      .reduce((acc, cur) => acc.concat(cur, strings.shift()), [first])
      // Filter out interpolations which are bools, null or undefined.
      .filter(x => (x && x !== true) || x === 0)
      .join('')
  );
}

export function createStore<State, Action>(
  reducer: (state?: State, action?: Action) => State
) {
  let state = reducer();
  const roots = new Map<Element, ComponentNoArgs>();
  const prevs = new Map<Element, string>();

  function render() {
    for (const [root, component] of roots) {
      const output = component();

      // Poor man's Virtual DOM implementation :)  Compare the new output
      // with the last output for this root.  Don't trust the current
      // value of root.innerHTML as it may have been changed by other
      // scripts or extensions.
      if (output !== prevs.get(root)) {
        prevs.set(root, output);
        root.innerHTML = output;

        // Dispatch an event on the root to give developers a chance to
        // do some housekeeping after the whole DOM is replaced under
        // the root. You can re-focus elements in the listener to this
        // event. See example03.
        const event = new CustomEvent('render', { detail: state });
        root.dispatchEvent(event);
      }
    }
  }

  function attach(component: ComponentNoArgs, root: Element) {
    roots.set(root, component);
    render();
  }

  function connect<P>(component: (state: State, props: P) => string) {
    // Return a decorated component function.
    return (props: P) => component(state, props);
  }

  function dispatch(action: Action) {
    state = reducer(state, action);
    render();
  }

  return {
    attach,
    connect,
    dispatch
  };
}
