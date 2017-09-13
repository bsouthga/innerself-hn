import { StoryAction } from './stories';
import { RouterAction } from './router';

export * from './stories';

export type Action = StoryAction | RouterAction;
