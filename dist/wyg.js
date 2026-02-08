const tree = docu.jsxEntity(docu.DocuFragment, null);
docu.append(document.getElementById('display'), tree);
document.getElementById('content').append(docu.jsxEntity(InsertFeatureButton, {
  parentNode: tree
}));
function renderer({
  parentNode,
  previousNode
}) {
  if (previousNode) {
    return node => {
      previousNode.after(node);
    };
  }
  if (parentNode) {
    return node => {
      parentNode.appendChild(node);
    };
  }
  throw 'feature requires either a parentNode or a previousNode to be specified';
}
class WYGTextNode {
  constructor({
    featureBlock
  }) {
    this.uiBlock = featureBlock;
    featureBlock.WYGNode = this;
    this.$el = document.createTextNode('');
    this.content = new docu.State('');
    docu.assignProperties(this.$el, {
      textContent: this.content
    });
  }
  initializeUI() {
    this.uiBlock.append(docu.jsxEntity("textarea", {
      onKeyUp: event => this.content.set(event.target.value)
    }));
  }
}
class WYGFeatureNode {
  constructor({
    featureBlock,
    options
  }) {
    console.log(options);
    options ||= {};
    const Tag = options.tag || 'div';
    this.uiBlock = featureBlock;
    featureBlock.WYGNode = this;
    this.$el = docu.jsxEntity(Tag, {
      style: {
        border: '2px solid blue',
        padding: '1em',
        margin: '1em'
      }
    }, "test feature content");
  }
  initializeUI() {
    this.uiBlock.append(docu.jsxEntity("i", null, "feature UI not yet implemented"));
  }
}
function renderFeature({
  featureBlock,
  render,
  featureClass,
  options
}) {
  featureBlock.className = 'feature-block';
  const featureNode = new featureClass({
    featureBlock,
    options
  });
  featureBlock.replaceChildren();
  featureNode.initializeUI();
  render(featureNode.$el);
  featureBlock.after(docu.jsxEntity(InsertFeatureButton, {
    previousNode: featureNode.$el
  }));
}
function selectFeature({
  featureBlock,
  render
}) {
  featureBlock.className = 'feature-block-selector';
  featureBlock.replaceChildren();
  featureBlock.append(docu.jsxEntity("button", {
    onClick: () => renderFeature({
      featureBlock,
      render,
      featureClass: WYGTextNode
    })
  }, "plain text"));
  featureBlock.append(docu.jsxEntity("button", {
    onClick: () => renderFeature({
      featureBlock,
      render,
      featureClass: WYGFeatureNode,
      options: {
        tag: 'div'
      }
    })
  }, "box feature"));
  featureBlock.append(docu.jsxEntity("button", {
    onClick: () => renderFeature({
      featureBlock,
      render,
      featureClass: WYGFeatureNode,
      options: {
        tag: 'span'
      }
    })
  }, "inline feature"));
}
function InsertFeatureButton({
  parentNode,
  previousNode
}) {
  const render = renderer({
    parentNode,
    previousNode
  });
  const featureBlock = docu.jsxEntity("div", {
    className: "empty-feature-block"
  }, docu.jsxEntity("button", {
    onClick: () => selectFeature({
      featureBlock,
      render
    })
  }, "+ add feature"));
  return featureBlock;
}