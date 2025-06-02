import { InputNode }  from './inputNode';
import { LLMNode }    from './llmNode';
import { OutputNode } from './outputNode';
import { TextNode }   from './textNode';

import { MathAdd } from './MathAdd';
import { Delay   } from './Delay';
import { Filter  } from './Filter';
import { Logger  } from './Logger';
import { Webhook } from './Webhook';

const nodeTypes = {
  inputNode:  InputNode,
  llmNode:    LLMNode,
  outputNode: OutputNode,
  textNode:   TextNode,
  
  MathAdd: MathAdd,
  Delay:   Delay,
  Filter:  Filter,
  Logger:  Logger,
  Webhook: Webhook,
};

export default nodeTypes;
