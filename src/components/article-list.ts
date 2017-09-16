import html from 'innerself';
import { connect, getItemById, State, Story } from '../store';
import { isStory } from '../store/util';
import { Article } from './article';

interface ArticleProps {
  items: number[];
}

export const ArticleList = connect((state: State, props: ArticleProps) => {
  const { items } = props;
  const stories = items
    .map(id => getItemById(state, id))
    .filter(isStory) as Story[];

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
