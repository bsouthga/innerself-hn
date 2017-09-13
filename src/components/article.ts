import html from 'innerself';
import { Story } from '../store';

export const Article = (item: Story, index: number) => html`
  <div class="article">
    <div>
      ${index + 1}.
    </div>
    <div>
      <a href="${item.url}">${item.title}</a>
    </div>
  </div>
`;
