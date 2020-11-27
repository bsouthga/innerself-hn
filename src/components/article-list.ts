import html from 'innerself';
import { connect, getItemById, State } from '../store';
import { isStory } from '../store/util';
import { Article, ARTICLE } from './article';

interface ArticleProps {
  items: number[];
  skip?: number;
}

export const ArticleList = connect((state: State, props: ArticleProps) => {
  const { items, skip = 0 } = props;
  const stories = items.map((id) => getItemById(state, id)).filter(isStory);

  return html`
    <div class="${ARTICLE}-list">
      ${!stories.length
        ? '(no items)'
        : stories.map((item, index) =>
            Article({ item, index: index + skip || 0 })
          )}
    </div>
  `;
});
