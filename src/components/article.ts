import html from 'innerself';
import { Story } from '../store';

export const Article = (item: Story, index: number) => html`
  <tr class="article">
    <td align="right" valign="top">
      ${index + 1}.
    </td>
    <td>
      <a href="${item.url}">${item.title}</a>
    </td>
  </tr>
`;
