import {createContext, useContext} from 'react';
import {Topic} from '../../domain/Topic';

const TopicCardContext = createContext<{topic: Topic} | null>(null);

export function useTopicContext() {
  const context = useContext(TopicCardContext);
  if (!context) {
    throw new Error(
      'TopicCard.* component must be rendered as child of TopicCard component!',
    );
  }
  return context;
}

export default TopicCardContext;
