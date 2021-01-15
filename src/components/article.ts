import html from "innerself";
import { Story } from "../store";
import { formatDate } from "../store/util";
import { COMMENT } from "./comment";
import { Link } from "./link";

export const ARTICLE = "article";

export interface ArticleProps {
  item: Story;
  index?: number;
  text?: boolean;
}

export const Article = ({ item, index, text }: ArticleProps) => {
  const user = Link({
    path: "user",
    text: `${item.by}`,
    cls: `${ARTICLE}-link`,
    query: { id: item.by || "" },
  });

  const itemLink = Link({
    path: "item",
    text: `${item.title}`,
    cls: `${ARTICLE}-title`,
    query: { id: `${item.id}` },
  });

  const comments = Link({
    path: "item",
    text: `${item.descendants || 0} ${COMMENT}s`,
    cls: `${ARTICLE}-link`,
    query: { id: `${item.id}` },
  });

  const indexInfo =
    typeof index !== "undefined"
      ? html`<div class="${ARTICLE}-index">${index + 1}.</div>`
      : "";

  const itemText = !text
    ? ""
    : html` <div class="${ARTICLE}-text">${item.text}</div> `;

  const url = item.url;
  const host = url && new URL(url).hostname;
  const link = !url
    ? itemLink
    : `<a class="${ARTICLE}-title" href="${url}">${item.title}</a> ` +
      (host
        ? `<div class="host meta-text">(${host.replace("www.", "")})</div>`
        : "");

  return html`
    <div class="${ARTICLE}">
      ${indexInfo}
      <div>
        ${link}
        <div class="${ARTICLE}-info meta-text">
          ${item.score} points by ${user} ${formatDate(item.time)} | ${comments}
        </div>
        ${itemText}
      </div>
    </div>
  `;
};
