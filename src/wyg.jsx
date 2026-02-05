const tree = <></>;

docu.append(
  document.getElementById('display'),
  tree
);

document.getElementById('content').append(<InsertFeatureButton parentNode={tree} />);

function selectFeature(block) {
  block.replaceChildren();
  block.append(
    <button>choice 1</button>
  );
  block.append(
    <button>choice 2</button>
  );
}

function InsertFeatureButton({ parentNode, previousNode }) {
  const block = (
    <div className="feature-block">
      <button onClick={() => selectFeature(block)}>+ add feature</button>
    </div>
  );
  return block;
}
