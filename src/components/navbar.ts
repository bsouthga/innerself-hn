import html from 'innerself';
import { connect, dispatch, push, HOME, RoutePath, State } from '../store';

const go = (path: RoutePath) => dispatch(push(path), true);

const Link = connect(
  (
    state: State,
    props: {
      path: RoutePath;
      text?: string;
      className?: string;
    }
  ) => html`
  <a class="${props.className ||
    (state.router.path === props.path ? 'active' : '')}" onclick=${go(
    props.path
  )}>
    ${props.text || props.path}
  </a>
`
);

export const Navbar = () => html`
  <div class="navbar">
    ${Link({
      path: '',
      className: 'logo',
      text: 'Innerself News'
    })}
    ${Link({ path: 'new' })}|
    ${Link({ path: 'threads' })}|
    ${Link({ path: 'comments' })}|
    ${Link({ path: 'show' })}|
    ${Link({ path: 'ask' })}|
    ${Link({ path: 'jobs' })}|
    ${Link({ path: 'submit' })}|
  </div>
`;
