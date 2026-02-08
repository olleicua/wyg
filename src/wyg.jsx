const tree = <></>;

docu.append(
  document.getElementById('display'),
  tree
);

document.getElementById('content').append(<InsertFeatureButton parentNode={tree} />);

function renderer({ parentNode, previousNode }) {
  if (previousNode) {
    return (node) => {
      previousNode.after(node);
    }
  }

  if (parentNode) {
    return (node) => {
      parentNode.appendChild(node);
    }
  }

  throw 'feature requires either a parentNode or a previousNode to be specified';
}

class WYGTextNode {
  constructor({ featureBlock }) {
    this.uiBlock = featureBlock;
    featureBlock.WYGNode = this;
    this.$el = document.createTextNode('');
    this.content = new docu.State('')
    docu.assignProperties(this.$el, { textContent: this.content });
  }

  initializeUI() {
    this.uiBlock.append(
      <textarea
	onKeyUp={
	  (event) => this.content.set(event.target.value)
	}
      ></textarea>
    );
  }
}

class WYGFeatureNode {
  constructor({ featureBlock, options }) {
    console.log(options);
    options ||= {};
    const Tag = options.tag || 'div';

    this.uiBlock = featureBlock;
    featureBlock.WYGNode = this;
    this.$el = (
      <Tag
	style={{ border: '2px solid blue', padding: '1em', margin: '1em' }}
      >test feature content</Tag>
    );
  }

  initializeUI() {
    this.uiBlock.append(<i>feature UI not yet implemented</i>);
  }
}

function renderFeature({ featureBlock, render, featureClass, options }) {
  featureBlock.className = 'feature-block';

  const featureNode = new featureClass({ featureBlock, options });
  featureBlock.replaceChildren();
  featureNode.initializeUI();
  render(featureNode.$el);

  featureBlock.after(<InsertFeatureButton previousNode={featureNode.$el} />);
}

function selectFeature({ featureBlock, render }) {
  featureBlock.className = 'feature-block-selector';

  featureBlock.replaceChildren();
  featureBlock.append(
    <button
      onClick={() => renderFeature({
	featureBlock,
	render,
	featureClass: WYGTextNode,
      })}
    >plain text</button>
  );
  featureBlock.append(
    <button
      onClick={() => renderFeature({
	featureBlock,
	render,
	featureClass: WYGFeatureNode,
	options: { tag: 'div' },
      })}
    >box feature</button>
  );
  featureBlock.append(
    <button
      onClick={() => renderFeature({
	featureBlock,
	render,
	featureClass: WYGFeatureNode,
	options: { tag: 'span' },
      })}
    >inline feature</button>
  );
}

function InsertFeatureButton({ parentNode, previousNode }) {
  const render = renderer({parentNode, previousNode});

  const featureBlock = (
    <div className="empty-feature-block">
      <button
	onClick={() => selectFeature({ featureBlock, render })}
      >+ add feature</button>
    </div>
  );
  return featureBlock;
}
