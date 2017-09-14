import html from 'innerself';
import { getItemById, Story, State, connect } from '../store';
import { Article } from './article';

type ArticleProps = {
  items: number[];
};

export const ArticleList = connect((state: State, props: ArticleProps) => {
  const { items } = props;
  const stories = items
    .map(id => getItemById(state, id))
    .filter(item => item && item.type === 'story') as Story[];

  return html`
    <div class="article-list">
      <div>
        ${!stories.length
          ? '(no items)'
          : stories.map((item, index) => Article({ item, index }))}
      </div>
    </div>
  `;
});
