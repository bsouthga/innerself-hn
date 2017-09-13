import { dispatch } from '../index';
import { top } from '../api';
import { Story } from '../types';

/**
 * action union
 */
export type StoryAction =
  | TopStoryRequestAction
  | TopStorySuccessAction
  | TopStoryFailureAction;

/**
 *
 *
 * action types
 *
 *
 */

/**
 * use string constants instead of enums for better minification...
 */
export const TOP_STORIES_REQUEST = 'TOP_STORIES_REQUEST';
export type TOP_STORIES_REQUEST = typeof TOP_STORIES_REQUEST;

export const TOP_STORIES_SUCCESS = 'TOP_STORIES_SUCCESS';
export type TOP_STORIES_SUCCESS = typeof TOP_STORIES_SUCCESS;

export const TOP_STORIES_FAILURE = 'TOP_STORIES_FAILURE';
export type TOP_STORIES_FAILURE = typeof TOP_STORIES_FAILURE;

export type TopStoryRequestAction = {
  type: TOP_STORIES_REQUEST;
};
export type TopStoryFailureAction = {
  type: TOP_STORIES_FAILURE;
  payload: {
    error: Error;
  };
};
export type TopStorySuccessAction = {
  type: TOP_STORIES_SUCCESS;
  payload: {
    stories: Story[];
  };
};

/**
 *
 *
 * action creators
 *
 *
 */

/**
 * initiate a top stories request
 */
export const topStoriesRequest = (): TopStoryRequestAction => ({
  type: TOP_STORIES_REQUEST
});

/**
 * top stories success event
 */
export const topStoriesSuccess = (stories: Story[]): TopStorySuccessAction => ({
  type: TOP_STORIES_SUCCESS,
  payload: { stories }
});

export const topStoriesFailure = (error: Error): TopStoryFailureAction => ({
  type: TOP_STORIES_FAILURE,
  payload: { error }
});

export function getTopStories() {
  top()
    .then(stories => dispatch(topStoriesSuccess(stories)))
    .catch(err => {
      console.error(err);
      dispatch(topStoriesFailure(err));
    });

  return topStoriesRequest();
}
